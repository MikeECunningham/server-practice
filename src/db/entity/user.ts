import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity("User")
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column( { nullable: false } )
  firstName!: string;

  @Column( { nullable: false } )
  lastName!: string;

  @Column( { nullable: false } )
  email!: string;

  // @CreateDateColumn( { nullable: true } )
  // createdAt!: Date;

  // @UpdateDateColumn( { nullable: true } )
  // updatedAt!: Date;
}