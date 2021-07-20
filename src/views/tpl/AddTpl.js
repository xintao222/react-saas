import React from 'react';
import { Card,Form,Button,Input,Radio,Select,message } from 'antd';
import https from "../../api/https";
import "../../styles/other.css";

const { Option } = Select;

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
        https.fetchPost("/yx/endpointapp/add.action", params)
        .then(data => {
            this.setState({ isDisable: false });
            console.log(data)
            if (data.code == 0) {
                message.success("创建成功");
                this.props.history.push(`/app/appList`);
            }
            else message.error("创建失败");
        })
    }

    componentDidMount() {

        this.formRef.current.setFieldsValue({
            id: '',
            appName: '',
            platform: '',
            channel: '',
            status: '1'
        });
    }

    render() {
        const { isDisable } = this.state
        
        return (
            <Card title="模板管理" bordered={false}>

                <Form
                    name="form"
                    ref={this.formRef}
                    {...formItemLayout}
                    onFinish={this.onFinish}
                >
                    <Form.Item label="&emsp;&emsp;&emsp;模板ID">
                        <Form.Item name="tplId" noStyle>
                            <Input />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="&emsp;&emsp;模板名称">
                        <Form.Item name="tplName" noStyle>
                            <Input />
                        </Form.Item>
                        {/* <div className="labelInfo">支持输入数字、字母，最多10个字符</div> */}
                    </Form.Item>
                    <Form.Item label="&emsp;&emsp;模板内容">
                        <Form.Item name="content" noStyle>
                            <Input.TextArea autoSize={{minRows: 4}} />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item name="status" label="是否默认模板">
                        <Radio.Group>
                            <Radio value="1">是</Radio>
                            <Radio value="2">否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="&emsp;&emsp;所属应用">
                        <Select
                            size="large"
                            placeholder="请选择应用"
                            style={{ minWidth: 200,width: 'auto',marginRight:20 }}
                        >
                            <Option key="1">App1</Option>
                            <Option key="2">App2</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="enable" label="&emsp;&emsp;是否可用">
                        <Radio.Group>
                            <Radio value="1">是</Radio>
                            <Radio value="2">否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="每日发送限制">
                        <Form.Item name="limitNum" noStyle>
                            <Input />
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