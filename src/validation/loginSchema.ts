import { Fields } from "@/enums";
import * as yup from "yup";
export const locale = ["en", "de"]
const loginSchema = yup.object().shape({
  [Fields.email]: yup.string().email("Invalid email").required(),
  [Fields.password]: yup.string().required(),
  [Fields.description]: yup.string().required(),

});

export default loginSchema;
