import React from 'react';
import { Card,Table,Input } from 'antd';
import https from "../../api/https";
const { Search } = Input;
export default class DailyMsgList extends React.Component {
    
    state = {
        visible: false,
        record: null,
        current:1,
        pageSize:10,
        pageTotal:0,
        list:[],
        columns:[
            {
                title: 'ID',
                width: 100,
                dataIndex: 'id',
            },
            {
                title: '商户名称',
                dataIndex: 'userName',
            },
            {
                title: '商户标识',
                dataIndex: 'userId',
            },
            {
                title: '日发送量',
                width: 180,
                dataIndex: 'dailyAmount',
            },
            {  
                title: '日期',
                width: 180,
                dataIndex: 'date',
            }
        ],
    }
    getList = (index) => {
        let params = {
            pageNum: index,
            pageSize: 10
        };
        https.fetchGet("/yx/dailyusermsgstat/page.action", params).then(data => {
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
        https.fetchGet("/yx/dailyusermsgstat/getById", params).then(data => {
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
    goPage = index => {
        this.getList(index);
    }
    componentWillMount() {
        this.getList(1);
    }
    render() {
        const { list,current,pageSize,pageTotal,columns } = this.state
        return (
            <Card title="每日商户发送量管理" bordered={false}>
                <Search
                    placeholder="请输入搜索关键词"
                    enterButton="查询"
                    className="search"
                    onSearch={value => this.searchList(value)}
                />
                <Table
                    rowKey={item => item.id }
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