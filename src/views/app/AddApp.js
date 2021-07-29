import React from 'react';
import { Card,Form,Button,Input,Radio,Select,message } from 'antd';
import https from "../../api/https";
import "../../styles/other.css";

const { Option } = Select;

const formItemLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 10 },
};

export default class AddApp extends React.Component {
    
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
        if (values.id.length!=6) {
            message.error("ID必须为sy_xxx或gy_xxx,(xxx为三位数字，不足补0)");
            return false;
        } else{
            let leftStr = values.id.substring(0,3);
            if (leftStr!='sy_' && leftStr!='gy_') {
                message.error("ID必须为sy_xxx或gy_xxx,(xxx为三位数字，不足补0)");
                return false;
            }
            let rightStr = values.id.substring(3,6);
            if (!/^[0-9]*$/.test(rightStr)) {
                message.error("ID必须为sy_xxx或gy_xxx,(xxx为三位数字，不足补0)");
                return false;
            }
        }
        if (!values.appName) {
            message.error("请输入应用名称");
            return false;
        }
        let tempName = 0;
        for (var k = 0; k < values.appName.length; k++) {
            if(/[\u4e00-\u9fa5]/.test(values.appName[k])) tempName += 2;
            else tempName++;
        }
        if(tempName>50){
            message.error("应用名称字数不超过25个汉字或50个字母");
            return false;
        }
        if (!values.platform) {
            message.error("请选择平台");
            return false;
        }
        if (!values.channel) {
            message.error("请输入渠道");
            return false;
        }
        if (!/^[1-9]\d{0,1}$/.test(values.channel)) {
            message.error("渠道必须为小于100的正整数");
            return false;
        }
        let params = {
            id: values.id,
            appName: values.appName,
            platform: +values.platform,
            channel: +values.channel,
            status: +values.status,
        }
        console.log(params)

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
            platform: undefined,
            channel: null,
            status: '1'
        });
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
                            <Input autoComplete={'off'} maxLength={6} placeholder="请输入ID" />
                        </Form.Item>
                        <div className="labelInfo">ID自定义规则: sy_xxx,gy_xxx,(xxx为三位数字，不足补0)</div>
                    </Form.Item>
                    <Form.Item label="应用名称">
                        <Form.Item name="appName" noStyle>
                            <Input autoComplete={'off'} placeholder="请输入应用名称" />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item name="platform" label="&emsp;&emsp;平台">
                        <Select
                            placeholder="请选择平台"
                        >
                            <Option key="1">私有云</Option>
                            <Option key="2">公有云</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="&emsp;&emsp;渠道">
                        <Form.Item name="channel" noStyle>
                            <Input autoComplete={'off'} maxLength={2} placeholder="请输入渠道" />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item name="status" label="&emsp;&emsp;状态">
                        <Radio.Group>
                            <Radio value="1">可用</Radio>
                            <Radio value="2">不可用</Radio>
                        </Radio.Group>
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