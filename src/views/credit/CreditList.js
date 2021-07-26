import React from 'react';
import { Card,Table,Space,Button,Input,message } from 'antd';
import https from "../../api/https";
import { EditOutlined } from '@ant-design/icons';
const { Search } = Input;
export default class CreditList extends React.Component {
    
    state = {
        visible: false,
        record: null,
        current:1,
        pageSize:10,
        pageTotal:0,
        list:[],
        selectedRowKeys:[],
        columns:[
            {
                title: '规则ID',
                dataIndex: 'creditId',
                ellipsis: true,
            },
            {
                title: '规则说明',
                dataIndex: 'comment',
            },
            {
                title: '套餐资费(元)',
                render: record => (
                    <Space size="middle">
                      { (+record.creditCharge)/100 }
                    </Space>
                ),
            },
            {  
                title: '套餐包含消息量',
                render: record => (
                    <Space size="middle">
                      {(!record.totalAmount || record.totalAmount==0)? '-' : record.totalAmount}
                    </Space>
                ),
            },
            {  
                title: '有效期(天)',
                render: record => (
                    <Space size="middle">
                        {(!record.validDays || record.validDays==0)? '-' : record.validDays}
                    </Space>
                ),
            },
            {  
                title: '创建时间',
                dataIndex: 'createTime',
            },
            {
              title: '操作',
              key: 'action',
              render: record => (
                <Space size="middle">
                  <Button type="primary" onClick={(e) => this.onEdit(record,e)} icon={<EditOutlined />} size="size" />
                </Space>
              ),
            },
        ],
    }

    getList = (index) => {
        let params = {
            pageNum: index,
            pageSize: 10
        };
        https.fetchGet("/yx/saascredit/page.action", params).then(data => {
            if (data.code === 0) {
                console.log(data);
                this.setState({
                    list: data.data.rows,
                    pageTotal:data.data.total,
                    pageSize:10,
                    current:index,
                });
            }
        })
    }
    searchList = (val) => {
        if(!val){
            this.getList(1);
            return;
        }
        let params = {
            id: val,
        };
        https.fetchGet("/yx/saascredit/getById", params).then(data => {
            if (data.code === 0) {
                console.log(data);
                return;
                this.setState({
                    list: data.data,
                    pageTotal:data.data.length,
                    pageSize:data.data.length,
                    current:1,
                });
            }
        })
    }
    onEdit = (record,e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        window.creditList = record;
        this.props.history.push(`/credit/editCredit`);
    }
    jump = () => {
        this.props.history.push(`/credit/addCredit`);
    }
    goPage = index => {
        this.getList(index);
    }
    componentWillMount() {
        this.getList(1);
    }
    render() {
        const { list,current,pageSize,pageTotal,columns } = this.state
        return (
            <Card title="套餐管理" bordered={false}>
                <Search
                    placeholder="请输入搜索关键词"
                    enterButton="查询"
                    className="search"
                    onSearch={value => this.searchList(value)}
                />
                <Button type="primary" onClick={this.jump} style={{ float:'right' }}>新建套餐</Button>
                <Table
                    rowKey={item => item.creditId }
                    columns={columns}
                    customRow={"setRow"}
                    dataSource={list}
                    pagination={{
                        total: pageTotal,
                        current: current,
                        pageSize: pageSize,
                        onChange: this.goPage,
                        showSizeChanger:false
                    }}
                />
            </Card>
        )

    }
}