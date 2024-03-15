import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions";
import "./ErrorPage.scss";
class ErrorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.microphoneParentRef = React.createRef();
  }

  changeLanguage = (language) => {
    this.props.changeLanguage(language);
  };

  componentDidMount() {
    setTimeout(() => this.setState(() => ({ isLoading: false })), 1000);
  }

  
  render() {

    //Đến mức 570 thì độ rộng của dropdown menu bị mất
    return (
        <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              {/* <div className="col-sm-6">
                <h1>404 Error Page</h1>
              </div> */}
              <div className="col-md-6"></div>
              <div className="col-md-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                   <Link to="/admin">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">404 Error Page</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content content-error-page">
          <div className="error-page">
            {/* <h2 className="headline text-warning"> 404</h2> */}
            <div className="error-content">
              <h3>
                <i className="fas fa-exclamation-triangle text-warning" /> Oops! Page
                not found.
              </h3>
              <p>
                Bạn không có quyền truy cập vào đường link trên. Xin lỗi, bạn hãy truy cập về trang chủ
                <Link to="/admin" className="ml-1">Trang chủ</Link>
              </p>
              {/* <form className="search-form">
                <div className="input-group">
                  <input
                    type="text"
                    name="search"
                    className="form-control"
                    placeholder="Search"
                  />
                  <div className="input-group-append">
                    <button type="submit" name="submit" className="btn btn-warning">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </div> */}
              {/* </form> */}
            </div>
            {/* /.error-content */}
          </div>
          {/* /.error-page */}
        </section>
        {/* /.content */}
      </div>
      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    user_id: state.user.user_id,
    access_token: state.user.access_token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (language) => dispatch(actions.ChangeLanguage(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage);
