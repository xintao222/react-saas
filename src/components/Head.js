import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/head.less";

export default class Head extends React.Component{
    
    render() {
        
        return (
            <div className="header">
                <div className="box">
                    <ul className="ul-left">
                        <li>
                            <i className="dev"></i>
                        </li>
                        <li>
                            <Link className="index-btn" to="/info/information">
                                开发者平台
                            </Link>
                        </li>
                    </ul>
                    <ul className="ul-right">
                        <li>
                            <Link className="login-btn" to="/login">
                                登录
                            </Link>
                        </li>
                        <li>
                            <Link className="register-btn" to="/register">
                                注册
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )

    }
}