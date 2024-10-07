import { Op } from 'sequelize';
import ChargeInfo from '../../models/ChargeInfo';
import AppError from '../../errors/AppError';

export const DeleteByCompany = async (id: string): Promise<Boolean> => {
  try {
    const deletetedCount = await ChargeInfo.destroy({
      where: {
        companyId: id
      }
    });

    if (deletetedCount > 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw new AppError('ERR_NO_COMPANY_FOUND', 404);
  }
};
