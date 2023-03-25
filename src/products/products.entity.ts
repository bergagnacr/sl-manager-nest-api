import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { providerNameType } from './types';

@Entity()
export class Products {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'product_id' })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  productCode: string;

  @Column({
    nullable: false,
    default: '',
  })
  productDescription: string;

  @Column({
    nullable: false,
    default: 0,
  })
  productPrice: number;

  @Column({
    nullable: false,
    default: '',
  })
  productProvider: providerNameType;
}
