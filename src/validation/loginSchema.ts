import { Fields } from "@/enums";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  [Fields.email]: yup.string().email("Invalid email").required("Email is required"),
  [Fields.password]: yup.string().required("Password is required"),
});

export default loginSchema;
