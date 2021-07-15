import React from 'react';
import { Form, Input, Button, Row, Col,  } from 'antd';
import "../styles/forgetPassword.less";
import EmailCode from '../components/EmailCode'

export default class ForgetEmail extends React.Component {
    
    formRef = React.createRef();

    state = {
        email: ''
    };

    inputChange = e => {
        this.setState({
            email: e.target.value
        });
    };

    onNext = () => {
        this.props.history.push(`/forgetReset`);
    }

    componentDidMount() {
        
    }

    render() {

        const { email } = this.state;
        
        return (
            <div className="forgetPassword">
                <div className="forget-box">
                    <ul>
                        <li>1. 找回密码方式</li>
                        <li className="active">2. 账号验证</li>
                        <li>3. 重设密码</li>
                    </ul>
                    <div className="form-box">
                        <Form
                            name="form"
                            ref={this.formRef}
                            onFinish={this.onNext}
                            >
                            <Form.Item
                                name="email"
                            >
                                <Input 
                                onChange={this.inputChange}
                                placeholder="请输入注册邮箱地址" />
                            </Form.Item>
                            <Form.Item >
                                <Row gutter={22}>
                                    <Col span={15}>
                                        <Form.Item
                                        name="code"
                                        >
                                        <Input 
                                        type="tel"
                                        maxLength={6}
                                        placeholder="邮箱验证码" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <EmailCode  email={email} />
                                    </Col>
                                </Row>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" style={{width:'100%'}} htmlType="submit">
                                下一步
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )

    }
}