import React, { useEffect, useState } from "react";
import { Button, Form, Input, Table, Popconfirm } from 'antd'
import './user.css'
import { getUser } from '../../api'

const User = () => {
    const [ listData, setListData ] = useState({
        name: ''
    })
    const [ tableData, setTableData ] = useState([])
    // Add
    const handleClick = (type, rowData) => {

    }
    // Submit
    const handleFinish = (e) => {
        setListData({
            name: e.name
        })
        console.log(e)
    }
    // Delete
    const handleDelete = (rowData) => {

    }
    const getTableData = () => {
        getUser(listData).then(({ data }) => {
            setTableData(data.list)
        })
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Age',
            dataIndex: 'age'
        },
        {
            title: 'Gender',
            dataIndex: 'sex',
            render: (val) => {
                return val ? 'Female' : 'Male'
            }
        },
        {
            title: 'Birthday',
            dataIndex: 'birth'
        },
        {
            title: 'Address',
            dataIndex: 'addr'
        },
        {
            title: 'Operation',
            render: (rowData) => {
                return (
                    <div className="flex-box">
                        <Button style={{ marginRight: '5px'}} onClick={() => handleClick('edit', rowData)}>Edit</Button>
                        <Popconfirm
                            title="Warning"
                            description="This will delete the user. Continue?"
                            okText="OK"
                            cancelText="Cancel"
                            onConfirm={() => handleDelete(rowData)}
                        >
                            <Button type="primary" danger>Delete</Button>
                        </Popconfirm>
                    </div>
                )
            }
        },
    ]
    useEffect(() => {
        // Call backend interface to get the list of users
        getTableData()
    }, [listData])

    return (
        <div className="user">
            <div className="flex-box space-between">
                <Button type="primary" onClick={() => handleClick('add')}>+Add</Button>
                <Form layout="inline" onFinish={handleFinish}>
                    <Form.Item name="keyword">
                        <Input placeholder="Enter your username"/>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">Search</Button>
                    </Form.Item>
                </Form>
            </div>
            <Table columns={columns} dataSource={tableData} rowKey={'id'}/>
        </div>
    )
}

export default User