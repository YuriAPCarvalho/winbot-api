export interface IChargeInfo {
  id: number;
  name?: string;
  email?: string;
  cpf?: string;
  birth?: string;
  phone_number?: string;
  city?: string;
  state?: string;
  street?: string;
  number?: number;
  neighborhood?: string;
  zipcode?: string;
  createdAt?: Date;
  updatedAt?: Date;
  cardName?: string;
  cardNumber?: string;
  cardDate?: string;
  cardFlag?: string;
  subscriptionID?: number;
  companyId?: number;
  tokenCard?: string;
}
