import React, { Component } from "react";

import { connect } from "react-redux";

import * as actions from "../../../store/actions";
import thumbnail from "../../../assets/images/user4-128x128.jpg";
import { handleBuildBreadCrumb } from "../../Helper/BuildBBreadCrumb";
import Datatable from "./Table/Datatable";
import LogoutModal from "../../inc/LogoutModal";
class ListPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenLogoutModal: true,
    };
  }

  async componentDidMount() {}

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
    id: state.user.user_id,
    access_token: state.user.access_token,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserInfo: (data) => dispatch(actions.fetchUserInfo(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPost);
