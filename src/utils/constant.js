export const path = {
  HOME: "/",
  LOGIN: "/login",
  LOG_OUT: "/admin/logout",
  ADMIN: "/admin",
  CREATE_USER: "/admin/user/create",
  LIST_USER: "/admin/user/list",
  PROFILE: "/admin/user/profile",
  CHANGE_PASSWORD: "/admin/user/changePassword",
  FORGET_PASSWORD: "/admin/user/forgetPassword",
  LOCKSCREEN: "/admin/user/lockscreen",
  EDIT_USER: "/admin/user/edit/:id",
  UPLOAD_FILE: "/admin/user/uploadFile",
  VIEW_USER: "/admin/user/view/:id",

  DATATABLE: "/admin/user/table",
  CONTACT: "/admin/contact",
  USER: "/admin/user",

  //=================================================
  POST: "/admin/post",
  ADD_POST: "/admin/post/create",
  EDIT_POST: "/admin/post/edit/:id",
  LIST_POST: "/admin/post/list",
  DELETE_POST: "/admin/post/delete/:id",
  VIEW_POST: "/admin/post/view/:id",
  MY_POST: "/admin/post/myPost",

  CUSTOM_SELECT: "/admin/CustomSelect",
  SPEECH: "/admin/speech",
};

export const languages = {
  VI: "vi",
  EN: "en",
};

export const manageActions = {
  ADD: "ADD",
  EDIT: "EDIT",
  DELETE: "DELETE",
};

export const dateFormat = {
  SEND_TO_SERVER: "DD/MM/YYYY",
};

export const YesNoObj = {
  YES: "Y",
  NO: "N",
};

export const error = {
  email: {
    required: "Vui lòng điền vào email",
    length: "email có độ dài trong khoảng 6-32 kí tự",
    format: "email có dạng user1@gmail.com",
  },
  password: {
    required: "Vui lòng điền vào password",
    length: "password có độ dài trong khoảng 8-32 kí tự",
    format:
      "Password bao gồm 1 kí tự  việt hoa đầu, 1 kí tự viết thường,1 kí tự đặc biệt,1 số, không có khoảng trắng",
  },
  name: {
    required: "Vui lòng điền vào tên của bạn",
  },
  mobile: {
    required: "Vui lòng điền vào số điện thoại",
    length: "Số điện thoại có độ dài 10 hoặc 11 kí tự",
    format: "Vui lòng điền vào đúng định dạng số điện thoại",
  },
  gender: {
    required: "Vui lòng  chọn giới tính",
  },
  thumbnailUrl: {
    required: "Vùi lòng Upload và nhấn nút tải ảnh",
  },
  birthday: {
    required: "Vui lòng điền vào ngày / tháng /năm sinh",
  },
  role: {
    required: "Vui lòng chọn vai trò của bạn",
  },
  company: {
    required: "Vui lòng nhập vào công ty của bạn",
  },
  motherCompany: {
    required: "Vui lòng chọn công ty mẹ",
  },
  certificate: {
    required: "Vui lòng chọn trình độ chuyên môn ",
  },
  button: {
    required: "Vui lòng điền đủ các trường thông tin",
  },
  author: {
    required: "Vui lòng điền vào tên tác giả",
  },
  title: {
    required: "Vui lòng điền vào tên sáng kiến",
  },
  content: {
    required: "Vui lòng điền vào nội dung sáng kiến",
  },
  description: {
    required: "Vui lòng nhập vào mô tả ngắn cho sáng kiến",
  },
  field: {
    required: "Vui lòng chọn lĩnh vực của sáng kiến",
  },

  currentActivity: {
    required: "Vui lòng điền vào tình trạng hoạt động hiện tại",
  },
  contentSolution: {
    required: "Vui lòng điền vào nội dung giải pháp",
  },
  applySolution: {
    required: "Vui lòng điền vào việc áp dụng giải pháp",
  },
  efficient: {
    required: "Vui lòng điền vào hiệu quả thực tế",
  },
  typeOfCompany: {
    required: "Vui lòng chọn loại hình nhà máy",
  },
  oldPassword: {
    required: "Vui lòng nhập vào mật khẩu hiện tại",
    length: "password có độ dài trong khoảng 8-32 kí tự",
    format:
      "Password bao gồm 1 kí tự  việt hoa đầu, 1 kí tự viết thường,1 kí tự đặc biệt,1 số, không có khoảng trắng",
  },
  newPassword: {
    required: "Vui lòng nhập vào mật khẩu mới",
    length: "password có độ dài trong khoảng 8-32 kí tự",
    format:
      "Password bao gồm 1 kí tự  việt hoa đầu, 1 kí tự viết thường,1 kí tự đặc biệt,1 số, không có khoảng trắng",
  },
  confirmPassword: {
    required: "Vui lòng xác nhận lại mật khẩu",
    length: "password có độ dài trong khoảng 8-32 kí tự",
    format:
      "Password bao gồm 1 kí tự  việt hoa đầu, 1 kí tự viết thường,1 kí tự đặc biệt,1 số, không có khoảng trắng",
  },

  assistant: {
    required: "Vui lòng chọn người hỗ trọ",
  },
  benefit: {
    required: "Vui lòng nhập vào lợi ích mang lại",
  },
  attachment: {
    required: "Vui lòng nhập vào phụ lục đính kèm",
  },
};

export const breadcrumb = {
  admin: "admin",
  user: "người dùng",
  create: "tạo mới",
  list: "danh sách",
  changePassword: "thay đổi mật khẩu",
  profile: "thông tin cá nhân",
  edit: "Chỉnh sửa",
  view: "Xem",
  uploadFile: "Upload nhiều file",
};
