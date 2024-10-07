import Invoices from '../../models/Invoices';

interface Request {
  companyId: number;
}

const FindAllInvoiceService = async (
  companyId: number
): Promise<Invoices[]> => {
  const invoice = await Invoices.findAll({
    where: {
      companyId
    },
    order: [['id', 'ASC']]
  });
  return invoice;
};

export default FindAllInvoiceService;
