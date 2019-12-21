import React, { Component } from "react";
import { Layout, Row, Col, Icon, Menu, Input, Select, Checkbox } from "antd";
import * as action from "../../stores/actions/index";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Aux from "../../hoc/Aux";

class navigationComponent extends Component {
  state = { current: "dashboard" };

  handleClick = e => {
    this.setState(
      {
        current: e.key
      },
      () => {
        console.log(this.state.current);
        this.props.history.push(`/${this.state.current}`);
      }
    );
  };
  onLogoutHandler = () => {
    this.props.onLogout();
  };

  render() {
    const { visible, ...rest } = this.state;
    console.log(this.props);
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        theme="dark"
        style={{
          backgroundColor: "#45526e",
          color: "#FFF"
        }}
        overflowedIndicator={
          <Icon
            type="more"
            style={{
              paddingLeft: "200%",
              fontSize: "20px",
              fontWeight: "bolder"
            }}
          />
        }
      >
        <Menu.Item key="navBrand" disabled>
          MbioTech
        </Menu.Item>
        <Menu.Item key="dashboard">
          <Icon type="dashboard" />
          Dashboard
        </Menu.Item>
        {this.props.role === "admin" ? (
          <Menu.Item key="report">
            <Icon type="file-excel" />
            Report
          </Menu.Item>
        ) : null}
        {this.props.role === "admin" ? (
          <Menu.Item key="adduser">
            <Icon type="file-excel" />
            Add user
          </Menu.Item>
        ) : null}
        <Menu.Item key="logout" onClick={this.onLogoutHandler}>
          <Icon type="poweroff" />
          Logout
        </Menu.Item>
      </Menu>
    );
  }
}
const mapStateToProps = state => {
  return {
    role: state.auth.role
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(action.logout())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(navigationComponent));
