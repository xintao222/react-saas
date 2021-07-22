import React from 'react';
import { Card,Form,Button,Input,Radio,Select,message } from 'antd';
import https from "../../api/https";
import "../../styles/other.css";

const { Option } = Select;

const formItemLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 10 },
};

export default class AddTarget extends React.Component {
    
    formRef = React.createRef();

    state = {
        isDisable: false
    };

    jump = () => {
        this.props.history.go(-1);
    }

    onFinish = values =>{
        
        if (!values.targetId) {
            message.error("请输入链接ID");
            return false;
        }
        if (!values.jumptype) {
            message.error("请选择跳转类型");
            return false;
        }
        if (!values.target) {
            message.error("请输入目标链接");
            return false;
        }
        if (!values.btnnm) {
            message.error("请输入按钮文本");
            return false;
        }
        
        let params = {
            targetId: values.targetId,
            jumptype: +values.jumptype,
            target: values.target,
            btnnm: values.btnnm,
            status: +values.status
        }
        console.log(params)

        this.setState({ isDisable: true });
        https.fetchPost("/yx/msgtemplatetarget/add.action", params)
        .then(data => {
            this.setState({ isDisable: false });
            console.log(data)
            if (data.code == 0) {
                message.success("创建成功");
                this.props.history.push(`/target/targetList`);
            }
            else message.error("创建失败");
        })
    }

    componentDidMount() {

        this.formRef.current.setFieldsValue({
            targetId: '',
            jumptype: '',
            target: '',
            btnnm: '',
            status: '1'
        });
    }

    render() {
        const { isDisable } = this.state
        
        return (
            <Card title="跳转链接管理" bordered={false}>

                <Form
                    name="form"
                    ref={this.formRef}
                    {...formItemLayout}
                    onFinish={this.onFinish}
                >
                    <Form.Item label="&emsp;链接ID">
                        <Form.Item name="targetId" noStyle>
                            <Input />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item name="jumptype" label="跳转类型">
                        <Select
                            placeholder="请选择"
                            style={{ minWidth: 160,width: 'auto',marginRight:20 }}
                        >
                            <Option key="1">url</Option>
                            <Option key="2">功能页</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="目标链接">
                        <Form.Item name="target" noStyle>
                            <Input />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="按钮文本">
                        <Form.Item name="btnnm" noStyle>
                            <Input />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item name="status" label="&emsp;&emsp;状态">
                        <Radio.Group>
                            <Radio value="1">可用</Radio>
                            <Radio value="0">不可用</Radio>
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