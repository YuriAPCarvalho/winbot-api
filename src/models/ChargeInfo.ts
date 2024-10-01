import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  HasMany,
  Unique,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import Company from './Company';

@Table({ tableName: 'ChargeInfo' })
class ChargeInfo extends Model<ChargeInfo> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  cpf: string;

  @Column
  birth: string;

  @Column
  phone_number: string;

  @Column
  city: string;

  @Column
  state: string;

  @Column
  street: string;
  @Column
  number: number;

  @Column
  neighborhood: string;

  @Column
  zipcode: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @AllowNull(true)
  @Column
  cardNumber: string;

  @AllowNull(true)
  @Column
  cardDate: string;

  @AllowNull(true)
  @Column
  cardFlag: string;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;
}

export default ChargeInfo;
