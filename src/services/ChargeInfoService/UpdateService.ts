import AppError from '../../errors/AppError';
import Announcement from '../../models/Announcement';
import { IChargeInfo } from './IChargeInfo';

const UpdateService = async (data: IChargeInfo): Promise<Announcement> => {
  const { id } = data;

  const record = await Announcement.findByPk(id);

  if (!record) {
    throw new AppError('ERR_NO_ANNOUNCEMENT_FOUND', 404);
  }

  await record.update(data);

  return record;
};

export default UpdateService;
