import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

import { connect } from "react-redux";
// import Select from "react-select";
import * as actions from "../../../store/actions";

import {
  deletePostById,
  handleGetAllUsers,
} from "../../../services/userService";
import { toast } from "react-toastify";
import "./ModalConfirmDelete.scss";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
    };
  }

  handleGetAllUsers = async () => {
    let access_token = this.props.access_token;
    let data = await handleGetAllUsers(access_token);
    if (data && data.data) {
      this.setState({ listUser: data.data });
    }
  };
  componentDidMount() {
    // console.log(this.props.userCurrent);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}
  toggle = () => {
    this.props.toggleFromParent();
  };
  HandleDeletePost = async () => {
    try {
      let post = this.props.postCurrent;
      let id = post ? post.id : "";
      console.log(id);
      let access_token = this.props.access_token;
      let res = await deletePostById(access_token, id);
      if (res && res.code === 200) {
        this.toggle();
        toast.success("Delete Post Successfully");
        this.props.FetchPostAfterUpdate();
      } else if (res && res.code !== 200) {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  render() {
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
            size="md"
          >
            <ModalBody>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    Bạn có chắc chắn xóa bài viết không không?
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                className="save"
                onClick={this.HandleDeletePost}
              >
                Xác nhận
              </Button>
              <Button
                color="danger"
                className="close btn-primary"
                onClick={this.toggle}
              >
                Hủy bỏ
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
    access_token: state.user.access_token,
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
