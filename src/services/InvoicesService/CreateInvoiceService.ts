import * as Yup from 'yup';
import AppError from '../../errors/AppError';
import Announcement from '../../models/Announcement';
import ChargeInfo from '../../models/ChargeInfo';
import Invoices from '../../models/Invoices';
import FindAllInvoiceService from './FindAllInvoiceService';
import UpdateInvoiceService from './UpdateInvoiceService';
import { IInvoice } from './IInvoice';

const CreateInvoiceService = async (data: IInvoice): Promise<Invoices> => {
  try {
    const { companyId } = data;

    var invoices = await FindAllInvoiceService(companyId);

    if (invoices.length > 0) {
      await UpdateInvoiceService({
        id: invoices[invoices.length - 1].id,
        status: 'paid'
      });
    }

    const record = await Invoices.create(data);

    return record;
  } catch (err: any) {
    throw new AppError(err.message);
  }
};

export default CreateInvoiceService;
