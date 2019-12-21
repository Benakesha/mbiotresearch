import React, { Component } from "react";
import Aux from "./hoc/Aux";
import loginComponent from "./components/loginComponent/loginComponent";
import dashboardComponent from "./components/dashboardComponent/dashboardComponent";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./stores/actions/index";
import reportComponent from "./components/reportComponent/reportComponent";
import adduserComponent from "./components/adduserComponent/adduserComponent";

class App extends Component {
  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
    this.props.onTryAutoSignUp();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <Switch>
        <Route path="/" exact component={loginComponent} />
        <Route path="/dashboard" component={dashboardComponent} />
        <Route path="/adduser" component={adduserComponent} />
        <Route path="/report" component={reportComponent} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null //state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
