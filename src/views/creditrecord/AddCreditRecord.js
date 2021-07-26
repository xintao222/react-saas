import React from 'react';
import { Card,Form,Button,Input,Radio,Select,message } from 'antd';
import https from "../../api/https";
import "../../styles/other.css";

const { Option } = Select;

const formItemLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 10 },
};

export default class addCreditRecord extends React.Component {
    
    formRef = React.createRef();

    state = {
        isDisable: false,
        userList: [],
        creditList: []
    };

    jump = () => {
        this.props.history.go(-1);
    }

    onFinish = values =>{
        
        if (!values.userId) {
            message.error("请选择用户");
            return false;
        }
        if (!values.creditId) {
            message.error("请选择套餐");
            return false;
        }
        if (!values.charge) {
            message.error("请输入缴费金额");
            return false;
        }
        
        let params = {
            userId: values.userId,
            creditId: values.creditId,
            charge: values.charge
        }
        console.log(params)

        this.setState({ isDisable: true });
        https.fetchPost("/yx/creditrecord/add.action", params)
        .then(data => {
            this.setState({ isDisable: false });
            console.log(data)
            if (data.code == 0) {
                message.success("创建成功");
                this.props.history.push(`/creditrecord/creditRecordList`);
            }
            else message.error("创建失败");
        })
    }

    getUserList = () => {
        let params = {
            pageNum: 1,
            pageSize: 10
        };
        https.fetchGet("/yx/user/page.action", params).then(data => {
            if (data.code === 0) {
                this.setState({
                    userList: data.data.rows
                });
            }
        })
    }

    getCreditList = () => {
        let params = {
            pageNum: 1,
            pageSize: 10
        };
        https.fetchGet("/yx/saascredit/page.action", params).then(data => {
            if (data.code === 0) {
                this.setState({
                    creditList: data.data.rows
                });
            }
        })
    }

    componentDidMount() {

        this.getUserList();
        this.getCreditList();

        this.formRef.current.setFieldsValue({
            userId: '',
            creditId: '',
            charge: ''
        });
    }

    render() {
        const { userList, creditList, isDisable } = this.state
        
        return (
            <Card title="套餐订购管理" bordered={false}>

                <Form
                    name="form"
                    ref={this.formRef}
                    {...formItemLayout}
                    onFinish={this.onFinish}
                >
                    <Form.Item name="userId" label="&emsp;&emsp;用户">
                        <Select
                            placeholder="请选择用户"
                            style={{ minWidth: 160,width: 'auto',marginRight:20 }}
                        >
                            {
                                userList.map((item,idx) =>{
                                    return (
                                        <Option key={item.userId}>{item.userName}</Option>
                                    );
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="creditId" label="&emsp;&emsp;套餐">
                        <Select
                            placeholder="请选择套餐"
                            style={{ minWidth: 160,width: 'auto',marginRight:20 }}
                        >
                            {
                                creditList.map((item,idx) =>{
                                    return (
                                        <Option key={item.creditId}>{item.comment}</Option>
                                    );
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="缴费金额">
                        <Form.Item name="charge" noStyle>
                            <Input style={{ minWidth: 160}} />
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