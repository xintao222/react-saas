import React from 'react';
import { Card, Select, Button, message } from 'antd';
import https from "../../api/https";

const { Option } = Select;

export default class AddSaasApp extends React.Component {
    

    state = {
        isDisable: false,
        shopValue: '',
        appValue: [],
        shopList: [],
        appList: []
    };

    
    getShopList = () => {
        let params = {
            pageNum: 1,
            pageSize: 10
        };
        https.fetchGet("/yx/user/page.action", params).then(data => {
            if (data.code === 0) {
                console.log(data);
                this.setState({
                    shopList: data.data.rows
                });
            }
        })
    }

    getAppList = () => {
        let params = {
            pageNum: 1,
            pageSize: 10
        };
        https.fetchGet("/yx/endpointapp/page.action", params).then(data => {
            if (data.code === 0) {
                console.log(data);
                this.setState({
                    appList: data.data.rows
                });
            }
        })
    }

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
        this.getShopList();
        this.getAppList();
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