import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./User.scss";
import Header from "../../inc/Header";
import Sidebar from "../../inc/Sidebar";
import Footer from "../../inc/Footer";
import Content from "../../inc/Content";
import UserManage from "./UserManage";
import * as actions from "../../../store/actions/index";
import { getAllCodeService } from "../../../services/userService";
import { languages } from "../../../utils/constant";
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      isShowModal: false,
      email: "",
      gender: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      image: "",
      roleId: "",
      positionId: "",
      isShowModalEditUser: false,
      user_edit: {},
      genderArr: [],
      listGender: [],
    };
  }

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
      if (
        type === "PRICE" ||
        type === "PROVINCE" ||
        type === "PAYMENT" ||
        "GENDER"
      ) {
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
    }
    return result;
  };
  async componentDidMount() {
    this.props.fetchGenderStart();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.gender !== this.props.gender) {
      let listGender = this.buildDataInputSelect(this.props.gender, "GENDER");
      this.setState({ listGender: listGender });
    }
  }
  render() {
    return (
      <>
        <div className="user-redux-container">
          <Header />
          <UserManage listGender={this.state.listGender} />
          <Footer />
          <Sidebar />
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    gender: state.admin.gender,
    fetchGenderSuccess: state.admin.fetchGenderSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
