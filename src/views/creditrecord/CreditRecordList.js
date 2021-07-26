import React from 'react';
import { Card,Table,Space,Button,Input,message } from 'antd';
import https from "../../api/https";
import { EditOutlined } from '@ant-design/icons';
const { Search } = Input;
export default class CreditRecordList extends React.Component {
    
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
                title: 'ID',
                dataIndex: 'id',
                ellipsis: true,
            },
            {
                title: '用户名',
                dataIndex: 'userId',
            },
            {
                title: '套餐ID',
                dataIndex: 'creditId',
            },
            {
                title: '套餐状态',
                render: record => (
                  <Space size="middle">
                      <Switch 
                          checkedChildren="有效" 
                          unCheckedChildren="无效" 
                          checked={record.status==0?true:false}
                          onClick={()=> this.onSwitch(record)} 
                      />
                  </Space>
                ),
            },
            {
                title: '缴费金额(元)',
                render: record => (
                    <Space size="middle">
                      { (+record.charge)/100 }
                    </Space>
                ),
            },
            {  
                title: '套餐签购时间',
                dataIndex: 'createTime',
            }
        ],
    }

    onSwitch = record => {
        this.setState({
            visible: true,
            record: record
        });
    }
    handleOk = () => {
        let params = {
            id: this.state.record.id,
            status: this.state.record.status==0?1:0
        }
        console.log(params);
        https.fetchPost("/yx/creditrecord/updateStatus.action", params).then(data => {
            if (data.code === 0) {
                message.success("更新成功");
                this.getList(1);
            }
            else message.error("更新失败");
        })
        this.setState({
          visible: false,
        });
    };
    
    handleCancel = () => {
        this.setState({
          visible: false,
        });
    };

    getList = (index) => {
        let params = {
            pageNum: index,
            pageSize: 10
        };
        https.fetchGet("/yx/creditrecord/page.action", params).then(data => {
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
        https.fetchGet("/yx/creditrecord/getById", params).then(data => {
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
        this.props.history.push(`/creditrecord/editCreditRecord`);
    }
    jump = () => {
        this.props.history.push(`/creditrecord/addCreditRecord`);
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
            <Card title="套餐订购管理" bordered={false}>
                <Search
                    placeholder="请输入搜索关键词"
                    enterButton="查询"
                    className="search"
                    onSearch={value => this.searchList(value)}
                />
                <Button type="primary" onClick={this.jump} style={{ float:'right' }}>新建</Button>
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