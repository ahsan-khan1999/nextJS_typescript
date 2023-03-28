import useLoginForm from "../hooks/useLoginForm";
import { UseLoginFormProps } from "@/types";

function LoginForm({ onSubmit }: UseLoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useLoginForm(onSubmit);

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input type="email" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <label>Password:</label>
      <input type="password" {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginForm;
