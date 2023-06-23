/**
 * Misc. functions
 */

import { logout } from "./auth.util";

// import Home from "../Components/Pages/Home";

// language translation

export const setLocalizeContent = (obj, store) => {
  try {
    return obj.en;
    // return obj[store.get("language")];
  } catch (error) {
    console.log(error);
    return { en: "", az: "", ru: "" };
  }
};

// first letter capitalize
export const capitalize = (str) =>
  str?.charAt(0)?.toUpperCase() + str?.slice(1);

// deep clone an object
export const deepClone = (obj) => {
  var copy;

  // eslint-disable-next-line
  if (obj == null || typeof obj != "object") {
    return obj;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepClone(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = deepClone(obj[attr]);
      }
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
};

// check if empty or not
export const isEmpty = (object, dataType = "object") => {
  switch (dataType) {
    case "object": {
      return !Object.keys(object).length;
    }
    default: {
      return false;
    }
  }
};

//check if object has any true value in it or not
export const checkTrueValue = (obj) => {
  const valuesOfObject = Object.values(obj);
  const TrueFalse = valuesOfObject.includes(true);
  return TrueFalse;
};
//Remove a value from array
export const removerValue = (item, index, qty) => {
  const selectedItem = item?.splice(index, qty);
  const finalArray = item?.filter((item) => {
    return item !== selectedItem;
  });
  return finalArray;
};

//Check For Numbers Only
export const isNumber = (mobile) => {
  if (mobile) {
    let regex = new RegExp(/^[0-9]*$/);
    return regex.test(mobile);
  } else return false;
};
// Check WHITE space
export const checkWhiteSpace = (text) => {
  const _text = text.trim();
  return text === _text;
};
// check paid or unpaid
export const checkPaidOrUnpaid = (text) => {
  if (text === "paid") {
    return "green";
  } else if (text == "partial") {
    return "#970165";
  }
  else {
    return "red";
  }
};
// coma seperated and round numbers
export const comaSeperated = (number) => {
  return number?.toLocaleString("en-US", { maximumFractionDigits: 2 });
};
// disable past dates
export const disablePastDate = () => {
  const today = new Date();
  const dd = String(today.getDate() + 0).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  return yyyy + "-" + mm + "-" + dd;
};

// UnAutherize user logout
export const unautherizeUser = () => {
  logout();
};


export const filterComponentData = (componetcms, slugname, lang) => {

  const Component = componetcms?.filter(
    (item) => item?.slug === slugname
  );
  if (Component?.length < 1) {
    return []
  }
  let data = []
  Object.keys(Component[0]?.content)?.map((item) => {
    if (item?.includes(lang)) {
      data = Component[0]?.content[item]

    }
  })
  return data

}