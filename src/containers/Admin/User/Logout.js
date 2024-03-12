import React, { Component } from "react";

import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import * as actions from "../../../store/actions";
import { Redirect } from "react-router-dom";
class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.processLogout();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    let isLoggedIn = this.props.isLoggedIn;
    if (!isLoggedIn) {
      return <Redirect to={"/login"}></Redirect>;
    }
    return <></>;
  }
}
const mapStateToProps = (state) => {
  return { isLoggedIn: state.user.isLoggedIn };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
