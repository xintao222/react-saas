import React from 'react';
import { message } from 'antd';
import https from "../api/https";
import { validate } from '../utils/validate';

export default class EmailCode extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            txt:'获取验证码'
        };
    }

    resetCode = () => {
        let second = 60, timer = null;
        timer = setInterval(() => {
            second --;
            if (second > 0) {
                this.setState({ txt: '再次获取(' + second + 's)' })
            } else {
                clearInterval(timer);
                this.setState({ 
                    txt: '获取验证码',
                    disabled: false
                 })
            }
        }, 1000)
    }

    getCode = () => {
        let params = {
            email: this.props.email,
        };
        if(!validate.isEmail(params.email)) { 
            message.error('邮箱号输入有误！');
            return;
        }
        console.log(params)
        https.fetchGet("/getEmailCode", params).then(data => {
            if (data.code === 200) {
                message.success(data.mesg);
                this.setState({
                    disabled:true,
                });
                this.resetCode();
            }
        })
    }

    componentWillMount() {
        
    }
    componentDidMount() {
        
    }

    render() {

        const { disabled,txt } = this.state;
        
        return (
            <button 
                className="getCode" 
                type="button" 
                disabled={disabled}
                onClick={this.getCode}
            >{txt}</button>
        )
    }
}