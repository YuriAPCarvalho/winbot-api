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

    return charges;
  } catch (err) {
    return [];
  }
};
