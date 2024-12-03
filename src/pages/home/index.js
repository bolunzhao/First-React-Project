import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table } from "antd";
import * as Icon from "@ant-design/icons";
import "./home.css";
import { getData } from "../../api";
import MyEcharts from "../../components/Echarts";

// Data of table columns
const columns = [
  {
    title: "Course",
    dataIndex: "name",
  },
  {
    title: "Purchased Today",
    dataIndex: "todayBuy",
  },
  {
    title: "Purchased This Month",
    dataIndex: "monthBuy",
  },
  {
    title: "Purchased in total",
    dataIndex: "totalBuy",
  },
];
// Order statistics
const countData = [
  {
    name: "Completed (Daily)",
    value: 1234,
    icon: "CheckCircleOutlined",
    color: "#2ec7c9",
  },
  {
    name: "Bookmarked (Daily)",
    value: 3421,
    icon: "ClockCircleOutlined",
    color: "#ffb980",
  },
  {
    name: "Pending (Daily)",
    value: 1234,
    icon: "CloseCircleOutlined",
    color: "#5ab1ef",
  },
  {
    name: "Completed (Monthly)",
    value: 1234,
    icon: "CheckCircleOutlined",
    color: "#2ec7c9",
  },
  {
    name: "Bookmarked (Monthly)",
    value: 3421,
    icon: "ClockCircleOutlined",
    color: "#ffb980",
  },
  {
    name: "Pending (Monthly)",
    value: 1234,
    icon: "CloseCircleOutlined",
    color: "#5ab1ef",
  },
];
// Dynamically get icons
const iconToElements = (name) => React.createElement(Icon[name]);

const Home = () => {
  const userImg = require("../../assets/images/spiderman.jpg");
  // Create echarts response data
  const [echartData, setEchartData] = useState({});
  // Initially rendered DOM
  useEffect(() => {
    getData().then(({ data }) => {
      console.log(data, "res");
      const { tableData, orderData, userData, videoData } = data.data;
      setTableData(tableData);
      // Assemble data for echarts
      const order = orderData;
      // X axi data
      const xData = order.date;
      // Assemble series data
      const keyArray = Object.keys(order.data[0]);
      const series = [];
      keyArray.forEach((key) => {
        series.push({
          name: key,
          data: order.data.map((item) => item[key]),
          type: "line",
        });
      });
      setEchartData({
        order: {
          xData,
          series,
        },
        user: {
          xData: userData.map((item) => item.date),
          series: [
            {
              name: "New user",
              data: userData.map((item) => item.new),
              type: "bar",
            },
            {
              name: "Active user",
              data: userData.map((item) => item.active),
              type: "bar",
            },
          ],
        },
        video: {
          series: [
            {
              data: videoData,
              type: "pie",
            },
          ],
        },
      });
    });
  }, []);
  // Define the data in the table
  const [tableData, setTableData] = useState([]);
  return (
    <Row className="home">
      <Col span={8}>
        <Card hoverable>
          <div className="user">
            <img src={userImg} />
            <div className="userinfo">
              <p className="name">Admin</p>
              <p className="access">Super Administrator</p>
            </div>
          </div>
          <div className="login-info">
            <p>
              Last login time: <span>2024-9-19</span>
            </p>
            <p>
              Last login location: <span>Seattle, WA</span>
            </p>
          </div>
        </Card>
        <Card hoverable>
          <div className="table-content">
            <Table
              tableLayout="auto"
              rowKey={"name"}
              columns={columns}
              dataSource={tableData}
              pagination={false}
            />
          </div>
        </Card>
      </Col>
      <Col span={16}>
        <div className="num">
          {countData.map((item, index) => {
            return (
              <Card key={index}>
                <div className="icon-box" style={{ background: item.color }}>
                  {iconToElements(item.icon)}
                </div>
                <div className="detail">
                  <p className="num">${item.value}</p>
                  <p className="txt">{item.name}</p>
                </div>
              </Card>
            );
          })}
        </div>
        {echartData.order && (
          <MyEcharts chartData={echartData.order} style={{ height: "280px" }} />
        )}
        <div className="graph">
          {echartData.user && (
            <MyEcharts
              chartData={echartData.user}
              style={{ height: "240px", width: "50%" }}
            />
          )}
          {echartData.video && (
            <MyEcharts
              chartData={echartData.video}
              isAxisChart={false}
              style={{ height: "260px", width: "50%" }}
            />
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Home;
