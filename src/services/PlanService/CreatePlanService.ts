import * as Yup from 'yup';
import AppError from '../../errors/AppError';
import Plan from '../../models/Plan';
import Gerencianet from 'gn-api-sdk-typescript';

import options from '../../config/Gn';

interface PlanData {
  name: string;
  users: number;
  connections: number;
  queues: number;
  value: number;
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

const CreateBankPlan = (name: string): any => {
  const gerencianet = Gerencianet(options);

  gerencianet
    .createPlan({}, { name: name, repeats: 12, interval: 1 })
    .then(async (resposta: any) => {
      console.log(resposta);
      return await resposta.json()?.data;
    })
    .catch((error: any) => {
      console.log(error);
    })
    .done();
};

const CreatePlanService = async (planData: PlanData): Promise<Plan> => {
  const { name } = planData;

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

  try {
    await planSchema.validate({ name });
    let bankPlan = await CreateBankPlan(name);
    planData.bankPlanID = bankPlan.plan_id;
  } catch (err) {
    throw new AppError(err.message);
  }

  const plan = await Plan.create(planData);

  return plan;
};

export default CreatePlanService;
