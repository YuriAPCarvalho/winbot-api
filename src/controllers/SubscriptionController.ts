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
import FindAllInvoiceService from '../services/InvoicesService/FindAllInvoiceService';
import { IsFreeTrial } from '../helpers/IsFreeTrial';
import { log } from 'console';

const app = express();

export const index = async (req: Request, res: Response): Promise<Response> => {
  const gerencianet = Gerencianet(options);
  return res.json(gerencianet.getSubscriptions());
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const getSubscription = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let { id } = req.params;

  return await efiAPI
    .get(process.env.EFIAPI_URL + '/v1/subscription/' + id)
    .then(response => {
      return res.send(response.data);
    })
    .catch(err => {
      return res.send(err);
    });
};

export function newDueDate() {
  const today = new Date();
  const nextDate = new Date(today);

  nextDate.setDate(today.getDate() + 30);

  return nextDate.toISOString();
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
    email,
    cpf,
    birth,
    phone_number,
    id,
    cardName,
    cardNumber,
    cardDate,
    cardFlag,
    companyId
  } = req.body;

  let itemsCheckout = {
    items: [
      {
        name: planName,
        value: 400,
        amount: 1
      }
    ]
  };
  const body = {
    payment: {
      credit_card: {
        payment_token,
        billing_address: {
          street,
          number,
          neighborhood,
          zipcode,
          city,
          state
        },
        customer: {
          name: cardName,
          email,
          cpf,
          birth,
          phone_number
        }
      }
    }
  };

  let i = 0;
  let actualStatus = '';
  let subscription = null;

  console.log({ ...body, ...itemsCheckout });

  const response = await efiAPI.post(
    `/v1/plan/${planID}/subscription/one-step`,
    { ...body, ...itemsCheckout }
  );

  subscription = response.data.data;

  actualStatus = subscription.status;

  console.log(actualStatus);

  if (actualStatus.includes('active')) {
    await Promise.all([
      await updateChargeService({
        id: id,
        cardNumber,
        cardDate,
        cardFlag,
        cardName,
        tokenCard: payment_token,
        subscriptionID: subscription.subscription_id
      }),
      UpdateCompanyService({ id: companyId, dueDate: newDueDate() }),
      CreateInvoiceService({
        detail: planName,
        status: 'paid',
        value: planValue,
        dueDate: newDueDate(),
        companyId
      })
    ]);
    return res.status(200).send('Operação concluída com sucesso!');
  } else {
    return res.status(400).send('Não foi possível completar a operação!');
  }
};

export const upgradeSubscription = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { companyId, bankPlanID, planName, planValue, dueDate } = req.body;

  console.log(req.body);
  let invoices = await FindAllInvoiceService(companyId);
  let chargeInfo = await FindByCompany(companyId)
    .then(resp => {
      return resp[resp.length - 1];
    })
    .catch(err => {
      res.send(400).send('Erro ao encontrar company!');
      return null;
    });

  const {
    planID,
    tokenCard,
    street,
    number,
    neighborhood,
    zipcode,
    city,
    state,
    cardName,
    email,
    cpf,
    birth,
    phone_number
  } = chargeInfo;

  let itemsCheckout = {
    items: [
      {
        name: planName,
        value: 400,
        amount: 1
      }
    ]
  };
  const body = {
    payment: {
      credit_card: {
        payment_token: tokenCard,
        billing_address: {
          street,
          number,
          neighborhood,
          zipcode,
          city,
          state
        },
        customer: {
          name: cardName,
          email,
          cpf,
          birth,
          phone_number
        }
      }
    }
  };

  await efiAPI
    .put(`/v1/subscription/${chargeInfo.subscriptionID}/cancel`)
    .then()
    .catch(() => {
      res.status(400).send('Não foi possível migrar plano!');
    });

  let i = 0;
  let actualStatus = '';
  let subscription = null;

  console.log({ ...body, ...itemsCheckout });

  const response = await efiAPI.post(
    `/v1/plan/${bankPlanID}/subscription/one-step`,
    { ...body, ...itemsCheckout }
  );

  subscription = response.data.data;

  actualStatus = subscription.status;

  console.log(actualStatus);

  if (actualStatus.includes('active')) {
    await Promise.all([
      await updateChargeService({
        id: chargeInfo.id,
        subscriptionID: subscription.subscription_id
      }),
      UpdateCompanyService({ id: companyId, dueDate: newDueDate() }),
      CreateInvoiceService({
        detail: planName,
        status: 'paid',
        value: planValue,
        dueDate: newDueDate(),
        companyId
      })
    ]);
    return res.status(200);
  } else {
    return res.status(400).send('Não foi possível completar a operação!');
  }
};

export const cardUnsubscription = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id, companyId } = req.user;

  await Promise.all([
    DeleteByCompany(companyId.toString()),
    UpdateCompanyService({ id: companyId, dueDate: new Date().toISOString() }),
    CalcelLastInvoice(companyId)
  ])
    .then(response => {
      return res.status(200).send('Plano cancelado com sucesso');
    })
    .catch(err => {
      console.log(err);
      throw err;
    });

  return await FindByCompany(companyId.toString())
    .then(async res => {
      console.log(res);

      await efiAPI.put(
        `/v1/subscription/${res[res.length - 1]?.subscriptionID}/cancel`
      );
    })
    .then(() => {
      return res.status(200).send('Plano cancelado com sucesso');
    })
    .catch(() => {
      return res.status(400).send('Erro ao cancelar plano');
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
