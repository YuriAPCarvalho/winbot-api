import * as Yup from 'yup';
import AppError from '../../errors/AppError';
import Announcement from '../../models/Announcement';
import ChargeInfo from '../../models/ChargeInfo';
import { IChargeInfo } from './IChargeInfo';

const CreateService = async (data: IChargeInfo): Promise<ChargeInfo> => {
  try {
    const record = await ChargeInfo.create(data);

    return record;
  } catch (err: any) {
    throw new AppError(err.message);
  }
};

export default CreateService;
