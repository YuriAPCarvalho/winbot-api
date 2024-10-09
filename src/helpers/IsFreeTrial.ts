export function IsFreeTrial(invoices) {
  let lastInvoice = invoices[invoices.length - 1];

  let c: Date = new Date(lastInvoice.createdAt);
  let due: Date = new Date(lastInvoice.dueDate);
  let ehFreeTrial: boolean =
    (due.getTime() - c.getTime()) / (1000 * 60 * 60 * 24) == 7;
  //means the user is in your free trial

  return ehFreeTrial;
}
