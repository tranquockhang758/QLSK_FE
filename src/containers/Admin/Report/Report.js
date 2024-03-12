import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { HandleEditUserById } from "../../../services/userService";
import { checkPassword } from "../../Auth/RegEx";
import * as actions from "../../../store/actions/index";

import { handleBuildBreadCrumb } from "../../Helper/BuildBBreadCrumb";
class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}
  async componentDidMount() {}

  render() {
    return (
      <>
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h3>Trang Report Toàn bộ User và bài viết</h3>
                </div>
                <div className="col-sm-6">
                  {/* <ol className="breadcrumb float-sm-right">
                    {arrLink &&
                      arrLink.length > 0 &&
                      arrLink.map((item, index) => {
                        return (
                          <Link
                            to={item.link}
                            key={index}
                            className={"breadcrumb-item"}
                          >
                            {item.text}
                          </Link>
                        );
                      })}
                  </ol> */}
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </section>
          <section className="content">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header  bg-primary">
                    <h3 className="card-title">Admin Default Page</h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                        title="Collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                    </div>
                  </div>

                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-8">
                        {/* //======================================oldPassword */}
                        {/* <div className="form-group ">
                            <div className="col-md-12 d-flex">
                              <div className="col-md-3">
                                <label htmlFor="inputName" className="">
                                  Mật khẩu cũ
                                </label>
                              </div>
                              <div className="col-md-9 input-password">
                                <input
                                  type={"password"}
                                  className="form-control"
                                  name="oldPassword"
                                  value={this.state.oldPassword}
                                  onChange={(e) => {
                                    this.handleOnchange(e, "oldPassword");
                                  }}
                                />
                              </div>
                            </div>
                          </div> */}
                        {/* //======================================oldPassword */}
                        {/* //======================================newPassword */}
                        {/* <div className="form-group ">
                            <div className="col-md-12 d-flex">
                              <div className="col-md-3">
                                <label htmlFor="inputName" className="">
                                  Mật khẩu mới
                                </label>
                              </div>
                              <div className="col-md-9 input-password">
                                <input
                                  type={"password"}
                                  placeholder="********"
                                  className="form-control"
                                  name="newPassword"
                                  value={this.state.newPassword}
                                  onChange={(e) => {
                                    this.handleOnchange(e, "newPassword");
                                  }}
                                />
                              </div>
                            </div>
                          </div> */}
                        {/* //======================================newPassword */}
                        {/* //======================================newPassword */}
                        {/* <div className="form-group ">
                            <div className="col-md-12 d-flex">
                              <div className="col-md-3">
                                <label htmlFor="inputName" className="">
                                  Xác nhận mật khẩu
                                </label>
                              </div>
                              <div className="col-md-9 input-password">
                                <input
                                  type={"password"}
                                  placeholder="********"
                                  className="form-control"
                                  name="confirmPassword"
                                  value={this.state.confirmPassword}
                                  onChange={(e) => {
                                    this.handleOnchange(e, "confirmPassword");
                                  }}
                                />
                              </div>
                            </div>
                          </div> */}
                        {/* //======================================newPassword */}
                      </div>
                    </div>
                  </div>
                  {/* /.card-body */}
                  {/* <div className="card-footer footer-user">
                      <button
                        className="btn btn-primary btn-add-user"
                        onClick={this.HandleUpdatePassword}
                      >
                        Thay đổi
                      </button>
                    </div> */}
                </div>
              </div>
              {/* /.col */}
            </div>
            {/* /.container-fluid */}
          </section>
        </div>
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
    processLogout: () => dispatch(actions.processLogout()),
    fetchUserStart: (accessToken) =>
      dispatch(actions.fetchUserStart(accessToken)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Report));
