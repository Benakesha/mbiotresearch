import React, { Component } from "react";
import {
  Layout,
  Row,
  Col,
  Icon,
  Menu,
  Input,
  Select,
  Checkbox,
  Table,
  Divider,
  Tag,
  Pagination,
  Button
} from "antd";
import * as action from "../../stores/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import NavigationComponent from "../navigationComponent/navigationComponent";
import "./reportComponent.css";
import axios from "../../axiosInterceptor";
import { saveAs } from "file-saver";

const { Content } = Layout;
const columns = [
  {
    title: "Name",
    dataIndex: "fullname",
    key: "fullname"
    //  render: text => <a>{text}</a>
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "age"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "Phone",
    dataIndex: "phoneNo",
    key: "phoneNo"
  },
  {
    title: "Type of place",
    dataIndex: "typeOfPlace",
    key: "typeOfPlace"
  },
  {
    title: "ContractorName",
    dataIndex: "contractorName",
    key: "contractorName"
  },
  {
    title: "ContractorPhoneNo",
    dataIndex: "contractorPhoneNo",
    key: "contractorPhoneNo"
  },
  {
    title: "Latitude",
    dataIndex: "latitude",
    key: "latitude"
  },
  {
    title: "longitude",
    dataIndex: "longitude",
    key: "longitude"
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city"
  }
  // {
  //   title: "Action",
  //   key: "action",
  //   render: (text, record) => (
  //     <span>
  //       <Button type="link">Delete</Button>
  //     </span>
  //   )
  // }
];

class reportComponent extends Component {
  _isMounted = false;
  state = {
    selectedRows: [],
    tableData: []
  };
  componentDidMount() {
    this._isMounted = true;
    axios
      .get("/visitorData")
      .then(res => {
        if (res.data.success) {
          this.setState({ tableData: res.data.data });
        }
      })
      .catch(error => {
        console.log("er--", error);
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  onExportReport = () => {
    axios
      .get("/exportData", { responseType: "blob" })
      .then(res => {
        saveAs(res.data, "MbiotechVisitors.xlsx");
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    // const rowSelection = {
    //   onChange: (selectedRowKeys, selectedRows) => {
    //     this.setState({ selectedRows: selectedRows }, () => {
    //       console.log(this.state.selectedRows);
    //     });
    //   }
    // };
    return (
      <Row>
        <Col span={24}>
          <Layout>
            <NavigationComponent />
            <Content style={{ backgroundColor: "#FFF" }}>
              <Row>
                <Col
                  xs={{ span: 18, offset: 3 }}
                  sm={{ span: 12, offset: 3 }}
                  md={{ span: 22, offset: 1 }}
                >
                  <Button
                    type="primary"
                    ghost
                    htmlType="button"
                    style={{ marginTop: "3%" }}
                    onClick={this.onExportReport}
                  >
                    Export
                  </Button>

                  <div style={{ marginTop: "2%" }}>
                    <Table
                      rowKey={record => record.email}
                      columns={columns}
                      dataSource={this.state.tableData}
                      pagination
                      bordered
                    />
                  </div>
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
    isAuthenticated: state.auth.token != null
  };
};

export default connect(mapStateToProps)(reportComponent);
