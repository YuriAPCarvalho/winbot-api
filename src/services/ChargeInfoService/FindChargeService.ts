import { Op } from 'sequelize';
import ChargeInfo from '../../models/ChargeInfo';
import AppError from '../../errors/AppError';

export const FindByCompany = async (id: string): Promise<ChargeInfo[]> => {
  try {
    const charges = await ChargeInfo.findAll({
      where: {
        companyId: id
      }
    });

    if (charges.length === 0) {
      throw new AppError('ERR_NO_COMPANY_FOUND', 404);
    }

    return charges;
  } catch (err) {
    throw new AppError('ERR_NO_COMPANY_FOUND', 404);
  }
};
