import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, } from 'antd';
import Head from '../components/Head'
import "../styles/index.less";

export default class Login extends React.Component {
    
    formRef = React.createRef();

    state = {
        
    };

    onFinish = values =>{
        console.log(values);
        this.props.history.push(`/shop/shopList`);
    };

    componentDidMount() {
        this.formRef.current.setFieldsValue({
            uassName: '',
            password: ''
        });
        console.log(this.formRef.current.getFieldsValue())
    }

    render() {

        const {  } = this.state;
        
        return (
            <div className="index">
                <Head />
                <div className="login-box">
                    <div style={{textAlign:'center',marginBottom:15,fontSize:18}}>
                        账号登录
                    </div>
                    <Form
                        name="form"
                        ref={this.formRef}
                        onFinish={this.onFinish}
                        >
                        <Form.Item
                            name="uassName"
                        >
                            <Input placeholder="邮箱/账号名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                        >
                            <Input.Password
                            placeholder="请输入密码"
                            />
                        </Form.Item>
                        <Form.Item style={{marginBottom:0}}>
                            <Button type="primary" style={{width:'100%'}} htmlType="submit">
                            登录
                            </Button>
                        </Form.Item>
                            <Link style={{float:'right',marginTop:10}} to="/forgetPassword">
                                忘记密码
                            </Link>
                    </Form>
                    
                </div>
            </div>
        )

    }
}