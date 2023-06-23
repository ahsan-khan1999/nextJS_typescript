import localStore from "./localstore.util";
import { updateHeaders } from "../services/HttpProvider";

export const getToken = () => localStore.get_data("kaufestoken");
export const getRefreshToken = (token) =>
  localStore.get_data("kaufesrefreshtoken", token);

export const setToken = (token) => localStore.store_data("kaufestoken", token);
export const setRefreshToken = (token) =>
  localStore.store_data("kaufesrefreshtoken", token);

export const setUserRole = (token) =>
  localStore.store_data("kaufesuserRole", token);
export const getUser = () => localStore.get_data("kaufesuser");

export const saveUser = (user) => localStore.store_data("kaufesuser", user);

export const logout = async () => {
  await localStore.remove_data("kaufestoken");
  await localStore.remove_data("kaufesuser");
  await localStore.remove_data("kaufesuserRole");
  await localStore.remove_data("fcm");
  await localStore.remove_data("roomToken");
  await localStore.remove_data("ChatUser");
  await localStore.remove_data("chatToken");
  await updateHeaders();
  return true;
};

class Auth {
  constructor() {
    this.user = {};
  }

  async setUserFromLocal() {
    const user = await getToken();
    this.user = user ? user : {};
  }

  set setUser(user) {
    this.user = user;
  }

  get getUser() {
    return this.user;
  }

  async logout() {
    await logout();
    this.user = {};
  }
}

export function isJSON(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
}
export const authClass = new Auth();

export const envCheck = () => {
  if (
    window.location.origin === "https://ewvillabd.com" ||
    window.location.origin === "https://www.ewvillabd.com" ||
    window.location.origin === "www.ewvillabd.com"
  )
    return "PROD";
  else if (
    window.location.origin === "https://ewvm.herokuapp.com" ||
    window.location.origin === "https://www.ewvm.herokuapp.com/" ||
    window.location.origin === "www.ewvm.herokuapp.com/"
  )
    return "TEST";
  else return "DEV";
};

export const userRole = {
  Admin: 0,
  personal: 1,
  business: 2,
};
export const userRoleObject = {
  Admin: 0,
  Individual: 1,
  Business: 2,
};

export function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}
export function getValueByKey(object, value) {
  return Object.values(object).find((key) => object[key] === value);
}
export function getCategoryName(category, id) {
  let result = category.find((item) => item?.id === id);
  return result?.name;
}

export function setErrorFunc(object, set) {
  if (object)
    for (const [key, value] of Object.entries(object)) {
      set(key, { type: "manual", message: value });
    }
}

export const generateValues = (data) => {
  let option = null;
  if (Array.isArray(data)) {
    option = data?.map((item, idx) => {
      return item?.value;
    });
  } else {
    option = data?.value;
  }
  return option;
};

export const formatAddress = (address) => {
  return address?.street + " " + address?.state + " " + address?.country;
};

