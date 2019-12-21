import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import { Layout, Row, Col, Input, Button, Icon, Form } from "antd";
import "./loginComponent.css";
import validator from "validator";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import * as action from "../../stores/actions/index";

const { Header, Content } = Layout;

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });
  return valid;
};
const emailRegx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

class loginComponent extends Component {
  state = {
    email: null,
    password: null,
    touched: {
      email: false,
      password: false
    },
    formError: { email: "", password: "" }
  };

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.onSetAuthRedirectPath();
    }
  }
  onInputChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formError;

    switch (name) {
      case "email":
        formErrors.email =
          emailRegx.test(value) && value.length > 0 ? "" : "Enter valid email";
        break;
      case "password":
        formErrors.password =
          value.length < 6 && value.length > 0
            ? "Min 6 character required"
            : "";

        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => {
      //console.log(this.state);
    });
  };

  onButtonClickHandler = e => {
    let { email, password, formError } = this.state;
    if (email === null && password === null) {
      formError.email = "Email field required";
      formError.password = "Password field required";
    }
    this.setState({ formError });
  };
  loginSubmitHandler = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      const userData = {
        email: this.state.email,
        password: this.state.password
      };
      this.props.onAuth(userData);
    }
  };

  render() {
    let { formError } = this.state;
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      // console.log("pro----", this.props);
      // authRedirect = <Redirect to={this.props.authRedirectPath} />;
      this.props.history.push("/dashboard");
    }
    return (
      <Row>
        {/* {authRedirect} */}
        <Col
          xs={{ span: 18, offset: 3 }}
          sm={{ span: 12, offset: 7 }}
          md={{ span: 10, offset: 7 }}
          className="card"
        >
          <form className="form" onSubmit={this.loginSubmitHandler}>
            <h3 className="h3">Login to Site Executive </h3>
            <Form.Item
              className="formElement"
              hasFeedback
              validateStatus={formError.email.length > 0 ? "error" : ""}
              help={formError.email}
            >
              <Input
                placeholder="email"
                name="email"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                onChange={event => this.onInputChange(event)}
              />
            </Form.Item>
            <Form.Item
              className="formElement"
              hasFeedback
              validateStatus={formError.password.length > 0 ? "error" : ""}
              help={formError.password}
            >
              <Input
                required
                placeholder="password"
                name="password"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                onChange={event => this.onInputChange(event)}
              />
            </Form.Item>
            <Form.Item className="formElement">
              <Button
                onClick={this.onButtonClickHandler}
                htmlType="submit"
                block
                style={{
                  backgroundColor: "#45526e",
                  color: "#FFF",
                  fontSize: "18px"
                }}
              >
                Login
                <Icon type="login" style={{ marginLeft: "3%" }} />
              </Button>
            </Form.Item>
          </form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    isError: state.auth.error,
    isLoading: state.auth.loading,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: userData => dispatch(action.loginAction(userData)),
    onSetAuthRedirectPath: () =>
      dispatch(action.setAuthRedirectPath("/dashboard"))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(loginComponent);
