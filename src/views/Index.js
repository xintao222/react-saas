import React from 'react';
import Head from '../components/Head'
import "../styles/index.less";

export default class Index extends React.Component {
    
    formRef = React.createRef();

    state = {
        
    };


    componentDidMount() {
        
    }

    render() {

        const {  } = this.state;
        
        return (
            <div className="index">
                <Head />
                <div className="title">
                    Developer platform
                </div>
            </div>
        )

    }
}