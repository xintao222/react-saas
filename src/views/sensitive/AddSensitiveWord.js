import React from 'react';
import { Card, Form, Button, Input, message } from 'antd';
import https from "../../api/https";

export default class AddSensitiveWord extends React.Component {
    

    state = {
        isDisable: false,
        word: ''
    };

    wordChange = e => {
        this.setState({
            word: e.target.value
        });
    };

    submit = ()=> {

        let params = {
            word: this.state.word,
        }
        if (!params.word) {
            message.error("请输入敏感词");
            return false;
        }
        console.log(params)

        this.setState({ isDisable: true });
        https.fetchPost("/yx/sensitivewords/add.action", params)
        .then(data => {
            this.setState({ isDisable: false });
            console.log(data)
            if (data.code == 0) {
                message.success("添加成功");
                this.props.history.push(`/sensitive/sensitiveWordList`);
            }
            else message.error("添加失败");
        })
    };

    jump = () => {
        this.props.history.go(-1);
    }

    componentDidMount() {
        
    }

    render() {
        const { word, isDisable } = this.state
        
        return (
            <Card title="敏感词管理" bordered={false}>
                
                <div style={{ marginTop:20,marginBottom:20 }}>
                    <label style={{fontSize: '16px',marginRight:10}}>敏感词</label>
                    <Input onChange={this.wordChange} style={{width:200,marginRight:15}} />
                    <Button type="primary" disabled={isDisable} onClick={this.submit} >
                        添加
                    </Button>
                </div>
            </Card>
        )

    }
}