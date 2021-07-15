import React from 'react';
import "../styles/forgetPassword.css";

export default class ForgetType extends React.Component {
    

    state = {
        
    };

    jump = type => {
        if(type == 'mobile') this.props.history.push(`/forgetMobile`);
        if(type == 'email') this.props.history.push(`/forgetEmail`);
    }

    componentDidMount() {
        
    }

    render() {

        const {  } = this.state;
        
        return (
            <div className="forgetPassword">
                {/* <Head /> */}
                <div className="forget-box">
                    <ul>
                        <li className="active">1. 找回密码方式</li>
                        <li>2. 账号验证</li>
                        <li>3. 重设密码</li>
                    </ul>
                    <div className="form-type">
                        <div className="item" onClick={this.jump('mobile')}>
                            <div  className="icon mobile"></div>
                            <p>手机找回</p>
                        </div>
                        <div className="item" onClick={this.jump('email')}>
                            <div  className="icon email"></div>
                            <p>邮箱找回</p>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}