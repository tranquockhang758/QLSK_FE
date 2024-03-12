import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import "./UserManage.scss";
import { toast } from "react-toastify";
import { withRouter, Link } from "react-router-dom";

// Import toastify css file
import "react-toastify/dist/ReactToastify.css";

import {
  handleGetAllUsers,
  HandleEditUserById,
  createNewUser,
} from "../../../services/userService";
import { emitter } from "../../../utils/emitter";

import * as actions from "../../../store/actions/index";
import ModalConfirmDelete from "./ModalConfirmDelete";
import "./UserManage.scss";

import { handleBuildBreadCrumb } from "../../Helper/BuildBBreadCrumb";
class UserManage extends Component {
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
      isOpenModalEditUser: false,
      listUser: [],
      isShowModalDelete: false,
      userCurrent: {},
      arrUser: [],
    };
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}
  componentDidMount() {
    this.handleGetAllUsers();
    this.handleGetUser();
  }
  handleGetUser = async () => {
    let access_token = this.props.access_token;
    let data = await handleGetAllUsers(access_token);
    if (data && data.data) {
      this.setState({ arrUser: data.data });
    }
  };

  handleGetAllUsers = async () => {
    let access_token = this.props.access_token;
    let data = await handleGetAllUsers(access_token);
    if (data && data.data) {
      this.setState({ listUser: data.data });
    }
  };
  handleOnClickAddNewUser = async () => {
    this.setState({ isShowModal: true });
  };
  toggleModalUser = () => {
    this.setState({ isShowModal: !this.state.isShowModal });
  };

  toggleModalEditUser = () => {
    this.setState({ isShowModalEditUser: !this.state.isShowModalEditUser });
  };
  createNewUser = async (data) => {
    try {
      let access_token = this.props.access_token;
      let res = await createNewUser(data, access_token);
      if (res && res.code === 200) {
        toast.success("Create new user successfully");
        this.setState({ isShowModal: false });
        this.handleGetAllUsers();
        //============================Sau khi thêm xong user ta emit sự kiện
        emitter.emit("EVENT_CLEAR_MODAL_DATA", data);
      } else if (res && res.code !== 200) {
        toast.error("Email is exist in system");
        // toast.error("Create new user unsuccessfully", res.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteUser = async (user) => {
    this.setState({
      isShowModalDelete: !this.state.isShowModalDelete,
      userCurrent: user,
    });
  };

  toggleModalDeleteUser = () => {
    this.setState({
      isShowModalDelete: !this.state.isShowModalDelete,
    });
  };

  handleEditUserFromParent = async (data) => {
    try {
      let access_token = this.props.access_token;
      let id = data.id;
      let res = await HandleEditUserById(data, access_token, id);
      if (res && res.code === 200) {
        this.setState({ isShowModalEditUser: !this.state.isShowModalEditUser });
        toast.success(res.message);
      } else if (res && res.code !== 200) {
        toast.error(res.message);
      }
      this.handleGetAllUsers();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    let { userInfo } = this.props;
    let { listUser, users } = this.state;
    //ListUser là 1 array
    let role = userInfo.role;
    let company = userInfo.company;
    let hrefDefault = "";
    const space = <Fragment>&nbsp;&nbsp;&nbsp;&nbsp;</Fragment>;
    let arrLink = handleBuildBreadCrumb();
    return (
      <>
        {/* this.props.handleAddNewUser(data); */}
        <div className="content-wrapper">
          <section className="content">
            <section className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1>Danh sách người dùng</h1>
                  </div>
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
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
                    </ol>
                  </div>
                </div>
              </div>
              {/* /.container-fluid */}
            </section>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header  bg-primary d-flex">
                      {/* <h3 className="card-title">Quản lí người dùng</h3> */}

                      {/* <div className="card-tools">
                        <button
                          type="button"
                          className="btn btn-tool"
                          data-card-widget="collapse"
                          title="Collapse"
                        >
                          <i className="fas fa-minus" />
                        </button>
                      </div> */}
                    </div>
                    {/* /.card-header */}
                    <div className="card-body table-responsive-md table">
                      <table className="table borderless table-user-manage">
                        <thead>
                          <tr className="text-center thead-table trow-head">
                            <th>#</th>
                            <th>Họ tên</th>
                            <th>Công ty</th>
                            <th>Tổng công ty</th>
                            <th>Vai trò</th>
                            <th>Quyền truy cập</th>
                            <th>Sửa</th>
                            <th>Xóa</th>
                            <th>View</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listUser &&
                            listUser.length > 0 &&
                            listUser.map((item, index) => {
                              return (
                                <tr
                                  className="text-center tbody-table"
                                  key={index}
                                >
                                  <td>{index}</td>
                                  <td>{item.name}</td>
                                  <td>{item.company}</td>
                                  <td>
                                    {item.motherCompany
                                      ? item.motherCompany
                                      : ""}
                                  </td>
                                  <td>{item.role ? item.role : ""}</td>
                                  <td>
                                    {item.levelOfAdmin ? item.levelOfAdmin : ""}
                                  </td>
                                  {/* //=============================Edit khi là
                                  admin hoặc moderator hoặc chỉ khi là chính nó */}
                                  {/* Check role có phải Moderator không và có cùng nhà máy không */}
                                  {role === "Admin" ? (
                                    <>
                                      <td>
                                        <button
                                          className="button-edit-user"
                                          onClick={() => {
                                            this.props.history.push(
                                              `/admin/user/edit/${item.id}`
                                            );
                                          }}
                                        >
                                          <i className="fas fa-edit"></i>
                                        </button>
                                      </td>
                                      <td>
                                        <button
                                          className="button-delete-user"
                                          onClick={() => {
                                            this.handleDeleteUser(item);
                                          }}
                                        >
                                          <i className="fas fa-trash"></i>
                                        </button>
                                      </td>
                                      <td>
                                        <button
                                          className="button-view-user"
                                          onClick={() => {
                                            this.props.history.push(
                                              `/admin/user/view?id=${item.id}`
                                            );
                                          }}
                                        >
                                          <i className="fa fa-eye"></i>
                                        </button>
                                      </td>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                  {/* //Nếu người dùng là Moderator hiện button cho cùng công ty */}

                                  {role === "Moderator" &&
                                  company === item.company ? (
                                    <>
                                      <td>
                                        <button
                                          className="button-edit-user"
                                          onClick={() => {
                                            this.props.history.push(
                                              `/admin/user/edit/${item.id}`
                                            );
                                          }}
                                        >
                                          <i className="fas fa-edit"></i>
                                        </button>
                                      </td>
                                      <td>
                                        <button
                                          className="button-delete-user"
                                          onClick={() => {
                                            this.handleDeleteUser(item);
                                          }}
                                        >
                                          <i className="fas fa-trash"></i>
                                        </button>
                                      </td>
                                      <td>
                                        <button
                                          className="button-view-user"
                                          onClick={() => {
                                            this.props.history.push(
                                              `/admin/user/view?id=${item.id}`
                                            );
                                          }}
                                        >
                                          <i className="fa fa-eye"></i>
                                        </button>
                                      </td>
                                    </>
                                  ) : (
                                    ""
                                  )}

                                  {role === "Moderator" &&
                                  company !== item.company ? (
                                    <>
                                      <td>{hrefDefault.toString()}</td>
                                      <td>{hrefDefault.toString()}</td>
                                      <td>
                                        <button
                                          className="button-view-user"
                                          onClick={() => {
                                            this.props.history.push(
                                              `/admin/user/view?id=${item.id}`
                                            );
                                          }}
                                        >
                                          <i className="fa fa-eye"></i>
                                        </button>
                                      </td>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {role === "User" &&
                                  company === item.company ? (
                                    <>
                                      <td>{space}</td>
                                      <td>{space}</td>
                                      <td>
                                        <button
                                          className="button-view-user"
                                          onClick={() => {
                                            this.props.history.push(
                                              `/admin/user/view?id=${item.id}`
                                            );
                                          }}
                                        >
                                          <i className="fa fa-eye"></i>
                                        </button>
                                      </td>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {role === "User" &&
                                  company !== item.company ? (
                                    <>
                                      <td>{space}</td>
                                      <td>{space}</td>
                                      <td>
                                        <button
                                          className="button-view-user"
                                          onClick={() => {
                                            this.props.history.push(
                                              `/admin/user/view?id=${item.id}`
                                            );
                                          }}
                                        >
                                          <i className="fa fa-eye"></i>
                                        </button>
                                      </td>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                    {/* /.card-body */}
                  </div>
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </section>
          <div className="content-header">
            <div className="container-fluid">
              {this.state.isShowModalDelete ? (
                <ModalConfirmDelete
                  isShowModal={this.state.isShowModalDelete}
                  toggleFromParent={this.toggleModalDeleteUser}
                  userCurrent={this.state.userCurrent}
                  FetchUserAfterUpdate={this.handleGetAllUsers}
                />
              ) : (
                ""
              )}
            </div>
          </div>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserManage)
);
