import React from 'react';
import { Card, message } from 'antd';
import "../styles/test.less";
import https from "../api/https";
import SmsCode from '../components/SmsCode'

export default class Demo extends React.Component {
    
    state = {
        disabled: false,
        txt:'获取验证码'
    };

    componentWillMount() {
        
    }

    render() {

        const {  } = this.state;
        
        return (
            <Card title="示例" bordered={false}>
                <SmsCode />
            </Card>
        )

    }
}