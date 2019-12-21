import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import { Layout } from "antd";
const { Footer } = Layout;
class footerComponent extends Component {
  state = {};
  render() {
    return (
      <Footer
        style={{
          backgroundColor: "#001529",
          color: "#FFF",
          textAlign: "center"
        }}
      >
        <p>Copyright ©2019 All rights reserved Embiot Technologies </p>
      </Footer>
    );
  }
}

export default footerComponent;
