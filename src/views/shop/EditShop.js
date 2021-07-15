import React from 'react';
import { Card,Form,Button,Input,InputNumber,Radio,message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import https from "../../api/https";
import "../../styles/other.css";

const formItemLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 10 },
};

export default class AddShop extends React.Component {
    
    formRef = React.createRef();

    state = {
        isDisable: false
    };

    jump = () => {
        this.props.history.go(-1);
    }

    onFinish = values =>{
        
        if (!values.userId) {
            message.error("请输入商户ID");
            return false;
        }
        if (!values.userName) {
            message.error("请输入商户名称");
            return false;
        }
        let tempName = 0;
        for (var k = 0; k < values.userName.length; k++) {
            if(/[\u4e00-\u9fa5]/.test(values.userName[k])) tempName += 2;
            else tempName++;
        }
        if(tempName>50){
            message.error("商户名称字数不超过25个汉字或50个字母");
            return false;
        }
        if (!values.password) {
            message.error("请输入密码");
            return false;
        }
        if (!values.email) {
            message.error("请输入邮箱");
            return false;
        }
        if (!values.mobile) {
            message.error("请输入电话");
            return false;
        }
        if (!values.address) {
            message.error("请输入商户地址");
            return false;
        }
        if (!values.dailyLimit) {
            message.error("请输入每日流量限制");
            return false;
        }
        console.log(values)
        
        let params = {
            userId: values.userId,
            userName: values.userName,
            password: values.password,
            email: values.email,
            mobile: values.mobile,
            address: values.address,
            dailyLimit: values.dailyLimit
        }

        this.setState({ isDisable: true });
        https.fetchPost("/yx/user/update.action", params)
        .then(data => {
            this.setState({ isDisable: false });
            console.log(data)
            if (data.code == 0) {
                message.success("更新成功");
                this.props.history.push(`/shop/shopList`);
            }
            else message.error("更新失败");
        })
    }

    componentDidMount() {

        this.formRef.current.setFieldsValue({
            userId: '',
            userName: '',
            password: '',
            email: '',
            mobile: '',
            address: '',
            dailyLimit: '',
        });
        console.log(window.shopList)
        if(window.shopList){
            let data = window.shopList;
            this.formRef.current.setFieldsValue({
                userId: data.userId,
                userName: data.userName,
                password: data.password,
                email: data.email,
                mobile: data.mobile,
                address: data.address,
                dailyLimit: data.dailyLimit,
            });
        }
    }

    render() {
        const { isDisable } = this.state
        
        return (
            <Card title="商户管理" bordered={false}>

                <Form
                    name="form"
                    ref={this.formRef}
                    {...formItemLayout}
                    onFinish={this.onFinish}
                >
                    <Form.Item label="&emsp;&emsp;&emsp;商户ID">
                        <Form.Item name="userId" noStyle>
                            <Input disabled />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="&emsp;&emsp;商户名称">
                        <Form.Item name="userName" noStyle>
                            <Input />
                        </Form.Item>
                        {/* <div className="labelInfo">支持输入数字、字母，最多10个字符</div> */}
                    </Form.Item>
                    <Form.Item label="&emsp;&emsp;&emsp;&emsp;密码">
                        <Form.Item name="password" noStyle>
                            <Input type="password" />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="&emsp;&emsp;&emsp;&emsp;电话">
                        <Form.Item name="mobile" noStyle>
                            <Input maxLength={11} />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="&emsp;&emsp;&emsp;&emsp;邮箱">
                        <Form.Item name="email" noStyle>
                            <Input />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="&emsp;&emsp;商户地址">
                        <Form.Item name="address" noStyle>
                            <Input.TextArea autoSize={{minRows: 3}} />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="每日流量限制">
                        <Form.Item name="dailyLimit" noStyle>
                            <Input disabled />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 12, offset: 9}}>
                        <Button type="primary" disabled={isDisable} htmlType="submit">
                            确定
                        </Button>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                        <Button onClick={this.jump} style={{ marginLeft: 20 }}>返回</Button>
                    </Form.Item>
                </Form>
            </Card>
        )

    }
}