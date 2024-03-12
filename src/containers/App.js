import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";
import CustomScrollbars from "../components/CustomScrollbars";
import Home from "../routes/Home";
import Logout from "./Admin/User/Logout";
import Login from "../containers/Auth/Login";
import Admin from "../routes/Admin";
import { CustomToastCloseButton } from "../components/CustomToast";
import ConfirmModal from "../components/ConfirmModal";

import "./App.scss";
import Header from "./inc/Header";
import Footer from "./inc/Footer";
import Sidebar from "./inc/Sidebar";
class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };
  componentDidMount() {
    this.handlePersistorState();
    // let isLoggedIn = this.props.isLoggedIn;
  }
  render() {
    let { isLoggedIn } = this.props;

    return (
      <Fragment>
        <div className="wrapper">
          <Router history={history}>
            <div className="main-container">
              <ConfirmModal />

              <div className="content-container">
                <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                  {isLoggedIn ? <Header /> : ""}
                  {isLoggedIn ? <Sidebar /> : ""}
                  <Switch>
                    <Route path={path.HOME} exact component={Home} />
                    <Route
                      path={path.LOGIN}
                      component={userIsNotAuthenticated(Login)}
                    />
                    <Route path={path.LOG_OUT} exact component={Logout} />

                    <Route
                      path={path.ADMIN}
                      component={userIsAuthenticated(Admin)}
                    />
                  </Switch>
                  {isLoggedIn ? <Footer /> : ""}
                </CustomScrollbars>
              </div>

              <ToastContainer
                className="toast-container"
                toastClassName="toast-item"
                bodyClassName="toast-item-body"
                autoClose={2000}
                hideProgressBar={true}
                pauseOnHover={false}
                pauseOnFocusLoss={true}
                closeOnClick={true}
                closeButton={<CustomToastCloseButton />}
              />
            </div>
          </Router>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    access_token: state.user.access_token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
