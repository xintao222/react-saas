import React from 'react';
import { Card,Table,Space,Button,Input,Switch,Modal,message } from 'antd';
import https from "../../api/https";
import { EditOutlined } from '@ant-design/icons';
const { Search } = Input;
export default class ShopList extends React.Component {
    
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
                title: '商户ID',
                dataIndex: 'userId',
                ellipsis: true,
            },
            {
                title: '商户名称',
                dataIndex: 'userName',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
            {  
                title: '电话号码',
                dataIndex: 'mobile',
            },
            {  
                title: '地址',
                dataIndex: 'address',
            },
            {
              title: '状态',
              textWrap: 'word-break',
              render: record => (
                <Space size="middle">
                    <Switch 
                        checkedChildren="正常" 
                        unCheckedChildren="欠费" 
                        checked={record.status==1?true:false}
                        onClick={()=> this.onSwitch(record)} 
                    />
                </Space>
              ),
            },
            {  
                title: '剩余流量',
                dataIndex: 'remainFlow',
            },
            {  
                title: '每日流量限制',
                dataIndex: 'dailyLimit',
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

    onSwitch = record => {
        this.setState({
            visible: true,
            record: record
        });
    }
    handleOk = () => {
        let params = {
            userId: this.state.record.userId,
            status: this.state.record.status==1?2:1
        }
        console.log(params);
        https.fetchPost("/yx/user/updateStatus.action", params).then(data => {
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
        https.fetchGet("/yx/user/page.action", params).then(data => {
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
            userId: val,
        };
        https.fetchGet("/yx/user/getById", params).then(data => {
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
        window.shopList = record;
        this.props.history.push(`/shop/editShop`);
    }
    jump = () => {
        this.props.history.push(`/shop/addShop`);
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
            <Card title="商户管理" bordered={false}>
                <Search
                    placeholder="请输入搜索关键词"
                    enterButton="查询"
                    className="search"
                    onSearch={value => this.searchList(value)}
                />
                <Button type="primary" onClick={this.jump} style={{ float:'right' }}>创建商户</Button>
                <Table
                    rowKey={item => item.userId }
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
                <Modal
                title="提示"
                okText="确定"
                cancelText="取消"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                <p>确认更新状态？</p>
                </Modal>
            </Card>
        )

    }
}