import { del, get, patch, post, put } from "./HttpProvider";
import featureConstants from "./features-constants";

const SERVICE_URLS = {
  // service URL's (API End-Points)
  login: "/auth/login/web",
  resetPassword: "/auth/reset-password",
  forgotPassword: "/auth/forgot-password",
  loginGoogle: "/oauth/google/",
  loginFacebook: "/oauth/facebook/",
  loginInstagram: "/oauth/instagram/",
  userSignup: "/user/signup",
};

const login = (data) =>
  post(SERVICE_URLS.login, data, { feature: featureConstants.login });
const resetPassword = (data) =>
  post(SERVICE_URLS.resetPassword, data, { feature: featureConstants.login });
const forgotPassword = (data) =>
  post(SERVICE_URLS.forgotPassword, data, { feature: featureConstants.login });
const loginGoogle = (data) =>
  post(SERVICE_URLS.loginGoogle, data, { feature: featureConstants.login });
const loginFaceBook = (data) =>
  post(SERVICE_URLS.loginFacebook, data, { feature: featureConstants.login });
const loginInstagram = (data) =>
  post(SERVICE_URLS.loginInstagram, data, { feature: featureConstants.login });
const singUp = (data) =>
  post(SERVICE_URLS.userSignup, data, { feature: featureConstants.login });

const apiServices = {
  login,
  singUp,
  loginGoogle,
  loginFaceBook,
  loginInstagram,
  forgotPassword,
  resetPassword,
};
export default apiServices;
