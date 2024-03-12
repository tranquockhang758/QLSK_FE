import { toast } from "react-toastify";

export const checkEmail = (email) => {
  let isValidEmail = false;
  if (!email) {
    toast.error("Vui lòng điền vào ô email");
    return (isValidEmail = false);
  } else {
    //email trong giới hạn
    if (email.length >= 6 && email.length <= 32) {
      let pattern_email = new RegExp("^[a-zA-Z0-9_.+-]+@gmail.[a-zA-Z0-9-.]+$");
      if (!pattern_email.test(email)) {
        toast.error("email có dạng là: email@gmail.com");
        return (isValidEmail = false);
      } else {
        return (isValidEmail = true);
      }
    } else {
      toast.error("Mật khẩu có độ dài 6 đến 32 kí tự");
      return (isValidEmail = false);
    }
  }
};

export const checkPassword = (password, e) => {
  let isValidPassword = false;
  if (!password) {
    toast.error(`Vui lòng điền vào ô ${e}`);
    return (isValidPassword = false);
  } else {
    //email trong giới hạn
    if (password.length >= 6 && password.length <= 32) {
      //A-Z{1} => kí tự in hoa đầu tiên
      //\w biễu diễn tập hợp chữ cái, chữ số và kí tự đặc biệt ta đẻ trong \!@#$%^&*()
      // new RegExp("^([A-Z]){1}([\w_\.!@#$%*]+){5,31}$");
      // let reg = /^([A-Z]){1}([\w_\.!@#$%*]+){5,31}$/;
      let pattern_password = /^([A-Z]){1}([\w_\.!@#$%*]+){5,31}$/;
      if (!pattern_password.test(password)) {
        toast.error(
          "Mật khẩu có kí tự đầu viết hoa, 1 kí tự đặc biệt và ít nhất 1 số"
        );
        return (isValidPassword = false);
      } else {
        return (isValidPassword = true);
      }
    } else {
      toast.error("Mật khẩu có độ dài 6 đến 32 kí tự");
      return (isValidPassword = false);
    }
  }
};

export const checkMobile = (mobile) => {
  let isValidMobiile = false;
  if (!mobile) {
    toast.error("Please to fill mobile");
    return (isValidMobiile = false);
  } else {
    //email trong giới hạn
    let pattern_mobile = new RegExp(
      "^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$"
    );
    if (!pattern_mobile.test(mobile)) {
      toast.error("Vui lòng điền vào số điện thoại thật");
      return (isValidMobiile = false);
    } else {
      return (isValidMobiile = true);
    }
  }
};

export const handleCheckValidInput = (data) => {
  let isValid = true;
  let arrInput = ["name"];
  for (let i = 0; i < arrInput.length; i++) {
    if (!data[arrInput[i]]) {
      toast.error("Please to fill " + arrInput[i]);
      isValid = false;
      break;
    }
  }
  return isValid;
};
