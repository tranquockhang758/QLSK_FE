import React, { Component } from "react";
import { connect } from "react-redux";

// import { FormattedMessage } from 'react-intl';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <footer className="main-footer bg-primary">
          <div className="float-right d-none d-sm-block">
            {/* <b>Version</b> 3.2.0 */}
          </div>
          <span>
            Copyright by Admin EVNHPC &copy; 2023-2024
            {/* <a href>Tran Quoc Khang</a>. */}
          </span>{" "}
          All rights reserved.
        </footer>
        <aside className="control-sidebar control-sidebar-dark"></aside>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
