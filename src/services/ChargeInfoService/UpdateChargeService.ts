import AppError from '../../errors/AppError';
import ChargeInfo from '../../models/ChargeInfo';
import { IChargeInfo } from './IChargeInfo';

const UpdateChargeService = async (data: IChargeInfo): Promise<ChargeInfo> => {
  const { id, subscriptionID } = data;

  const record = await ChargeInfo.findByPk(id);

  if (!record) {
    throw new AppError('ERR_NO_ANNOUNCEMENT_FOUND', 404);
  }
  console.log(data);

  delete data.id;

  await record.update(data);

  return record;
};

export default UpdateChargeService;
