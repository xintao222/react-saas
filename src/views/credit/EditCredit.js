import React from 'react';
import { Card,Form,Button,Input,Radio,message } from 'antd';
import https from "../../api/https";
import "../../styles/other.css";

const formItemLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 10 },
};

export default class AddCredit extends React.Component {
    
    formRef = React.createRef();

    state = {
        isDisable: false,
        creditType: false
    };

    jump = () => {
        this.props.history.go(-1);
    }

    onFinish = values =>{
        
        if (!values.creditId) {
            message.error("请输入规则ID");
            return false;
        }
        if (!values.comment) {
            message.error("请输入规则说明");
            return false;
        }
        if (!values.creditCharge) {
            message.error("请输入套餐资费");
            return false;
        }
        if (values.type=='1') {
            if (!values.totalAmount) {
                message.error("请输入套餐消息量");
                return false;
            }
        }else{
            if (!values.validDays) {
                message.error("请输入有效期");
                return false;
            }
        }
        
        let params = {
            creditId: values.creditId,
            comment: values.comment,
            creditCharge: (+values.creditCharge)*100,
            totalAmount: values.totalAmount,
            validDays: values.validDays
        }
        console.log(params)

        this.setState({ isDisable: true });
        https.fetchPost("/yx/saascredit/update.action", params)
        .then(data => {
            this.setState({ isDisable: false });
            console.log(data)
            if (data.code == 0) {
                message.success("更新成功");
                this.props.history.push(`/credit/creditList`);
            }
            else message.error("更新失败");
        })
    }

    componentDidMount() {

        this.formRef.current.setFieldsValue({
            creditId: '',
            comment: '',
            type: '1',
            creditCharge: '',
            totalAmount: 0,
            validDays: 0
        });
        console.log(window.creditList)
        if(window.creditList){
            let data = window.creditList;
            this.formRef.current.setFieldsValue({
                creditId: data.creditId,
                comment: data.comment,
                type: data.totalAmount? '1' : '2',
                creditCharge: (+data.creditCharge)/100,
                totalAmount: (!data.totalAmount || data.totalAmount==0)? 0 : data.totalAmount,
                validDays: (!data.validDays || data.validDays==0)? 0 : data.validDays,
            });
        }
    }

    render() {
        const { isDisable } = this.state
        
        return (
            <Card title="套餐管理" bordered={false}>

                <Form
                    name="form"
                    ref={this.formRef}
                    {...formItemLayout}
                    onFinish={this.onFinish}
                >
                    <Form.Item label="&emsp;&emsp;规则ID">
                        <Form.Item name="creditId" noStyle>
                            <Input disabled />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="&emsp;规则说明">
                        <Form.Item name="comment" noStyle>
                            <Input.TextArea autoSize={{minRows: 4}} />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item name="type" label="&emsp;套餐分类">
                        <Radio.Group disabled
                            onChange={this.typeChange}
                        >
                            <Radio value="1">消息量</Radio>
                            <Radio value="2">有效期</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="&emsp;套餐资费">
                        <Form.Item name="creditCharge" noStyle>
                            <Input  suffix="元" />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="套餐消息量">
                        <Form.Item name="totalAmount" noStyle>
                            <Input disabled suffix="条" />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="&emsp;&emsp;有效期">
                        <Form.Item name="validDays" noStyle>
                            <Input disabled suffix="天" />
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