import { Op } from 'sequelize';
import ChargeInfo from '../../models/ChargeInfo';
import AppError from '../../errors/AppError';
import Invoices from '../../models/Invoices';

export const DeleteInvoice = async (id: string): Promise<Boolean> => {
  try {
    const deletetedCount = await Invoices.destroy({
      where: {
        id: id
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
