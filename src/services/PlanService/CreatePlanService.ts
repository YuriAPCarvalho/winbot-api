import * as Yup from 'yup';
import AppError from '../../errors/AppError';
import Plan from '../../models/Plan';
import Gerencianet from 'gn-api-sdk-typescript';
import efiAPI from '../../efiAPI';

import options from '../../config/Gn';

interface PlanData {
  name: string;
  users: number;
  connections: number;
  queues: number;
  value: number;
  term: string;
  useCampaigns?: boolean;
  useSchedules?: boolean;
  useInternalChat?: boolean;
  useExternalApi?: boolean;
  useKanban?: boolean;
  useOpenAi?: boolean;
  useIntegrations?: boolean;
  bankPlanID?: number;
}

interface BankPlan {
  name: string;
  repeats: number;
  interval: number;
}

const CreateBankPlan = async (
  name: string,
  termInMonths: number
): Promise<any> => {
  const gerencianet = Gerencianet(options);

  return await efiAPI
    .post('/v1/plan', { name: name, repeats: 12, interval: termInMonths })
    .then(async (response: any) => {
      console.log(response.data.data);
      return response.data.data.plan_id;
    })
    .catch((error: any) => {
      console.log(error);
      return error;
    });

  // await gerencianet
  //   .createPlan({}, { name: name, repeats: 12, interval: 1 })
  //   .then((resposta: any) => {
  //     console.log(resposta);
  //     return resposta.data;
  //   })
  //   .catch((error: any) => {
  //     console.log(error);
  //     return error;
  //   })
  //   .done();
};

const CreatePlanService = async (planData: PlanData): Promise<Plan> => {
  const { name, term } = planData;

  const planSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'ERR_PLAN_INVALID_NAME')
      .required('ERR_PLAN_INVALID_NAME')
      .test(
        'Check-unique-name',
        'ERR_PLAN_NAME_ALREADY_EXISTS',
        async value => {
          if (value) {
            const planWithSameName = await Plan.findOne({
              where: { name: value }
            });

            return !planWithSameName;
          }
          return false;
        }
      )
  });

  let bankPlan;
  try {
    await planSchema.validate({ name });
    let termInMonths = term == 'MENSAL' ? 1 : 12;
    bankPlan = await CreateBankPlan(name, termInMonths);
    console.log(bankPlan);
    planData.bankPlanID = bankPlan;
  } catch (err) {
    throw new AppError(err.message);
  }

  const plan = await Plan.create(planData);

  return plan;
};

export default CreatePlanService;
