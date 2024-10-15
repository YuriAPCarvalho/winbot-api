import { Op } from 'sequelize';
import ChargeInfo from '../../models/ChargeInfo';
import AppError from '../../errors/AppError';
import Invoices from '../../models/Invoices';
import FindAllInvoiceService from './FindAllInvoiceService';

export const DeleteOpenInvoice = async (id: number) => {
  try {
    let allInvoicesAgain = await FindAllInvoiceService(id);

    allInvoicesAgain.map(async i => {
      if (i.status.includes('open')) {
        console.log(i);

        await Invoices.destroy({
          where: {
            id: i.id
          }
        });
      }
    });
  } catch (err) {
    throw new AppError('ERR_NO_COMPANY_FOUND', 404);
  }
};
