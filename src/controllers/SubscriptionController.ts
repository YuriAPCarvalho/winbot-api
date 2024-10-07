import { Request, Response } from 'express';
import express from 'express';
import * as Yup from 'yup';
import Gerencianet from 'gn-api-sdk-typescript';
import AppError from '../errors/AppError';
import options from '../config/Gn';
import Company from '../models/Company';
import Invoices from '../models/Invoices';
import Subscriptions from '../models/Subscriptions';
import { getIO } from '../libs/socket';
import axios from 'axios';
import updateChargeService from '../services/ChargeInfoService/UpdateChargeService';
import UpdateCompanyService from '../services/CompanyService/UpdateCompanyService';
import CancelLastInvoice from '../services/InvoicesService/CreateInvoiceService';
import { DeleteByCompany } from '../services/ChargeInfoService/DeleteChargeInfo';
import CreateInvoiceService from '../services/InvoicesService/CreateInvoiceService';
import CalcelLastInvoice from '../services/InvoicesService/CancelLastInvoice';
import ShowCompanyService from '../services/CompanyService/ShowCompanyService';
import { FindByCompany } from '../services/ChargeInfoService/FindChargeService';
import ChargeInfo from '../models/ChargeInfo';
import efiAPI from '../efiAPI';

const app = express();

export const index = async (req: Request, res: Response): Promise<Response> => {
  const gerencianet = Gerencianet(options);
  return res.json(gerencianet.getSubscriptions());
};

export const getEFIToken = async () => {
  //Insira os valores de suas credenciais em desenvolvimento do pix
  var credenciais = {
    client_id: process.env.GERENCIANET_APICARD_CLIENT_ID,
    client_secret: process.env.GERENCIANET_APICARD_CLIENT_SECRET
  };

  var data = JSON.stringify({ grant_type: 'client_credentials' });
  var data_credentials =
    credenciais.client_id + ':' + credenciais.client_secret;

  var auth = Buffer.from(data_credentials).toString('base64');

  var config = {
    method: 'POST',
    url: process.env.EFIAPI_URL + '/v1/authorize',
    headers: {
      Authorization: 'Basic ' + auth,
      'Content-Type': 'application/json'
    },
    data: data
  };

  return await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};

export const getSubscription = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const accessToken = await getEFIToken();

  // Configuração da requisição
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  };

  let { id } = req.params;

  return await axios
    .get(process.env.EFIAPI_URL + '/v1/subscription/' + id, config)
    .then(response => {
      return res.send(response.data);
    })
    .catch(err => {
      return res.send(err);
    });
};

function newDueDate() {
  const today = new Date();
  const nextDate = new Date(today);

  nextDate.setDate(today.getDate() + 30);

  return nextDate.toDateString();
}

export const createCardSubscriptionPlan = async (
  req: Request,
  res: Response
): Promise<any> => {
  const gerencianet = Gerencianet(options);
  console.log(req.body);

  const {
    planID,
    planName,
    planValue,
    payment_token,
    street,
    number,
    neighborhood,
    zipcode,
    city,
    state,
    name,
    email,
    cpf,
    birth,
    phone_number,
    id,
    cardNumber,
    cardDate,
    cardFlag,
    companyId
  } = req.body;

  const body = {
    items: [
      {
        name: planName,
        value: planValue * 1000,
        amount: 1
      }
    ],
    payment: {
      credit_card: {
        payment_token,
        billing_address: {
          street,
          number,
          neighborhood,
          zipcode,
          city,
          state,
          complemento: ''
        },
        customer: {
          name,
          email,
          cpf,
          birth,
          phone_number
        }
      }
    }
  };

  return await efiAPI
    .post(`/v1/plan/${planID}/subscription/one-step`, body.payment)
    .then(async response => {
      console.log(response.data);

      let subsID = response.data.data.subscription_id;
      await updateChargeService({
        id: id,
        cardNumber,
        cardDate,
        cardFlag,
        companyId,
        subscriptionID: subsID
      });

      await efiAPI
        .post(`/v1/subscription/${subsID}`, body.payment)
        .then()
        .catch(err => {
          console.log(err);

          throw err;
        });

      setTimeout(async () => {
        await efiAPI
          .get('/v1/subscription/' + subsID)
          .then(response => {
            console.log(response.data.data);

            if (
              ['paid', 'approved'].some(
                v =>
                  v ==
                  response.data.data.history[
                    response.data.data.history.length - 1
                  ].status
              )
            ) {
              Promise.all([
                UpdateCompanyService({ id: companyId, dueDate: newDueDate() }),
                CreateInvoiceService({
                  detail: planName,
                  status: 'open',
                  value: planValue,
                  dueDate: newDueDate(),
                  companyId
                })
              ]);
            } else {
              res.status(400).send('O pagamento não foi efetuado!');
            }
          })
          .catch(err => {
            console.log(err);
          });
      }, 30000);
      return res.status(200).send(response.data);
    })
    .catch(error => {
      console.error('Erro ao fazer requisição:', error);
      return res.status(400).send(error.error);
    });
};

