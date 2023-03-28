import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Inputs } from "../types";
import loginSchema from "@/validation/loginSchema";

function useLoginForm(onSubmit: (data: Inputs) => void) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(loginSchema)
  });

  const onSubmitHandler = (data: Inputs) => {
    onSubmit(data);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmitHandler),
    formState: { errors }
  };
}

export default useLoginForm;
