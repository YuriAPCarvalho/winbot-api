export interface IInvoice {
  detail?: string;

  status?: string;

  value?: number;

  createdAt?: Date;

  updatedAt?: Date;

  dueDate?: string;

  companyId?: number;
}
