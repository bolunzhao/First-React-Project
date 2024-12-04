import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Table,
  Popconfirm,
  Modal,
  InputNumber,
  Select,
  DatePicker,
} from "antd";
import "./user.css";
import { getUser, addUser, editUser, deleteUser } from "../../api";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";

const User = () => {
  const [listData, setListData] = useState({
    name: "",
  });
  const [tableData, setTableData] = useState([]);
  // 0 - Add, 1 - Edit
  const [modalType, setModalType] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Create an instance of Form
  const [form] = Form.useForm();
  // Add or Edit
  const handleClick = (type, rowData) => {
    setIsModalOpen(!isModalOpen);
    if (type == "add") {
      setModalType(0);
    } else {
      const cloneData = JSON.parse(JSON.stringify(rowData));
      cloneData.birth = dayjs(rowData.birth);
      // Backfill chart data
      setModalType(1);
      form.setFieldsValue(cloneData);
    }
  };
  // Submit
  const handleFinish = (e) => {
    setListData({
      name: e.keyword,
    });
  };
  useEffect(() => {
    getTableData();
  }, [listData]);
  // Delete
  const handleDelete = ({ id }) => {
    deleteUser({ id }).then(() => {
      getTableData();
    });
  };
  const getTableData = () => {
    getUser(listData).then(({ data }) => {
      setTableData(data.list);
    });
  };

  // Click OK on pop-up
  const handleOk = () => {
    // Validate the form
    form
      .validateFields()
      .then((val) => {
        // Date param
        val.birth = dayjs(val.birth).format("YYYY-MM-DD");
        console.log(val, "val");
        // Call the backend interface
        if (modalType) {
          // Edit
          editUser(val).then(() => {
            handleCancel();
            getTableData();
          });
        } else {
          addUser(val).then(() => {
            handleCancel();
            getTableData();
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Click Cancel on pop-up
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Gender",
      dataIndex: "sex",
      render: (val) => {
        return val ? "Female" : "Male";
      },
    },
    {
      title: "Birthday",
      dataIndex: "birth",
    },
    {
      title: "Address",
      dataIndex: "addr",
    },
    {
      title: "Operation",
      render: (rowData) => {
        return (
          <div className="flex-box">
            <Button
              style={{ marginRight: "5px" }}
              onClick={() => handleClick("edit", rowData)}
            >
              Edit
            </Button>
            <Popconfirm
              title="Warning"
              description="This will delete the user. Continue?"
              okText="OK"
              cancelText="Cancel"
              onConfirm={() => handleDelete(rowData)}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    // Call backend interface to get the list of users
    getTableData();
  }, []);

  return (
    <div className="user">
      <div className="flex-box space-between">
        <Button type="primary" onClick={() => handleClick("add")}>
          +Add
        </Button>
        <Form layout="inline" onFinish={handleFinish}>
          <Form.Item name="keyword">
            <Input placeholder="Enter your username" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Search
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table
        style={{ marginTop: "10px" }}
        columns={columns}
        dataSource={tableData}
        rowKey={"id"}
      />
      <Modal
        open={isModalOpen}
        title={modalType ? "Edit a user" : "Add a user"}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="OK"
        cancelText="Cancel"
      >
        <Form
          form={form}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          labelAlign="left"
        >
          {modalType == 1 && (
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
          )}
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Name is required",
              },
            ]}
          >
            <Input placeholder="Please enter the name" />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[
              {
                required: true,
                message: "Age is required",
              },
              {
                type: "number",
                message: "Please enter a valid number",
              },
            ]}
          >
            <InputNumber placeholder="Please enter the age" />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="sex"
            rules={[
              {
                required: true,
                message: "Gender is required",
              },
            ]}
          >
            <Select
              placeholder="Please select the gender"
              options={[
                { value: 0, label: "Male" },
                { value: 1, label: "Female" },
                { value: 2, label: "Prefer not to say" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Birthday"
            name="birth"
            rules={[
              {
                required: true,
                message: "Birthday is required",
              },
            ]}
          >
            <DatePicker placeholder="Please select" format="YYYY/MM/DD" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="addr"
            rules={[
              {
                required: true,
                message: "Address is required",
              },
            ]}
          >
            <Input placeholder="Please enter the address" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default User;
