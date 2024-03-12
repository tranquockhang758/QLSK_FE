import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import _ from "lodash";

import { MdCloudUpload } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
//============================================Jodit Editorr

import Progress from "../../inc/Progress.js";
import LogoutModal from "../../inc/LogoutModal.js";
import Datatable from "./tablePost/Datatable.js";

class myPost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    //=====================Tạo ref cho input
  }

  async componentDidMount() {
    //Call API ,Preloader

    let date = new Date();
    let access_token = this.props.access_token ? this.props.access_token : "";
    let decodeToken = jwtDecode(access_token);
    //Nếu token hết hạn logout

    if (decodeToken !== "") {
      if (decodeToken.exp > date.getTime() / 1000) {
        setTimeout(
          () => this.setState(() => ({ isLoadingPreloader: false })),
          500
        );
      } else if (decodeToken.exp < date.getTime() / 1000) {
        this.setState({ isOpenLogoutModal: true });
        // return this.props.history.push("/admin/logout");
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    return (
      <>
        <Datatable />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    access_token: state.user.access_token,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(myPost);
