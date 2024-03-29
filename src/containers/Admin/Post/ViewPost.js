import React, { Component } from "react";
// import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import {
  handleGetPostById,
  handleGetUserById,
  updatePostById,
} from "../../../services/userService";
import * as actions from "../../../store/actions";
// import thumbnail from "../../../assets/images/user4-128x128.jpg";
import { Link } from "react-router-dom";
import { breadcrumb } from "../../../utils/constant";
import { handleBuildBreadCrumb } from "../../Helper/BuildBBreadCrumb";
import Progress from "../../inc/Progress";
import { jwtDecode } from "jwt-decode";

import LogoutModal from "../../inc/LogoutModal.js";
class ViewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: {},
      arrLink: [],
      isLoadingPreloader: true,
      isOpenLogoutModal: false,
      view: "",
    };
  }

  async componentDidMount() {
    //Nếu token hết hạn logout
    let date = new Date();
    let newAccessToken =
      this.props.access_token !== "" ? this.props.access_token : "";
    let decodeToken = jwtDecode(newAccessToken);
    if (decodeToken !== "") {
      if (decodeToken.exp > date.getTime() / 1000) {
        let id = this.props.match.params.id ? this.props.match.params.id : "";
        let access_token = this.props.access_token;
        let res = await handleGetPostById(access_token, id);
        if (res && res.data && res.code === 200) {
          this.setState({
            posts: res.data,
            isLoadingPreloader: false,
            view: res.data.view,
          });
          this.props.getViewByPost(res.data.view);
        }

        const RunOnceTime = setTimeout(async () => {
          let newView = this.props.view + 1;
          let data = {
            view: newView,
          };
          let res = await updatePostById(access_token, data, id);
          if (res && res.code === 200) {
            console.log("Ok");
          }
        }, 180000);

        // // later...
        // clearInterval(slideInterval);
      } else if (decodeToken.exp < date.getTime() / 1000) {
        this.setState({ isOpenLogoutModal: true });
        // return this.props.history.push("/admin/logout");
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    let defaultValue = "";
    let arrLink = handleBuildBreadCrumb();
    // console.log(users);
    let users = this.props.userInfo;
    return (
      <>
        <>
          {/* Content Wrapper. Contains page content */}
          <div className="content-wrapper">
            <LogoutModal
              className={"modalLogout"}
              isOpenLogoutModal={this.state.isOpenLogoutModal}
            />
            {/* Content Header (Page header) */}
            <section className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-md-6"></div>
                  <div className="col-md-6">
                    <ol className="breadcrumb float-sm-right">
                      {arrLink &&
                        arrLink.length > 0 &&
                        arrLink.map((item, index) => {
                          let label = item.text;
                          return (
                            <Link
                              to={item.link}
                              key={index}
                              className={"breadcrumb-item"}
                            >
                              {breadcrumb.hasOwnProperty(item.text) ? (
                                <>{breadcrumb[label]}</>
                              ) : (
                                item.text
                              )}
                            </Link>
                          );
                        })}
                    </ol>
                  </div>
                </div>
              </div>
              {/* /.container-fluid */}
            </section>
            {/* Main content */}
            <section className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-3">
                    {/* Profile Image */}
                    <div className="card card-primary card-outline">
                      <div className="card-body box-profile">
                        <div className="text-center">
                          <img
                            className="profile-user-img img-fluid img-circle"
                            src={users.thumbnailUrl ? users.thumbnailUrl : ""}
                            alt={""}
                          />
                        </div>
                        <h3 className="profile-username text-center">
                          {users.name ? users.name : ""}
                        </h3>
                        <p className="text-muted text-center">
                          {users.role ? users.role : ""}
                        </p>
                        <ul className="list-group list-group-unbordered mb-3">
                          <li className="list-group-item">
                            <b>Followers</b>{" "}
                            <a
                              className="float-right"
                              href={defaultValue.toString()}
                            >
                              1,322
                            </a>
                          </li>
                          <li className="list-group-item">
                            <b>Following</b>{" "}
                            <a
                              className="float-right"
                              href={defaultValue.toString()}
                            >
                              543
                            </a>
                          </li>
                          <li className="list-group-item">
                            <b>Friends</b>{" "}
                            <a
                              className="float-right"
                              href={defaultValue.toString()}
                            >
                              13,287
                            </a>
                          </li>
                        </ul>
                        <a
                          href={defaultValue.toString()}
                          className="btn btn-primary btn-block"
                        >
                          <b>Follow</b>
                        </a>
                      </div>
                      {/* /.card-body */}
                    </div>
                    {/* /.card */}
                    {/* About Me Box */}
                    <div className="card card-primary">
                      <div className="card-header">
                        <h3 className="card-title">About Me</h3>
                      </div>
                      {/* /.card-header */}
                      <div className="card-body">
                        <strong>
                          <i className="fas fa-book mr-1" /> Education
                        </strong>
                        <p className="text-muted">
                          B.S. in Computer Science from the University of
                          Tennessee at Knoxville
                        </p>
                        <hr />
                        <strong>
                          <i className="fas fa-map-marker-alt mr-1" /> Location
                        </strong>
                        <p className="text-muted">Malibu, California</p>
                        <hr />
                        <strong>
                          <i className="fas fa-pencil-alt mr-1" /> Skills
                        </strong>
                        <p className="text-muted">
                          <span className="tag tag-danger">UI Design</span>
                          <span className="tag tag-success">Coding</span>
                          <span className="tag tag-info">Javascript</span>
                          <span className="tag tag-warning">PHP</span>
                          <span className="tag tag-primary">Node.js</span>
                        </p>
                        <hr />
                        <strong>
                          <i className="far fa-file-alt mr-1" /> Notes
                        </strong>
                        <p className="text-muted">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Etiam fermentum enim neque.
                        </p>
                      </div>
                      {/* /.card-body */}
                    </div>
                    {/* /.card */}
                  </div>
                  {/* /.col */}
                  <div className="col-md-9">
                    <div className="card">
                      <div className="card-header p-2">
                        <ul className="nav nav-pills">
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              href={defaultValue.toString()}
                              data-toggle="tab"
                            >
                              Activity
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              href={defaultValue.toString()}
                              data-toggle="tab"
                            >
                              Timeline
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              href={defaultValue.toString()}
                              data-toggle="tab"
                            >
                              Settings
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* /.card-header */}
                      <div className="card-body">
                        <div className="tab-content">
                          <div className="active tab-pane" id="activity">
                            {/* Post */}
                            <div className="post">
                              <div className="user-block">
                                <img
                                  className="img-circle img-bordered-sm"
                                  src={""}
                                  alt={""}
                                />
                                <span className="username">
                                  <a href={defaultValue.toString()}>
                                    Jonathan Burke Jr.
                                  </a>
                                  <a
                                    href={defaultValue.toString()}
                                    className="float-right btn-tool"
                                  >
                                    <i className="fas fa-times" />
                                  </a>
                                </span>
                                <span className="description">
                                  Shared publicly - 7:30 PM today
                                </span>
                              </div>
                              {/* /.user-block */}
                              <p>
                                Lorem ipsum represents a long-held tradition for
                                designers, typographers and the like. Some
                                people hate it and argue for its demise, but
                                others ignore the hate as they create awesome
                                tools to help create filler text for everyone
                                from bacon lovers to Charlie Sheen fans.
                              </p>
                              <p>
                                <a
                                  href={defaultValue.toString()}
                                  className="link-black text-sm mr-2"
                                >
                                  <i className="fas fa-share mr-1" /> Share
                                </a>
                                <a
                                  href={defaultValue.toString()}
                                  className="link-black text-sm"
                                >
                                  <i className="far fa-thumbs-up mr-1" /> Like
                                </a>
                                <span className="float-right">
                                  <a
                                    href={defaultValue.toString()}
                                    className="link-black text-sm"
                                  >
                                    <i className="far fa-comments mr-1" />{" "}
                                    Comments (5)
                                  </a>
                                </span>
                              </p>
                              <input
                                className="form-control form-control-sm"
                                type="text"
                                placeholder="Type a comment"
                              />
                            </div>
                            {/* /.post */}
                            {/* Post */}
                            <div className="post clearfix">
                              <div className="user-block">
                                <img
                                  className="img-circle img-bordered-sm"
                                  src="../../dist/img/user7-128x128.jpg"
                                  alt={""}
                                />
                                <span className="username">
                                  <a href={defaultValue.toString()}>
                                    Sarah Ross
                                  </a>
                                  <a
                                    href={defaultValue.toString()}
                                    className="float-right btn-tool"
                                  >
                                    <i className="fas fa-times" />
                                  </a>
                                </span>
                                <span className="description">
                                  Sent you a message - 3 days ago
                                </span>
                              </div>
                              {/* /.user-block */}
                              <p>
                                Lorem ipsum represents a long-held tradition for
                                designers, typographers and the like. Some
                                people hate it and argue for its demise, but
                                others ignore the hate as they create awesome
                                tools to help create filler text for everyone
                                from bacon lovers to Charlie Sheen fans.
                              </p>
                              <form className="form-horizontal">
                                <div className="input-group input-group-sm mb-0">
                                  <input
                                    className="form-control form-control-sm"
                                    placeholder="Response"
                                  />
                                  <div className="input-group-append">
                                    <button
                                      type="submit"
                                      className="btn btn-danger"
                                    >
                                      Send
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                            {/* /.post */}
                            {/* Post */}
                            <div className="post">
                              <div className="user-block">
                                <img
                                  className="img-circle img-bordered-sm"
                                  src="../../dist/img/user6-128x128.jpg"
                                  alt={""}
                                />
                                <span className="username">
                                  <a href={defaultValue.toString()}>
                                    Adam Jones
                                  </a>
                                  <a
                                    href={defaultValue.toString()}
                                    className="float-right btn-tool"
                                  >
                                    <i className="fas fa-times" />
                                  </a>
                                </span>
                                <span className="description">
                                  Posted 5 photos - 5 days ago
                                </span>
                              </div>
                              {/* /.user-block */}
                              <div className="row mb-3">
                                <div className="col-sm-6">
                                  <img
                                    className="img-fluid"
                                    src="../../dist/img/photo1.png"
                                    alt="Photo"
                                  />
                                </div>
                                {/* /.col */}
                                <div className="col-sm-6">
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <img
                                        className="img-fluid mb-3"
                                        src="../../dist/img/photo2.png"
                                        alt="Photo"
                                      />
                                      <img
                                        className="img-fluid"
                                        src="../../dist/img/photo3.jpg"
                                        alt="Photo"
                                      />
                                    </div>
                                    {/* /.col */}
                                    <div className="col-sm-6">
                                      <img
                                        className="img-fluid mb-3"
                                        src="../../dist/img/photo4.jpg"
                                        alt="Photo"
                                      />
                                      <img
                                        className="img-fluid"
                                        src="../../dist/img/photo1.png"
                                        alt="Photo"
                                      />
                                    </div>
                                    {/* /.col */}
                                  </div>
                                  {/* /.row */}
                                </div>
                                {/* /.col */}
                              </div>
                              {/* /.row */}
                              <p>
                                <a
                                  href={defaultValue.toString()}
                                  className="link-black text-sm mr-2"
                                >
                                  <i className="fas fa-share mr-1" /> Share
                                </a>
                                <a
                                  href={defaultValue.toString()}
                                  className="link-black text-sm"
                                >
                                  <i className="far fa-thumbs-up mr-1" /> Like
                                </a>
                                <span className="float-right">
                                  <a
                                    href={defaultValue.toString()}
                                    className="link-black text-sm"
                                  >
                                    <i className="far fa-comments mr-1" />{" "}
                                    Comments (5)
                                  </a>
                                </span>
                              </p>
                              <input
                                className="form-control form-control-sm"
                                type="text"
                                placeholder="Type a comment"
                              />
                            </div>
                            {/* /.post */}
                          </div>
                          {/* /.tab-pane */}
                          <div className="tab-pane" id="timeline">
                            {/* The timeline */}
                            <div className="timeline timeline-inverse">
                              {/* timeline time label */}
                              <div className="time-label">
                                <span className="bg-danger">10 Feb. 2014</span>
                              </div>
                              {/* /.timeline-label */}
                              {/* timeline item */}
                              <div>
                                <i className="fas fa-envelope bg-primary" />
                                <div className="timeline-item">
                                  <span className="time">
                                    <i className="far fa-clock" /> 12:05
                                  </span>
                                  <h3 className="timeline-header">
                                    <a href={defaultValue.toString()}>
                                      Support Team
                                    </a>{" "}
                                    sent you an email
                                  </h3>
                                  <div className="timeline-body">
                                    Etsy doostang zoodles disqus groupon greplin
                                    oooj voxy zoodles, weebly ning heekya
                                    handango imeem plugg dopplr jibjab, movity
                                    jajah plickers sifteo edmodo ifttt zimbra.
                                    Babblely odeo kaboodle quora plaxo ideeli
                                    hulu weebly balihoo...
                                  </div>
                                  <div className="timeline-footer">
                                    <a
                                      href={defaultValue.toString()}
                                      className="btn btn-primary btn-sm"
                                    >
                                      Read more
                                    </a>
                                    <a
                                      href={defaultValue.toString()}
                                      className="btn btn-danger btn-sm"
                                    >
                                      Delete
                                    </a>
                                  </div>
                                </div>
                              </div>
                              {/* END timeline item */}
                              {/* timeline item */}
                              <div>
                                <i className="fas fa-user bg-info" />
                                <div className="timeline-item">
                                  <span className="time">
                                    <i className="far fa-clock" /> 5 mins ago
                                  </span>
                                  <h3 className="timeline-header border-0">
                                    <a href={defaultValue.toString()}>
                                      Sarah Young
                                    </a>{" "}
                                    accepted your friend request
                                  </h3>
                                </div>
                              </div>
                              {/* END timeline item */}
                              {/* timeline item */}
                              <div>
                                <i className="fas fa-comments bg-warning" />
                                <div className="timeline-item">
                                  <span className="time">
                                    <i className="far fa-clock" /> 27 mins ago
                                  </span>
                                  <h3 className="timeline-header">
                                    <a href={defaultValue.toString()}>
                                      Jay White
                                    </a>{" "}
                                    commented on your post
                                  </h3>
                                  <div className="timeline-body">
                                    Take me to your leader! Switzerland is small
                                    and neutral! We are more like Germany,
                                    ambitious and misunderstood!
                                  </div>
                                  <div className="timeline-footer">
                                    <a
                                      href={defaultValue.toString()}
                                      className="btn btn-warning btn-flat btn-sm"
                                    >
                                      View comment
                                    </a>
                                  </div>
                                </div>
                              </div>
                              {/* END timeline item */}
                              {/* timeline time label */}
                              <div className="time-label">
                                <span className="bg-success">3 Jan. 2014</span>
                              </div>
                              {/* /.timeline-label */}
                              {/* timeline item */}
                              <div>
                                <i className="fas fa-camera bg-purple" />
                                <div className="timeline-item">
                                  <span className="time">
                                    <i className="far fa-clock" /> 2 days ago
                                  </span>
                                  <h3 className="timeline-header">
                                    <a href={defaultValue.toString()}>
                                      Mina Lee
                                    </a>{" "}
                                    uploaded new photos
                                  </h3>
                                  <div className="timeline-body">
                                    <img
                                      src="https://placehold.it/150x100"
                                      alt="..."
                                    />
                                    <img
                                      src="https://placehold.it/150x100"
                                      alt="..."
                                    />
                                    <img
                                      src="https://placehold.it/150x100"
                                      alt="..."
                                    />
                                    <img
                                      src="https://placehold.it/150x100"
                                      alt="..."
                                    />
                                  </div>
                                </div>
                              </div>
                              {/* END timeline item */}
                              <div>
                                <i className="far fa-clock bg-gray" />
                              </div>
                            </div>
                          </div>
                          {/* /.tab-pane */}
                          <div className="tab-pane" id="settings">
                            <form className="form-horizontal">
                              <div className="form-group row">
                                <label
                                  htmlFor="inputName"
                                  className="col-sm-2 col-form-label"
                                >
                                  Name
                                </label>
                                <div className="col-sm-10">
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="inputName"
                                    placeholder="Name"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label
                                  htmlFor="inputEmail"
                                  className="col-sm-2 col-form-label"
                                >
                                  Email
                                </label>
                                <div className="col-sm-10">
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="inputEmail"
                                    placeholder="Email"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label
                                  htmlFor="inputName2"
                                  className="col-sm-2 col-form-label"
                                >
                                  Name
                                </label>
                                <div className="col-sm-10">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="inputName2"
                                    placeholder="Name"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label
                                  htmlFor="inputExperience"
                                  className="col-sm-2 col-form-label"
                                >
                                  Experience
                                </label>
                                <div className="col-sm-10">
                                  <textarea
                                    className="form-control"
                                    id="inputExperience"
                                    placeholder="Experience"
                                    defaultValue={""}
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label
                                  htmlFor="inputSkills"
                                  className="col-sm-2 col-form-label"
                                >
                                  Skills
                                </label>
                                <div className="col-sm-10">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="inputSkills"
                                    placeholder="Skills"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <div className="offset-sm-2 col-sm-10">
                                  <div className="checkbox">
                                    <label>
                                      <input type="checkbox" /> I agree to the{" "}
                                      <a href={defaultValue.toString()}>
                                        terms and conditions
                                      </a>
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="form-group row">
                                <div className="offset-sm-2 col-sm-10">
                                  <button
                                    type="submit"
                                    className="btn btn-danger"
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                          {/* /.tab-pane */}
                        </div>
                        {/* /.tab-content */}
                      </div>
                      {/* /.card-body */}
                    </div>
                    {/* /.card */}
                  </div>
                  {/* /.col */}
                </div>
                {/* /.row */}
              </div>
              {this.state.isLoadingPreloader && <Progress />}
              {/* /.container-fluid */}
            </section>
            {/* /.content */}
            {/* /.================================================Preloader */}
          </div>
          {/* /.content-wrapper */}
        </>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    id: state.user.user_id,
    access_token: state.user.access_token,
    userInfo: state.user.userInfo,
    view: state.user.view,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserInfo: (data) => dispatch(actions.fetchUserInfo(data)),
    getViewByPost: (view) => dispatch(actions.getViewByPost(view)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost);
