import React from 'react';
import { Card,Table,Space,Button,Input,Switch,Modal,message } from 'antd';
import https from "../../api/https";
import { EditOutlined } from '@ant-design/icons';
const { Search } = Input;
export default class TargetList extends React.Component {
    
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
                title: '链接ID',
                dataIndex: 'targetId',
                ellipsis: true,
            },
            {
                title: '跳转类型',
                render: record => (
                    <Space size="middle">
                        {this.getJumpType(record.jumptype)}
                    </Space>
                ),
            },
            {
                title: '目标链接',
                dataIndex: 'target',
            },
            {  
                title: '按钮文本',
                dataIndex: 'btnnm',
            },
            {
              title: '状态',
              textWrap: 'word-break',
              render: record => (
                <Space size="middle">
                    <Switch 
                        checkedChildren="可用" 
                        unCheckedChildren="不可用" 
                        checked={record.status==1?true:false}
                        onClick={()=> this.onSwitch(record)} 
                    />
                </Space>
              ),
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

    getJumpType = type => {
        let result = '';
        type = +type;
        switch(type) {
            case 1: {
                result = 'url';
                break;
            }
            case 2: {
                result = '功能页';
                break;
            }
            default:{
            	result = '';
                break;
            }
        }
        return result;
    }

    onSwitch = record => {
        this.setState({
            visible: true,
            record: record
        });
    }
    handleOk = () => {
        let params = {
            targetId: this.state.record.targetId,
            enable: this.state.record.enable==1?2:1
        }
        console.log(params);
        https.fetchPost("/yx/msgtemplatetarget/updateStatus.action", params).then(data => {
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
        https.fetchGet("/yx/msgtemplatetarget/page.action", params).then(data => {
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
        https.fetchGet("/yx/msgtemplatetarget/getById", params).then(data => {
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
        window.targetList = record;
        this.props.history.push(`/target/editTarget`);
    }
    jump = () => {
        this.props.history.push(`/target/addTarget`);
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
            <Card title="跳转链接管理" bordered={false}>
                <Search
                    placeholder="请输入搜索关键词"
                    enterButton="查询"
                    className="search"
                    onSearch={value => this.searchList(value)}
                />
                <Button type="primary" onClick={this.jump} style={{ float:'right' }}>新建</Button>
                <Table
                    rowKey={item => item.targetId }
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
                width={300}
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