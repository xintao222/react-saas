import React from 'react';
import { Card,Form,Button,Input,Select } from 'antd';
import https from "../../api/https";
import "../../styles/other.css";

const { Option } = Select;

const formItemLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 10 },
};

export default class historyDetail extends React.Component {
    
    formRef = React.createRef();

    state = {
        userList: []
    };

    jump = () => {
        this.props.history.go(-1);
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


    componentDidMount() {

        this.getUserList();

        this.formRef.current.setFieldsValue({
            id: '',
            userId: '',
            url: '',
            param: '',
            createTime: ''
        });

        if(window.historyList){
            let data = window.historyList;
            this.formRef.current.setFieldsValue({
                id: data.id,
                userId: data.userId,
                url: data.url,
                param: data.param,
                createTime: data.createTime
            });
        }

    }

    render() {
        const { userList } = this.state
        
        return (
            <Card title="发送历史管理" bordered={false}>

                <Form
                    name="form"
                    ref={this.formRef}
                    {...formItemLayout}
                    onFinish={this.onFinish}
                >
                    <Form.Item label="&emsp;&emsp;&emsp;ID">
                        <Form.Item name="id" noStyle>
                            <Input readOnly="readOnly"/>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item name="userId" label="商户名称">
                        <Select disabled
                            placeholder="请选择商户"
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
                    <Form.Item label="调用接口">
                        <Form.Item name="url" noStyle>
                            <Input readOnly="readOnly"/>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="&emsp;&emsp;参数">
                        <Form.Item name="param" noStyle>
                            <Input.TextArea readOnly="readOnly" autoSize={{minRows: 4}} />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="调用时间">
                        <Form.Item name="createTime" noStyle>
                            <Input readOnly="readOnly" />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 12, offset: 9}}>
                        <Button onClick={this.jump} style={{ marginLeft: 20 }}>返回</Button>
                    </Form.Item>
                </Form>
            </Card>
        )

    }
}