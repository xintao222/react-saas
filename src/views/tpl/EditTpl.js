import React from 'react';
import { Card,Form,Button,Input,message } from 'antd';
import https from "../../api/https";
import "../../styles/other.css";

const formItemLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 10 },
};

export default class AddTpl extends React.Component {
    
    formRef = React.createRef();

    state = {
        isDisable: false
    };

    jump = () => {
        this.props.history.go(-1);
    }

    onFinish = values =>{
        
        if (!values.id) {
            message.error("请输入ID");
            return false;
        }
        if (!values.appName) {
            message.error("请输入App名称");
            return false;
        }
        let tempName = 0;
        for (var k = 0; k < values.appName.length; k++) {
            if(/[\u4e00-\u9fa5]/.test(values.appName[k])) tempName += 2;
            else tempName++;
        }
        if(tempName>50){
            message.error("App名称字数不超过25个汉字或50个字母");
            return false;
        }
        if (!values.platform) {
            message.error("请输入平台");
            return false;
        }
        if (!values.channel) {
            message.error("请输入渠道");
            return false;
        }
        console.log(values)
        
        let params = {
            id: values.id,
            appName: values.appName,
            platform: values.platform,
            email: values.email,
            channel: values.channel,
            status: values.status,
        }

        this.setState({ isDisable: true });
        https.fetchPost("/yx/endpointapp/update.action", params)
        .then(data => {
            this.setState({ isDisable: false });
            console.log(data)
            if (data.code == 0) {
                message.success("更新成功");
                this.props.history.push(`/app/appList`);
            }
            else message.error("更新失败");
        })
    }

    componentDidMount() {

        this.formRef.current.setFieldsValue({
            id: '',
            appName: '',
            platform: '',
            email: '',
            channel: '',
            status: '1'
        });
        console.log(window.appList)
        if(window.appList){
            let data = window.appList;
            this.formRef.current.setFieldsValue({
                id: data.id,
                appName: data.appName,
                platform: data.platform,
                channel: data.channel,
                status: data.status
            });
        }
    }

    render() {
        const { isDisable } = this.state
        
        return (
            <Card title="应用管理" bordered={false}>

                <Form
                    name="form"
                    ref={this.formRef}
                    {...formItemLayout}
                    onFinish={this.onFinish}
                >
                    <Form.Item label="&emsp;&emsp;&emsp;ID">
                        <Form.Item name="id" noStyle>
                            <Input disabled />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="App名称">
                        <Form.Item name="appName" noStyle>
                            <Input />
                        </Form.Item>
                        {/* <div className="labelInfo">支持输入数字、字母，最多10个字符</div> */}
                    </Form.Item>
                    <Form.Item label="&emsp;&emsp;平台">
                        <Form.Item name="platform" noStyle>
                            <Input />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="&emsp;&emsp;渠道">
                        <Form.Item name="channel" noStyle>
                            <Input />
                        </Form.Item>
                    </Form.Item>
                    {/* <Form.Item name="status" label="&emsp;&emsp;状态">
                        <Radio.Group>
                            <Radio value="1">可用</Radio>
                            <Radio value="2">不可用</Radio>
                        </Radio.Group>
                    </Form.Item> */}

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