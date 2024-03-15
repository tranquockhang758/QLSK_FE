import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, Link, withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "./BreadCrumb.scss";
import { path } from "../utils";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import * as actions from "../store/actions";
import "./Admin.scss";
//======================================================User
import Create from "../containers/Admin/User/Create";
import Profile from "../containers/Admin/User/Profile";
import User from "../containers/Admin/User/User";
import LockScreen from "../containers/Admin/User/LockScreen";
import Edit from "../containers/Admin/User/Edit";
import Logout from "../containers/Admin/User/Logout";
import ChangePassword from "../containers/Admin/User/ChangePassword";

import UploadMultiple from "../containers/Admin/User/UploadMultiple";
import ViewUser from "../containers/Admin/User/ViewUser";
import Contact from "../containers/Admin/User/Contact";
import Datatable from "../containers/Admin/User/Table/Datatable";
//======================================================Post
import CreatePost from "../containers/Admin/Post/Create";

//=================================================Report
import Report from "../containers/Admin/Report/Report";
import Post from "../containers/Admin/Post/Post";
import ListPost from "../containers/Admin/Post/ListPost";
import EditPost from "../containers/Admin/Post/EditPost";
import ViewPost from "../containers/Admin/Post/ViewPost";
import CustomSelect from "../containers/Admin/User/CustomSelect";
import MainSpeech from "../containers/Admin/SpeechRecognition/MainSpeech";
import myPost from "../containers/Admin/Post/myPost";


import Header from "../containers/inc/Header"
import Sidebar from "../containers/inc/Sidebar";
import Footer from "../containers/inc/Footer";
import ErrorPage from "../containers/inc/ErrorPage";
import FaceId from "../containers/Admin/FaceAPI/FaceId";
import ErrorMod from "../containers/inc/ErrorMod";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoading: false,
      isLoadingPage: false,
      me: {},
    };
  }
  async componentDidMount() {
    setTimeout(() => {
      let date = new Date();
      let access_token = this.props.access_token ? this.props.access_token : "";
      let decodeToken = jwtDecode(access_token);
      //Nếu token hết hạn logout
      if (decodeToken !== "") {
        if (decodeToken.exp > date.getTime() / 1000) {
        } else if (decodeToken.exp < date.getTime() / 1000) {
          return this.props.history.push("/admin/logout");
        }
      }
    }, 500);
  }
  componentDidUpdate(prevProps) {}
  render() {
    let {isLoggedIn,isLockScreen} = this.props;
    return (
      <React.Fragment>
        {/* <Sidebar/> */}
        {isLoggedIn && !isLockScreen ?<Header/> : ""}
        {isLoggedIn && !isLockScreen ? <Sidebar/> : ""}

        <Switch>
          {/* //==========================================================User */}
          <Route path={path.Error} exact component={ErrorPage} />
          <Route path={path.Error_Moderator} exact component={ErrorMod} />
          <Route path={path.ADMIN} exact component={Report} />
          <Route path={path.CREATE_USER} exact component={Create} />
          <Route path={path.LOCKSCREEN} exact component={LockScreen} />
          <Route path={path.LIST_USER} exact component={Datatable} />
          <Route path={path.PROFILE} component={Profile} />
         
          <Route path={path.EDIT_USER} exact component={Edit} />
          <Route path={path.LOG_OUT} exact component={Logout} />
          <Route path={path.CHANGE_PASSWORD} exact component={ChangePassword} />
          <Route path={path.UPLOAD_FILE} component={UploadMultiple} />
          <Route path={path.LOG_OUT} exact component={Logout} />
          <Route path={path.VIEW_USER} exact component={ViewUser} />

          <Route path={path.CONTACT} exact component={Contact} />
          <Route path={path.USER} exact component={User} />
          {/* //==========================================================Post */}
          <Route path={path.POST} exact component={Post} />
          <Route path={path.ADD_POST} exact component={CreatePost} />
          <Route path={path.LIST_POST} exact component={ListPost} />
          <Route path={path.EDIT_POST} exact component={EditPost} />
          <Route path={path.VIEW_POST} exact component={ViewPost} />
          <Route path={path.MY_POST} exact component={myPost} />

          <Route path={path.CUSTOM_SELECT} exact component={CustomSelect} />
          {/* =================================Nhận diện giọng nói */}
          <Route path={path.SPEECH} exact component={MainSpeech} />
          {/* =================================Nhận diện khuôn măth */}
          <Route path={path.FACE_ID} exact component={FaceId} />
         
          {/* {isLoggedIn ? <Route path={path.ADMIN} component={Admin}/> : ""} */}
          {/* <Route
            component={() => {
              return <Redirect to={"/admin"} />;
            }}
          /> */} 
        </Switch> 
        {isLoggedIn && !isLockScreen ? <Footer/> : ""}
      </React.Fragment>

      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    access_token: state.user.access_token,
    language: state.app.language,
    id: state.user.user_id,
    userInfo: state.user.userInfo,
    isLoadingPage: state.user.isLoadingPage,
    isLockScreen:state.user.isLockScreen
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin));
