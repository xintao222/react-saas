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
        isDisable: false,
        appList: []
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
            ownerAppKey: values.ownerAppKey?(+values.ownerAppKey):'',
            enable: +values.enable,
            limitNum: values.limitNum
        }
        console.log(params)

        this.setState({ isDisable: true });
        https.fetchPost("/yx/msgtemplate/update.action", params)
        .then(data => {
            this.setState({ isDisable: false });
            console.log(data)
            if (data.code == 0) {
                message.success("更新成功");
                this.props.history.push(`/tpl/tplList`);
            }
            else message.error("更新失败");
        })
    }

    getAppList = () => {
        let params = {
            pageNum: 1,
            pageSize: 10
        };
        https.fetchGet("/yx/endpointapp/page.action", params).then(data => {
            if (data.code === 0) {
                this.setState({
                    appList: data.data.rows
                });
            }
        })
    }

    componentDidMount() {

        this.getAppList();

        this.formRef.current.setFieldsValue({
            tplId: '',
            tplName: '',
            content: '',
            isDefault: '1',
            ownerAppKey: undefined,
            enable: '1',
            limitNum: ''
        });
        console.log(window.tplList)
        if(window.tplList){
            let data = window.tplList;
            this.formRef.current.setFieldsValue({
                tplId: data.tplId,
                tplName: data.tplName,
                content: data.content,
                isDefault: data.isDefault? (data.isDefault+'') : '1',
                ownerAppKey: data.ownerAppKey? (data.ownerAppKey+'') : undefined,
                enable: data.enable? (data.enable+'') : '1',
                limitNum: data.limitNum
            });
        }
    }

    render() {
        const { appList, isDisable } = this.state
        
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
                            <Input disabled />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="&emsp;&emsp;模板名称">
                        <Form.Item name="tplName" noStyle>
                            <Input autoComplete={'off'} placeholder="请输入模板名称"/>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="&emsp;&emsp;模板内容">
                        <Form.Item name="content" noStyle>
                            <Input.TextArea autoComplete={'off'} placeholder="请输入模板内容" autoSize={{minRows: 4}} />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item name="isDefault" label="&emsp;&emsp;默认模板">
                        <Radio.Group>
                            <Radio value="1">是</Radio>
                            <Radio value="2">否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="ownerAppKey" label="&emsp;&emsp;所属应用">
                        <Select
                            placeholder="请选择应用"
                        >
                            {
                                appList.map((item,idx) =>{
                                    return (
                                        <Option key={item.id}>{item.appName}</Option>
                                    );
                                })
                            }
                        </Select>
                    </Form.Item>
                    {/* <Form.Item name="enable" label="&emsp;&emsp;&emsp;&emsp;状态">
                        <Radio.Group>
                            <Radio value="1">可用</Radio>
                            <Radio value="0">不可用</Radio>
                        </Radio.Group>
                    </Form.Item> */}
                    <Form.Item label="每日发送限制">
                        <Form.Item name="limitNum" noStyle>
                            <Input autoComplete={'off'} placeholder="请输入每日发送限制" />
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