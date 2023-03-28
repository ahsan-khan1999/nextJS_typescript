import { SubmitHandler } from "react-hook-form";
import { ReactNode } from "react";
export interface Inputs {
  email: string;
  password: string;
}

export interface UseLoginFormProps {
  onSubmit: SubmitHandler<Inputs>;
}

export type AddFunction = (x: number, y: number) => number;


export interface MyComponentProp {
  children: ReactNode
}

export interface Address {
  street:string;
  city:string;
  state:string
}

export interface Person{
  name:string;
  email:string;
  address?:Address
}