export const cardUnsubscription = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id, companyId } = req.user;

  let chargeinfo = await FindByCompany(companyId.toString());

  await FindByCompany(companyId.toString()).then(async res => {
    console.log(res);

    await efiAPI.put(
      `/v1/subscription/${res[res.length - 1]?.subscriptionID}/cancel`
    );
  });

  return await Promise.all([
    UpdateCompanyService({ id: companyId, dueDate: new Date().toDateString() }),
    DeleteByCompany(companyId.toString()),
    CalcelLastInvoice(companyId)
  ])
    .then(response => {
      return res.status(200).send('Plano cancelado com sucesso');
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

export const createSubscription = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const gerencianet = Gerencianet(options);
  const { companyId } = req.user;

  const schema = Yup.object().shape({
    price: Yup.string().required(),
    users: Yup.string().required(),
    connections: Yup.string().required()
  });

  if (!(await schema.isValid(req.body))) {
    throw new AppError('Validation fails', 400);
  }

  const {
    firstName,
    price,
    users,
    connections,
    address2,
    city,
    state,
    zipcode,
    country,
    plan,
    invoiceId
  } = req.body;

  const body = {
    calendario: {
      expiracao: 3600
    },
    valor: {
      original: price
        .toLocaleString('pt-br', { minimumFractionDigits: 2 })
        .replace(',', '.')
    },
    chave: process.env.GERENCIANET_PIX_KEY,
    solicitacaoPagador: `#Fatura:${invoiceId}`
  };
  try {
    const pix = await gerencianet.pixCreateImmediateCharge(null, body);

    const qrcode = await gerencianet.pixGenerateQRCode({
      id: pix.loc.id
    });

    const updateCompany = await Company.findOne();

    if (!updateCompany) {
      throw new AppError('Company not found', 404);
    }

    return res.json({
      ...pix,
      qrcode
    });
  } catch (error) {
    throw new AppError('Validation fails', 400);
  }
};

export const createWebhook = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const schema = Yup.object().shape({
    chave: Yup.string().required(),
    url: Yup.string().required()
  });

  if (!(await schema.isValid(req.body))) {
    throw new AppError('Validation fails', 400);
  }

  const { chave, url } = req.body;

  const body = {
    webhookUrl: url
  };

  const params = {
    chave
  };

  try {
    const gerencianet = Gerencianet(options);
    const create = await gerencianet.pixConfigWebhook(params, body);
    return res.json(create);
  } catch (error) {
    console.log(error);
  }
};

export const webhook = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { type } = req.params;
  const { evento } = req.body;
  if (evento === 'teste_webhook') {
    return res.json({ ok: true });
  }
  if (req.body.pix) {
    const gerencianet = Gerencianet(options);
    req.body.pix.forEach(async (pix: any) => {
      const detahe = await gerencianet.pixDetailCharge({
        txid: pix.txid
      });

      if (detahe.status === 'CONCLUIDA') {
        const { solicitacaoPagador } = detahe;
        const invoiceID = solicitacaoPagador.replace('#Fatura:', '');
        const invoices = await Invoices.findByPk(invoiceID);
        const companyId = invoices.companyId;
        const company = await Company.findByPk(companyId);

        const expiresAt = new Date(company.dueDate);
        expiresAt.setDate(expiresAt.getDate() + 30);
        const date = expiresAt.toISOString().split('T')[0];

        if (company) {
          await company.update({
            dueDate: date
          });
          const invoi = await invoices.update({
            id: invoiceID,
            status: 'paid'
          });
          await company.reload();
          const io = getIO();
          const companyUpdate = await Company.findOne({
            where: {
              id: companyId
            }
          });

          io.to(`company-${companyId}-mainchannel`).emit(
            `company-${companyId}-payment`,
            {
              action: detahe.status,
              company: companyUpdate
            }
          );
        }
      }
    });
  }

  return res.json({ ok: true });
};
