import React from 'react';
import { Card,Table,Space,Button,Input,Switch,Modal,message } from 'antd';
import https from "../../api/https";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Search } = Input;
export default class SensitiveWordList extends React.Component {
    
    state = {
        showEdit: false,
        showDelete: false,
        record: {},
        current:1,
        pageSize:10,
        pageTotal:0,
        list:[],
        selectedRowKeys:[],
        columns:[
            {
                title: 'ID',
                dataIndex: 'id',
            },
            {
                title: '敏感词',
                dataIndex: 'word',
            },
            {
              title: '操作',
              key: 'action',
              render: record => (
                <Space size="middle">
                  <Button type="primary" onClick={(e) => this.onEdit(record,e)} icon={<EditOutlined />} size="size" />
                  <Button type="primary" onClick={(e) => this.onDelete(record,e)} danger icon={<DeleteOutlined />} size="size" />
                </Space>
              ),
            }
        ],
    }

    getList = (index) => {
        let params = {
            pageNum: index,
            pageSize: 10
        };
        https.fetchGet("/yx/sensitivewords/page.action", params).then(data => {
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
        https.fetchGet("/yx/sensitivewords/getById", params).then(data => {
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
    onEdit = (item,e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        let record =  JSON.parse(JSON.stringify(item));
        this.setState({
            showEdit: true,
            record,
        });
    }
    wordChange = e => {
        let editData = this.state.record;
        editData.word = e.target.value;
        this.setState({
            record: editData
        });
    };
    onDelete = (item,e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        let record =  JSON.parse(JSON.stringify(item));
        this.setState({
            showDelete: true,
            record,
        });
    };
    
    editOk = () => {
        let params = {
            id: this.state.record.id,
            word: this.state.record.word
        }
        if (!params.word) {
            message.error("请输入敏感词");
            return false;
        }
        console.log(params);
        https.fetchPost("/yx/sensitivewords/update.action", params).then(data => {
            if (data.code === 0) {
                message.success("更新成功");
                this.getList(1);
            }
            else message.error("更新失败");
        })
        this.setState({
          showEdit: false,
        });
    };

    deleteOk = () => {
        let params = {
            id: this.state.record.id
        }
        console.log(params);
        https.fetchPost("/yx/sensitivewords/delete.action", params).then(data => {
            if (data.code === 0) {
                message.success("更新成功");
                this.getList(1);
            }
            else message.error("更新失败");
        })
        this.setState({
          showEdit: false,
        });
    };
    
    handleCancel = () => {
        this.setState({
            showEdit: false,
            showDelete: false,
        });
    };

    jump = () => {
        this.props.history.push(`/sensitive/addSensitiveWord`);
    }
    goPage = index => {
        this.getList(index);
    }
    componentWillMount() {
        this.getList(1);
    }
    render() {
        const { list,current,pageSize,pageTotal,columns,record,showEdit,showDelete } = this.state
        return (
            <Card title="敏感词管理" bordered={false}>
                <Search
                    placeholder="请输入搜索关键词"
                    enterButton="查询"
                    className="search"
                    onSearch={value => this.searchList(value)}
                />
                <Button type="primary" onClick={this.jump} style={{ float:'right' }}>新建敏感词</Button>
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
                <Modal
                    title="修改敏感词"
                    width={300}
                    okText="确定"
                    cancelText="取消"
                    visible={showEdit}
                    onOk={this.editOk}
                    onCancel={this.handleCancel}
                >
                    <div className="edit-gronp">
                        <div className="edit-label">敏感词</div>
                        <div className="edit-input">
                            <Input 
                                onChange={this.wordChange} 
                                value={record.word}
                                placeholder="请输入内容"
                            />
                        </div>
                    </div>
                </Modal>
                <Modal
                    title="提示"
                    width={300}
                    okText="确定"
                    cancelText="取消"
                    visible={showDelete}
                    onOk={this.deleteOk}
                    onCancel={this.handleCancel}
                >
                <p>是否确认删除？</p>
                </Modal>
            </Card>
        )

    }
}