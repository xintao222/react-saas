import React from 'react';
import { Form, Input, Button, Row, Col,  } from 'antd';
import "../styles/forgetPassword.less";
import SmsCode from '../components/SmsCode'

export default class ForgetMobile extends React.Component {
    
    formRef = React.createRef();

    state = {
        mobile: ''
    };

    inputChange = e => {
        this.setState({
            mobile: e.target.value
        });
    };

    onNext = () => {
        this.props.history.push(`/forgetReset`);
    }

    componentDidMount() {
        
    }

    render() {

        const { mobile } = this.state;
        
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
                                <Input placeholder="请输入用户名或邮箱" />
                            </Form.Item>
                            <Form.Item
                                name="mobile"
                            >
                                <Input
                                type="tel" 
                                onChange={this.inputChange}
                                placeholder="手机号码" />
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
                                        placeholder="手机验证码" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <SmsCode  mobile={mobile} />
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