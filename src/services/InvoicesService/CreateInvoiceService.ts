import * as Yup from 'yup';
import AppError from '../../errors/AppError';
import Announcement from '../../models/Announcement';
import ChargeInfo from '../../models/ChargeInfo';
import Invoices from '../../models/Invoices';
import FindAllInvoiceService from './FindAllInvoiceService';
import UpdateInvoiceService from './UpdateInvoiceService';
import { IInvoice } from './IInvoice';
import { DeleteInvoice } from './DeleteInvoice';
import { newDueDate } from '../../controllers/SubscriptionController';

const CreateInvoiceService = async (data: IInvoice): Promise<Invoices> => {
  try {
    const { companyId } = data;

    var invoices = await FindAllInvoiceService(companyId);

    let lastInvoice = invoices[invoices.length - 1];

    let c: Date = new Date(lastInvoice.createdAt);
    let due: Date = new Date(lastInvoice.dueDate);
    let ehFreeTrial: boolean =
      (due.getTime() - c.getTime()) / (1000 * 60 * 60 * 24) == 6;
    //means the user is in your free trial
    if (ehFreeTrial) {
      await DeleteInvoice(invoices[0]?.id?.toString());
      data.dueDate = newDueDate();
    }

    const record = await Invoices.create(data);

    return record;
  } catch (err: any) {
    throw new AppError(err.message);
  }
};

export default CreateInvoiceService;
