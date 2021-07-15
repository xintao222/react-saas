import React from 'react';
import { Form, Input, Button, Row, Col,  } from 'antd';
import Head from '../components/Head'
import "../styles/index.less";
import SmsCode from '../components/SmsCode'

export default class Register extends React.Component {
    
    formRef = React.createRef();

    state = {
        mobile: ''
    };

    inputChange = e => {
        this.setState({
            mobile: e.target.value
        });
    };

    onFinish = values =>{
        console.log(values);
    };

    componentDidMount() {
        this.formRef.current.setFieldsValue({
            uassName: '',
            password: ''
        });
        //console.log(this.formRef.current.getFieldsValue())
    }

    render() {

        const { mobile } = this.state;
        
        return (
            <div className="index">
                <Head />
                <div className="login-box">
                    <div style={{textAlign:'center',marginBottom:15,fontSize:18}}>
                        账号注册
                    </div>
                    <Form
                        name="form"
                        ref={this.formRef}
                        onFinish={this.onFinish}
                        >
                        <Form.Item
                            name="email"
                        >
                            <Input placeholder="邮箱地址" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                        >
                            <Input.Password 
                                placeholder="设置密码（8-25个字符，含英文大小写和数字）"
                            />
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
                            注册
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )

    }
}