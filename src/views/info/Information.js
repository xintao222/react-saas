import React from 'react';
import { Card,Button } from 'antd';
import https from "../../api/https";
import "../../styles/information.css";
export default class Information extends React.Component {
    
    state = {
        user: {
            
        }
    };
    
    componentWillMount() {
        let params = {};
        https.fetchGet("/userInfo", params)
        .then(data => {
            if (data.code === 200) {
                console.log(data)
                this.setState({
                    user: data.data,
                });
            }
        })
    }
    render() {
        const { user } = this.state
        return (
            <Card title="基本信息" bordered={false}>
                <div className="card-item"> 
                    <label>用户名：</label>
                    <span>{user.username}</span>
                    <span className="btn-developer">设置用户名</span>
                </div>
                <div className="card-item"> 
                    <label>真是姓名：</label>
                    <span>{user.realname}</span>
                </div>
                <div className="card-item"> 
                    <label>公司名称：</label>
                    <span>{user.companyName}</span>
                </div>
                <div className="card-item"> 
                    <label>手机号码：</label>
                    <span>{user.mobile}</span>
                    <span>已认证</span>
                    <span>|</span>
                    <span className="btn-developer">修改</span>
                </div>
                <div className="card-item"> 
                    <label>电子邮箱：</label>
                    <span>未认证</span>
                    <span>|</span>
                    <span className="btn-developer">绑定</span>
                </div>
                <div className="card-item"> 
                    <label>开发者认证：</label>
                    <span>未认证</span>
                    <span>|</span>
                    <span className="btn-developer">立即认证</span>
                </div>
                <div className="card-item"> 
                    <label>开发者密钥：</label>
                    <span>{user.devKey}</span>
                    <span>仅限于 API 调用时使用</span>
                </div>
                <div className="card-item"> 
                    <label>API DevSecret：</label>
                    <span>{user.devSecret}</span>
                    <span>仅限于 API 调用时使用</span>
                    <span className="btn-developer">重置 Dev Secret</span>
                </div>
            </Card>
        )

    }
}