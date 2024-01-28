import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { toast } from "react-toastify";

// Import toastify css file
import "react-toastify/dist/ReactToastify.css";
import {
  handleGetAllUsers,
  handleAddNewUser,
  handleDeleteUser,
  HandleEditUser,
  handleRefreshToken,
} from "../../../services/userService";
import ModalUser from "./ModalUser";
import { emitter } from "../../../utils/emitter";
import ModalEditUser from "./ModalEditUser";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import * as actions from "../../../store/actions/index";
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
    };
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.accessToken === this.props.accessToken) {
      let date = new Date();
      let token = this.props.accessToken;
      let decodedToken = jwtDecode(token);
      let id = this.props.userInfo.user.id;
      //1706111806, 1706112028.893;
      if (decodedToken.exp <= date.getTime() / 1000) {
        let res = await handleRefreshToken(id);
        if (res) {
          this.props.fetchUserStart(res.accessToken);
        }
      }
    }
  }
  async componentDidMount() {
    this.handleGetAllUsers();
  }

  handleGetAllUsers = async () => {
    let data = await handleGetAllUsers("");
    if (data && data.errCode === 0) {
      this.setState({ users: data.users });
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
    //============================Data lấy từ props con ở ModalUser
    try {
      let response = await handleAddNewUser(data);
      if (response && response.data.errCode === 0) {
        console.log("Create new user successfully");
        this.setState({ isShowModal: false });
        this.handleGetAllUsers();
        //============================Sau khi thêm xong user ta emit sự kiện
        emitter.emit("EVENT_CLEAR_MODAL_DATA", data);
      } else {
        this.setState({ isShowModal: false });
        console.log("Don't create user successfully " + response.data.Message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteUser = async (user) => {
    let id = user.id;
    try {
      let response = await handleDeleteUser(id);
      //response.message.errCode === 0 ,response.message.Message
      if (response && response.message.errCode === 0) {
        this.handleGetAllUsers();
      } else {
        console.log("Cannot delete User Because " + response.message.Message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleEditUser = (user) => {
    this.setState({ isShowModalEditUser: true });
    this.setState({ user_edit: user });
  };

  handleEditUserFromParent = async (data) => {
    try {
      let res = await HandleEditUser(data);
      if (res && res.errCode === 0) {
        toast.success("Update User Successfully");
        this.setState({
          isShowModalEditUser: false,
        });
        await this.handleGetAllUsers("");
      } else {
        toast.error(`${res.Message}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    let { users_jwt, listGender } = this.props;
    let users = this.state.users;
    return (
      <>
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6 col-md-12 text-center">
                  <h1 className="m-0">
                    <FormattedMessage id="user.manage-user" />
                  </h1>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </div>
          {/* /.content-header */}
          <ModalUser
            isShowModal={this.state.isShowModal}
            toggleFromParent={this.toggleModalUser}
            className={"modal-user-container"}
            handleAddNewUser={this.createNewUser}
          />
          {this.state.isShowModalEditUser ? (
            <ModalEditUser
              isShowModalEditUser={this.state.isShowModalEditUser}
              toggleModalEditUserFromParent={this.toggleModalEditUser}
              current_user={this.state.user_edit}
              handleEditUserFromParent={this.handleEditUserFromParent}
              listGender={listGender}
            />
          ) : (
            ""
          )}
          <div className="mx-1">
            <button
              className="btn btn-primary px-3"
              onClick={this.handleOnClickAddNewUser}
            >
              <i className="fas fa-plus"></i>
              <label className="add-users">Add New Users</label>
            </button>
          </div>

          {/* //====================================================Table */}
          <div className="col-12 mx-1">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">
                    <FormattedMessage id="user.name" />
                  </th>
                  <th scope="col">
                    <FormattedMessage id="user.email" />
                  </th>
                  <th scope="col">
                    <FormattedMessage id="user.numberPhone" />
                  </th>
                  <th scope="col">
                    <FormattedMessage id="user.address" />
                  </th>
                  <th scope="col">
                    <FormattedMessage id="user.task" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.length > 0 &&
                  users.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>
                          {item.lastName + " "}
                          {item.firstName}
                        </td>
                        <td>{item.email}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.address}</td>
                        <td>
                          <button
                            className="button-edit-user"
                            onClick={() => this.handleEditUser(item)}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className="button-delete-user btn-danger"
                            onClick={() => this.handleDeleteUser(item)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                {users_jwt &&
                  users_jwt.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>
                          {item.lastName + " "}
                          {item.firstName}
                        </td>
                        <td>{item.email}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.address}</td>
                        <td>
                          <button
                            className="button-edit-user"
                            onClick={() => this.handleEditUser(item)}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className="button-delete-user btn-danger"
                            onClick={() => this.handleDeleteUser(item)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    accessToken: state.user.accessToken,
    users_jwt: state.user.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserStart: (accessToken) =>
      dispatch(actions.fetchUserStart(accessToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
