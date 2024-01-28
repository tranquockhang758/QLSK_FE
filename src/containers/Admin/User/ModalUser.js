import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { connect } from "react-redux";
import "./ModalUser.scss";
import { emitter } from "../../../utils/emitter";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils/constant";
import {
  handleGetAllUsers,
  handleAddNewUser,
  handleDeleteUser,
  HandleEditUser,
  handleRefreshToken,
} from "../../../services/userService";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      gender: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      image: "",
      roleId: "",
      position: "",
      isShowPassword: "",
      certificate: "",
      motherCompany: "",
      department: "",
      listGender: {},
      listPosition: {},
      listMotherCompany: {},
      listDepartment: {},
      listCertificate: {},
      listRole: {},
    };
    this.listenToEmitter();
  }

  //Hàm bắt sự kiện
  listenToEmitter = () => {
    //Fire sự kiện Clear data => bắt sự kiện trả vê 1 function
    emitter.on("EVENT_CLEAR_MODAL_DATA", (data) => {
      this.setState({
        email: "",
        gender: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        image: "",
        roleId: "",
        position: "",
      });
    });
  };

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      let { language } = this.props;
      if (type === "DOCTORS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName} `;
          let labelEn = `${item.firstName} ${item.lastName} `;
          //   Nếu ngôn ngữ là tiếng việt hiển thị tên theo tiếng việt
          object.label = language === languages.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE" || type === "PROVINCE" || type === "PAYMENT") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          //   Nếu ngôn ngữ là tiếng việt hiển thị tên theo tiếng việt
          object.label = language === languages.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "SPECIALTY" || type === "CLINIC") {
        inputData.map((item, index) => {
          let object = {};
          //   Nếu ngôn ngữ là tiếng việt hiển thị tên theo tiếng việt
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
      if (
        type === "GENDER" ||
        "POSITION" ||
        "DEPARTMENT" ||
        "MOTHERCOMPANY" ||
        "CERTIFICATE" ||
        "ROLE"
      ) {
        inputData.map((item, index) => {
          let object = {};
          let valueVi = `${item.valueVi}`;
          let valueEn = `${item.valueEn}`;
          //   Nếu ngôn ngữ là tiếng việt hiển thị tên theo tiếng việt
          object.label = language === languages.VI ? valueVi : valueEn;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };
  componentDidMount() {
    this.props.fetchGenderStart();
    this.props.fetchPositionStart();
    this.props.fetchDepartmentStart();
    this.props.fetchMotherCompanyStart();
    this.props.fetchCertificateStart();
    this.props.fetchRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.gender !== this.props.gender) {
      let listGender = this.buildDataInputSelect(this.props.gender, "GENDER");
      this.setState({ listGender: listGender });
    }
    if (prevProps.position !== this.props.position) {
      let listPosition = this.buildDataInputSelect(
        this.props.position,
        "POSITION"
      );
      this.setState({ listPosition: listPosition });
    }
    if (prevProps.department !== this.props.department) {
      let listDepartment = this.buildDataInputSelect(
        this.props.department,
        "DEPARTMENT"
      );
      this.setState({ listDepartment: listDepartment });
    }
    if (prevProps.motherCompany !== this.props.motherCompany) {
      let listMotherCompany = this.buildDataInputSelect(
        this.props.motherCompany,
        "MOTHERCOMPANY"
      );
      this.setState({ listMotherCompany: listMotherCompany });
    }
    if (prevProps.certificate !== this.props.certificate) {
      let listCertificate = this.buildDataInputSelect(
        this.props.certificate,
        "CERTIFICATE"
      );
      this.setState({ listCertificate: listCertificate });
    }
    if (prevProps.role !== this.props.role) {
      let listRole = this.buildDataInputSelect(this.props.role, "ROLE");
      this.setState({ listRole: listRole });
    }
  }

  //Hàm toggle gọi đến props là this.props.isShowModal để toggle bit isShowModal dẫn đến ẩn hiện Modal
  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({ ...copyState });
  };
  handleCheckInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "mobile",
      "role",
      "position",
      "gender",
      "certificate",
      "department",
      "motherCompany",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  HandleEditUser = async () => {
    let isValid = this.handleCheckInput();
    if (isValid === true) {
      this.props.handleAddNewUser(this.state);
    }
  };
  handleShowPassword = () => {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  };
  render() {
    let { language } = this.props;
    let {
      listCertificate,
      listDepartment,
      listGender,
      listMotherCompany,
      listPosition,
      listRole,
    } = this.state;
    // console.log("Check state", this.state);

    return (
      <>
        <div>
          <Button color="danger btn" onClick={this.toggle}>
            {this.props.buttonLabel}
          </Button>
          <Modal
            isOpen={this.props.isShowModal}
            toggle={this.toggle}
            className={this.props.className}
            size="lg"
          >
            <ModalHeader toggle={this.toggle}>Thêm mới người dùng</ModalHeader>
            <ModalBody>
              <div className="container">
                <div className="row">
                  {/* UserName======================================================= */}
                  <div className="col-md-6 form-group">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                          @
                        </span>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Email"
                        aria-label="email"
                        aria-describedby="basic-addon1"
                        onChange={(e) => this.handleOnChangeInput(e, "email")}
                        value={this.state.email}
                      />
                    </div>
                  </div>
                  {/* UserName======================================================= */}
                  {/* password======================================================= */}
                  <div className="col-md-6 form-group input-password">
                    <div class="input-group mb-3 password">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                          #
                        </span>
                      </div>
                      <input
                        type={this.state.isShowPassword ? "text" : "password"}
                        class="form-control"
                        placeholder="********"
                        aria-label="password"
                        aria-describedby="basic-addon1"
                        onChange={(e) =>
                          this.handleOnChangeInput(e, "password")
                        }
                        value={this.state.password}
                      />
                    </div>
                    <i
                      className={
                        this.state.isShowPassword
                          ? "fas fa-eye"
                          : "fas fa-eye-slash"
                      }
                      onClick={this.handleShowPassword}
                    ></i>
                  </div>
                  {/* password======================================================= */}
                  {/* firstName======================================================= */}
                  <div className="col-md-6 form-group">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                          firstName
                        </span>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Khang"
                        aria-label="firstName"
                        aria-describedby="basic-addon1"
                        onChange={(e) =>
                          this.handleOnChangeInput(e, "firstName")
                        }
                        value={this.state.firstName}
                      />
                    </div>
                  </div>
                  {/* firstName======================================================= */}
                  {/* lastName======================================================= */}
                  <div className="col-md-6 form-group">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                          lastName
                        </span>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Tran"
                        aria-label="lastName"
                        aria-describedby="basic-addon1"
                        onChange={(e) =>
                          this.handleOnChangeInput(e, "lastName")
                        }
                        value={this.state.lastName}
                      />
                    </div>
                  </div>
                  {/* lastName======================================================= */}
                  {/* address======================================================= */}
                  <div className="col-md-6 form-group">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                          address
                        </span>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="116 8/3 Street"
                        aria-label="address"
                        aria-describedby="basic-addon1"
                        onChange={(e) => this.handleOnChangeInput(e, "address")}
                        value={this.state.address}
                      />
                    </div>
                  </div>
                  {/* address======================================================= */}
                  {/* phoneNumber======================================================= */}
                  <div className="col-md-6 form-group">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">
                          phone
                        </span>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="0367xxxxxx"
                        aria-label="phoneNumber"
                        aria-describedby="basic-addon1"
                        onChange={(e) => this.handleOnChangeInput(e, "mobile")}
                        value={this.state.phoneNumber}
                      />
                    </div>
                  </div>
                  {/* phoneNumber======================================================= */}
                  {/* Gender======================================================= */}
                  <div className="col-md-6 form-group">
                    <label for="sel1">
                      <FormattedMessage id="user.Choose-gender" />
                    </label>
                    <select
                      id="inputState"
                      class="form-control"
                      onChange={(e) => this.handleOnChangeInput(e, "gender")}
                      value={this.state.gender}
                    >
                      {listGender &&
                        listGender.length > 0 &&
                        listGender.map((item, index) => {
                          return (
                            <option className="sel1" value={item.value}>
                              {item.label}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  {/* Gender======================================================= */}
                  {/* Position======================================================= */}
                  <div className="col-md-6 form-group">
                    <label for="sel1">
                      <FormattedMessage id="user.Choose-position" />
                    </label>
                    <select
                      id="inputState"
                      class="form-control"
                      onChange={(e) => this.handleOnChangeInput(e, "position")}
                      value={this.state.position}
                    >
                      {listPosition &&
                        listPosition.length > 0 &&
                        listPosition.map((item, index) => {
                          return (
                            <option className="sel1" value={item.value}>
                              {item.label}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  {/* Position======================================================= */}
                  {/* Role======================================================= */}
                  <div className="col-md-6 form-group mt-3">
                    <label for="sel1">
                      <FormattedMessage id="user.Choose-role" />
                    </label>
                    <select
                      id="inputState"
                      class="form-control"
                      onChange={(e) => this.handleOnChangeInput(e, "role")}
                      value={this.state.roleId}
                    >
                      {listRole &&
                        listRole.length > 0 &&
                        listRole.map((item, index) => {
                          return (
                            <option className="sel1" value={item.value}>
                              {item.label}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  {/* Role======================================================= */}

                  {/* Certificate======================================================= */}
                  <div className="col-md-6 form-group mt-3">
                    <label for="sel1">
                      <FormattedMessage id="user.Choose-certificate" />
                    </label>
                    <select
                      id="inputState"
                      class="form-control"
                      onChange={(e) =>
                        this.handleOnChangeInput(e, "certificate")
                      }
                      value={this.state.certificate}
                    >
                      {/* //==================================================Render */}
                      {listCertificate &&
                        listCertificate.length > 0 &&
                        listCertificate.map((item, index) => {
                          return (
                            <option className="sel1" value={item.value}>
                              {item.label}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  {/* Certificate======================================================= */}

                  {/* motherCompany======================================================= */}
                  <div className="col-md-6 form-group mt-3">
                    <label for="sel1">
                      <FormattedMessage id="user.Choose-motherCompany" />
                    </label>
                    <select
                      id="inputState"
                      class="form-control"
                      onChange={(e) =>
                        this.handleOnChangeInput(e, "motherCompany")
                      }
                      value={this.state.motherCompany}
                    >
                      {/* //==================================================Render */}
                      {listMotherCompany &&
                        listMotherCompany.length > 0 &&
                        listMotherCompany.map((item, index) => {
                          return (
                            <option className="sel1" value={item.value}>
                              {item.label}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  {/* motherCompany======================================================= */}

                  {/* department======================================================= */}
                  <div className="col-md-6 form-group mt-3">
                    <label for="sel1">
                      <FormattedMessage id="user.Choose-department" />
                    </label>
                    <select
                      id="inputState"
                      class="form-control"
                      onChange={(e) =>
                        this.handleOnChangeInput(e, "department")
                      }
                      value={this.state.department}
                    >
                      {/* //==================================================Render */}
                      {listDepartment &&
                        listDepartment.length > 0 &&
                        listDepartment.map((item, index) => {
                          return (
                            <option className="sel1" value={item.value}>
                              {item.label}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  {/* department======================================================= */}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                className="save"
                onClick={this.HandleEditUser}
              >
                Save Changes
              </Button>
              <Button
                color="success"
                className="close btn-success"
                onClick={this.toggle}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    gender: state.admin.gender,
    fetchGenderSuccess: state.admin.fetchGenderSuccess,
    language: state.app.language,
    position: state.admin.position,
    department: state.admin.department,
    motherCompany: state.admin.motherCompany,
    certificate: state.admin.certificate,
    role: state.admin.role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
    fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
    fetchDepartmentStart: () => dispatch(actions.fetchDepartmentStart()),
    fetchMotherCompanyStart: () => dispatch(actions.fetchMotherCompanyStart()),
    fetchCertificateStart: () => dispatch(actions.fetchCertificateStart()),
    fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
