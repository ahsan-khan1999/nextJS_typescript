import { SubmitHandler } from "react-hook-form";

export interface Inputs {
  email: string;
  password: string;
}

export interface UseLoginFormProps {
  onSubmit: SubmitHandler<Inputs>;
}

export type AddFunction = (x: number, y: number) => number;


