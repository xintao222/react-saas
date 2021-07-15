import React from 'react';
import { Card, Select, Button, message } from 'antd';
import https from "../../api/https";

const { Option } = Select;

export default class AddSaasApp extends React.Component {
    

    state = {
        isDisable: false,
        shopValue: '',
        appValue: [],
        shopList: [
            {
                "userId": "100001",
                "userName": "建行生活",
                "password": "******",
                "email": "jianghang@ccb.com",
                "mobile": "18058687898",
                "status": 1,
                "address": "广州市天河区科韵路建工楼",
                "remainFlow": "1150000",
                "dailyLimit": 100,
                "createTime": "2021-07-14 12:20:30"
            },
            {
                "userId": "100002",
                "userName": "善融商务",
                "password": "******",
                "email": "shanrong@ccb.com",
                "mobile": "18058686789",
                "status": 2,
                "address": "广州市白云区京溪南方医院",
                "remainFlow": "1580000",
                "dailyLimit": 100,
                "createTime": "2021-07-14 12:20:30"
            },
            {
                "userId": "100003",
                "userName": "手机银行",
                "password": "******",
                "email": "shouji@ccb.com",
                "mobile": "18058687898",
                "status": 1,
                "address": "广州市海珠区环汇商业广场",
                "remainFlow": "960000",
                "dailyLimit": 100,
                "createTime": "2021-07-14 12:20:30"
            }
        ],
        appList: [
            {
                "id": "100001",
                "appName": "清华大学",
                "platform": 1,
                "channel": 1,
                "status": 1,
                "createTime": "2021-07-14 12:20:30"
            },
            {
                "id": "100002",
                "appName": "北京大学",
                "platform": 1,
                "channel": 1,
                "status": 1,
                "createTime": "2021-07-15 12:20:30"
            },
            {
                "id": "100003",
                "appName": "中山大学",
                "platform": 1,
                "channel": 1,
                "status": 1,
                "createTime": "2021-07-16 12:20:30"
            }
        ]
    };

    shopChange = (value)=> {
        console.log(value)
        this.setState({
            shopValue: value
        });
    };
    
    appChange = (value)=> {
        this.setState({
            appValue: value
        });
    };

    submit = ()=> {

        let params = {
            ownerId: this.state.shopValue,
            ids: JSON.stringify(this.state.appValue)
        }
        if (!params.ownerId) {
            message.error("请选择商户");
            return false;
        }
        if (!(this.state.appValue && this.state.appValue.length)) {
            message.error("请选择应用");
            return false;
        }
        console.log(params)

        this.setState({ isDisable: true });
        https.fetchPost("/yx/saasapp/add.action", params)
        .then(data => {
            this.setState({ isDisable: false });
            console.log(data)
            if (data.code == 0) {
                message.success("创建成功");
                this.props.history.push(`/saasapp/saasAppList`);
            }
            else message.error("创建失败");
        })
    };

    jump = () => {
        this.props.history.go(-1);
    }

    componentDidMount() {
        
    }

    render() {
        const { shopList, appList, appValue, isDisable } = this.state
        
        return (
            <Card title="商户接入管理" bordered={false}>
                
                <div style={{ marginTop:20,marginBottom:20 }}>
                    <Select 
                        size="large" 
                        placeholder="请选择商户"
                        onChange={this.shopChange} 
                        style={{ minWidth: 150,width: 'auto',marginRight:15 }}
                    >
                        {
                            shopList.map((item,idx) =>{
                                return (
                                    <Option key={item.userId}>{item.userName}</Option>
                                );
                            })
                        }
                    </Select>
                    <Select
                        mode="tags"
                        size="large"
                        value={appValue}
                        placeholder="请选择应用"
                        // maxTagCount={1}
                        onChange={this.appChange} 
                        style={{ minWidth: 200,width: 'auto',marginRight:20 }}
                    >
                        {
                            appList.map((item,idx) =>{
                                return (
                                    <Option key={item.id}>{item.appName}</Option>
                                );
                            })
                        }
                    </Select>
                    <Button type="primary" size="large" disabled={isDisable} onClick={this.submit} >
                        添加
                    </Button>
                </div>
                
                
            </Card>
        )

    }
}