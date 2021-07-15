import React from 'react';
import { Form, Input, Button, Row, Col,  } from 'antd';
import "../styles/forgetPassword.less";

export default class ForgetReset extends React.Component {
    
    formRef = React.createRef();

    state = {
        
    };

    componentDidMount() {
        
    }

    render() {

        const {  } = this.state;
        
        return (
            <div className="forgetPassword">
                <div className="forget-box">
                    <ul>
                        <li>1. 找回密码方式</li>
                        <li>2. 账号验证</li>
                        <li className="active">3. 重设密码</li>
                    </ul>
                    <div className="form-box">
                        <Form
                            name="form"
                            ref={this.formRef}
                            onFinish={this.onFinish}
                            >
                            <Form.Item
                                name="password"
                            >
                                <Input.Password
                                placeholder="请输入密码"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password2"
                            >
                                <Input.Password
                                placeholder="请再次请输入密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" style={{width:'100%'}} htmlType="submit">
                                确认修改
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    
                </div>
            </div>
        )

    }
}