import * as Yup from 'yup';
import AppError from '../../errors/AppError';
import Announcement from '../../models/Announcement';
import ChargeInfo from '../../models/ChargeInfo';
import Invoices from '../../models/Invoices';
import FindAllInvoiceService from './FindAllInvoiceService';
import UpdateInvoiceService from './UpdateInvoiceService';
import { IInvoice } from './IInvoice';
import { DeleteInvoice } from './DeleteInvoice';

const CreateInvoiceService = async (data: IInvoice): Promise<Invoices> => {
  try {
    const { companyId } = data;

    var invoices = await FindAllInvoiceService(companyId);

    //means the user is in your free trial
    if (invoices.length == 1) {
      await DeleteInvoice(invoices[0]?.id?.toString());
    } else {
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
