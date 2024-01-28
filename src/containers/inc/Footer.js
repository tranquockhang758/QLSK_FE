import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Redirect, Route, Switch } from "react-router-dom";
import * as actions from "../../store/actions";

// import { FormattedMessage } from 'react-intl';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div>Footer</div>
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
