import { locale } from "@/validation/loginSchema";
import useLoginForm from "../hooks/useLoginForm";
import { UseLoginFormProps } from "@/types";
import { useTranslation } from "next-i18next";


function LoginForm({ onSubmit }: UseLoginFormProps) {
  const { t: translate } = useTranslation(["common"])
 
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useLoginForm(onSubmit);

  return (
    <form onSubmit={handleSubmit}>
      <p>{translate("email")}</p>
      <input type="email" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <label>{translate("password")}</label>
      <input type="password" {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}
      <br />
      <label>{translate("description")}</label>
      <input type="text" {...register("password")} />
      {errors.description && <p>{errors.description.message}</p>}



      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginForm;
