import AppError from '../../errors/AppError';
import Invoice from '../../models/Invoices';
import FindAllInvoiceService from './FindAllInvoiceService';
import UpdateInvoiceService from './UpdateInvoiceService';

interface InvoiceData {
  status: string;
  id?: number | string;
}

const CalcelLastInvoice = async (companyid: number): Promise<Invoice> => {
  let allInvoices = await FindAllInvoiceService(companyid);

  let lastInvoice: Invoice = allInvoices[allInvoices.length - 1];

  let updatedInvoice = await UpdateInvoiceService({
    id: lastInvoice?.id,
    status: 'canceled'
  });

  if (!updatedInvoice) {
    throw new AppError('ERR_NO_PLAN_FOUND', 404);
  } else {
    return updatedInvoice;
  }
};

export default CalcelLastInvoice;
