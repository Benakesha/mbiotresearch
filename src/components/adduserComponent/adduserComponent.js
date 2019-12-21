import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import {
  Layout,
  Row,
  Col,
  Input,
  Button,
  Icon,
  Form,
  Select,
  message
} from "antd";
import "./adduserComponent.css";
import validator from "validator";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import * as action from "../../stores/actions/index";
import NavigationComponent from "../navigationComponent/navigationComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faMapPin } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axiosInterceptor";

const { Option } = Select;
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
const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const nameRegx = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
class adduserComponent extends Component {
  state = {
    username: null,
    email: null,
    password: null,
    phoneNo: null,
    address: null,
    pincode: null,
    role: "select",
    formError: {
      username: "",
      email: "",
      password: "",
      phoneNo: "",
      address: "",
      pincode: "",
      role: ""
    }
  };

  onInputChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formError;

    switch (name) {
      case "username":
        if (value.length > 0 && !nameRegx.test(value.trim())) {
          formErrors.username = "Please enter valid username";
        } else if (value.length < 3 && value.length > 0) {
          formErrors.username = "Min 3 character required";
        } else {
          formErrors.username = "";
        }
        break;
      case "email":
        formErrors.email =
          emailRegx.test(value) && value.length > 0 ? "" : "Enter valid email";
        break;
      case "password":
        if (!passwordReg.test(value) && value.length > 0) {
          formErrors.password =
            "Password should contains atleast 1 lowercase ,1 uppercase,1 numeric ,1 special character and length must be 8";
        } else {
          formErrors.password = "";
        }

        break;
      case "phoneNo":
        if (value.length < 10 && value.length > 0) {
          formErrors.phoneNo = "Enter valid phone number";
        } else if (value.length > 0 && !validator.isInt(value.trim())) {
          formErrors.phoneNo = "Phone number should be a number";
        } else if (value.length > 10) {
          formErrors.phoneNo = "Phone number should be 10 digit";
        } else {
          formErrors.phoneNo = "";
        }

        break;
      case "address":
        formErrors.address =
          value.trim() !== "" && value.length > 0 ? "" : "please enter address";
        break;
      case "pincode":
        if (value.length < 6 && value.length > 0) {
          formErrors.pincode = "Min 6 character required";
        } else if (value.length > 0 && !validator.isInt(value.trim())) {
          formErrors.pincode = "Pincode should be a number";
        } else if (value.length > 6 && value.length > 0) {
          formErrors.pincode = "Max 6 character allowed";
        } else {
          formErrors.pincode = "";
        }

        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => {
      //console.log(this.state);
    });
  };

  onButtonClickHandler = e => {
    let {
      email,
      password,
      username,
      phoneNo,
      address,
      pincode,
      role,
      formError
    } = this.state;
    if (email === null) {
      formError.email = "Email field required";
    }
    if (password === null) {
      formError.password = "Password field required";
    }
    if (username === null) {
      formError.username = "Username field required";
    }
    if (phoneNo === null) {
      formError.phoneNo = "Phone no field required";
    }
    if (address === null) {
      formError.address = "Address field required";
    }
    if (pincode === null) {
      formError.pincode = "Pincode field required";
    }
    if (role === "select") {
      formError.role = "Role is required";
    }
    this.setState({ formError });
  };
  selectChangeHandle = value => {
    let formErrors = this.state.formError;
    let name = "role";
    switch (name) {
      case "role":
        formErrors.role =
          value.trim() === "select" ? "please select role " : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => {});
  };
  adduserSubmitHandler = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      const userData = {
        username: validator.escape(this.state.username),
        email: validator.escape(this.state.email),
        password: validator.escape(this.state.password),
        phoneNo: validator.escape(this.state.phoneNo),
        address: validator.escape(this.state.address),
        pincode: validator.escape(this.state.pincode),
        role: validator.escape(this.state.role)
      };
      axios
        .post("/signup", { userData })
        .then(response => {
          if (response.data.success) {
            message.info(response.data.message);
          } else {
            message.error(response.data.message);
          }
        })
        .catch(error => {
          message.error(error);
        });
    }
  };
  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    let { formError } = this.state;
    return (
      <Row>
        <Col span={24}>
          <Layout>
            <NavigationComponent />
            <Content style={{ backgroundColor: "#FFF" }}>
              <Row>
                <Col
                  xs={{ span: 18, offset: 3 }}
                  sm={{ span: 12, offset: 7 }}
                  md={{ span: 10, offset: 7 }}
                  className="card"
                >
                  <form className="form" onSubmit={this.adduserSubmitHandler}>
                    <h3 className="h3">Add New Site Executive </h3>
                    <Form.Item
                      className="formElement"
                      hasFeedback
                      validateStatus={
                        formError.username.length > 0 ? "error" : ""
                      }
                      help={formError.username}
                    >
                      <Input
                        placeholder="Full name"
                        name="username"
                        prefix={
                          <Icon
                            type="user"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        onChange={event => this.onInputChange(event)}
                      />
                    </Form.Item>
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
                          <Icon
                            type="ie"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        onChange={event => this.onInputChange(event)}
                      />
                    </Form.Item>
                    <Form.Item
                      className="formElement"
                      hasFeedback
                      validateStatus={
                        formError.password.length > 0 ? "error" : ""
                      }
                      help={formError.password}
                    >
                      <Input
                        required
                        placeholder="password"
                        name="password"
                        prefix={
                          <Icon
                            type="lock"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        onChange={event => this.onInputChange(event)}
                      />
                    </Form.Item>
                    <Form.Item
                      className="formElement"
                      hasFeedback
                      validateStatus={
                        formError.phoneNo.length > 0 ? "error" : ""
                      }
                      help={formError.phoneNo}
                    >
                      <Input
                        placeholder="Phone number"
                        name="phoneNo"
                        prefix={
                          <Icon
                            type="phone"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        onChange={event => this.onInputChange(event)}
                      />
                    </Form.Item>

                    <Form.Item
                      className="formElement"
                      hasFeedback
                      validateStatus={
                        formError.address.length > 0 ? "error" : ""
                      }
                      help={formError.address}
                    >
                      <Input.TextArea
                        placeholder="Address"
                        name="address"
                        onChange={event => this.onInputChange(event)}
                      />
                    </Form.Item>
                    <Form.Item
                      className="formElement"
                      hasFeedback
                      validateStatus={
                        formError.pincode.length > 0 ? "error" : ""
                      }
                      help={formError.pincode}
                    >
                      <Input
                        placeholder="Pincode"
                        name="pincode"
                        prefix={
                          <FontAwesomeIcon
                            icon={faMapPin}
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        onChange={event => this.onInputChange(event)}
                      />
                    </Form.Item>

                    <Form.Item
                      className="formElement"
                      hasFeedback
                      validateStatus={formError.role.length > 0 ? "error" : ""}
                      help={formError.role}
                    >
                      <Select
                        defaultValue="select"
                        style={{ width: "100%" }}
                        onChange={this.selectChangeHandle}
                        showArrow={true}
                      >
                        <Option key="select" value="select" disabled>
                          Select Role
                        </Option>
                        <Option key="admin" value="admin">
                          Admin
                        </Option>
                        <Option key="executive" value="executive">
                          Executive
                        </Option>
                      </Select>
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
                        Add User
                        <Icon type="user-add" style={{ marginLeft: "3%" }} />
                      </Button>
                    </Form.Item>
                  </form>
                </Col>
              </Row>
            </Content>
          </Layout>
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
      dispatch(action.setAuthRedirectPath("/adduser"))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(adduserComponent);
