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
        
        if (!values.tplId) {
            message.error("请输入模板ID");
            return false;
        }
        if (!values.tplName) {
            message.error("请输入模板名称");
            return false;
        }
        let tempName = 0;
        for (var k = 0; k < values.tplName.length; k++) {
            if(/[\u4e00-\u9fa5]/.test(values.tplName[k])) tempName += 2;
            else tempName++;
        }
        if(tempName>20){
            message.error("模板名称字数不超过10个汉字或20个字母");
            return false;
        }
        if (!values.content) {
            message.error("请输入模板内容");
            return false;
        }
        
        let params = {
            tplId: values.tplId,
            tplName: values.tplName,
            content: values.content,
            isDefault: +values.isDefault,
            ownerAppKey: values.ownerAppKey,
            enable: +values.enable,
            limitNum: values.limitNum
        }
        console.log(params)

        this.setState({ isDisable: true });
        https.fetchPost("/yx/msgtemplate/add.action", params)
        .then(data => {
            this.setState({ isDisable: false });
            console.log(data)
            if (data.code == 0) {
                message.success("创建成功");
                this.props.history.push(`/tpl/tplList`);
            }
            else message.error("创建失败");
        })
    }

    componentDidMount() {

        this.formRef.current.setFieldsValue({
            tplId: '',
            tplName: '',
            content: '',
            isDefault: '1',
            ownerAppKey: '',
            enable: '1',
            limitNum: ''
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
                    <Form.Item name="isDefault" label="是否默认模板">
                        <Radio.Group>
                            <Radio value="1">是</Radio>
                            <Radio value="2">否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="ownerAppKey" label="&emsp;&emsp;所属应用">
                        <Select
                            placeholder="请选择应用"
                            style={{ minWidth: 160,width: 'auto',marginRight:20 }}
                        >
                            <Option key="1">App1</Option>
                            <Option key="2">App2</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="enable" label="&emsp;&emsp;是否可用">
                        <Radio.Group>
                            <Radio value="1">是</Radio>
                            <Radio value="0">否</Radio>
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