import React, { Component } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./LogoutModal.scss";
// import Select from "react-select";
class LogoutModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // console.log(this.props.userCurrent);
  }
  handleLogout = () => {
    return this.props.history.push("/admin/logout");
  };

  render() {
    return (
      <>
        <div>
          {/* <Button color="danger btn" onClick={this.toggle}>
            {this.props.buttonLabel}
          </Button> */}
          <Modal
            isOpen={this.props.isOpenLogoutModal}
            // toggle={this.toggle}
            className={this.props.className}
            size="sm"
          >
            <ModalBody>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <span className="notification-title">Thông báo</span>
                    <span className="notification-content">
                      Phiên đăng nhập đã hết hạn vui lòng đăng nhập lại
                    </span>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <span
                className="confirm-logout"
                onClick={() => {
                  this.handleLogout();
                }}
              >
                Xác nhận
              </span>
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
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LogoutModal)
);
