import React from 'react';
import { Table,Space,Button,Card,message,Upload } from 'antd';
import https from "../api/https";
import { DeleteOutlined } from '@ant-design/icons';

export default class SendHistory extends React.Component {
    
    state = {
        pageSize:10,
        pageTotal:0,
        list:[],
        columns:[
            {
                title: '封面',
                width: 150,
                render: record => (
                  <Space size="middle">
                    <img height={100} width={100} src={record.publicImageTextList[0].pushImageUrl ? record.publicImageTextList[0].pushImageUrl : ''} />
                  </Space>
                ),
            },
            {
                title: '标题',
                width: 280,
                ellipsis: true,
                render: record => (
                    <div>
                        <p style={{fontSize:20,color:'#000',textAlign:'left'}}>{ record.publicImageTextList[0].title }</p>
                        <p style={{textAlign:'left'}}>
                            { record.publicImageTextList[0].summary }
                        </p>
                    </div>
                ),
            },
            {  
                title: '创建时间',
                dataIndex: 'sendtime',
            },
            {
              title: '操作',
              key: 'action',
              render: record => (
                <Space size="middle">
                  <Button type="primary" onClick={(e) => this.onPpmessageDelete(record,e)} danger icon={<DeleteOutlined />} size="size" />
                </Space>
              ),
            },
        ],
    };
    getPpmessageList = (index) => {
        let params = {
            accountId: localStorage.getItem("publicId"),
            materialtype: -1,
            page: index-1,
            pageSize: this.state.pageSize
        };
        https.fetchGet("/ppmessage/getPpmessageForAccountIdByMessageType", params).then(data => {
            if (data.code === 200) {
                let list = [], arr = data.data.list;
                arr.map(item => {
                    if(item.publicImageTextList && item.publicImageTextList.length){
                        if(item.publicImageTextList[0].pushImageUrl) list.push(item)
                    }
                })
                this.setState({
                    list: list,
                    pageTotal:data.data.page.count
                });
            }
        })
    };
    onPpmessageDelete = (record,e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        let params = {
            accountId: localStorage.getItem("publicId"),
            materialid: record.materialid,
            ppmessageid: record.ppmessageid
        };
        console.log(params)
    };
    goPage = index => {
        this.getPpmessageList(index);
    };

    componentWillMount() {
        this.getPpmessageList(1);
    }
    render() {
        const { list,pageSize,pageTotal,columns } = this.state
        return (
            <Card title="已群发消息" bordered={false}>
                
                <Table
                    rowKey={item => item.id }
                    columns={columns}
                    dataSource={list}
                    pagination={{
                        total: pageTotal,
                        pageSize: pageSize,
                        onChange: this.goPage,
                        showSizeChanger:false
                    }}
                />
            </Card>
        )

    }
}