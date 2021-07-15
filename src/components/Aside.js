import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'
import { Icon } from '@ant-design/compatible';

const { SubMenu } = Menu;
const { Sider } = Layout;

class Aside extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            defaultOpenKeys: [/\/(\w+)/.exec(this.props.pathname)[0]]
        };
    }
    
    componentWillMount() {

    }

    render() {

        const { defaultOpenKeys } = this.state;

        return (
            <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
                <div className="logo">
                    {
                        !this.props.collapsed?('yx-saas'):''
                    }
                </div>
                <Menu 
                    theme="dark" 
                    mode="inline"
                    defaultOpenKeys={defaultOpenKeys}
                    selectedKeys={[this.props.pathname]}
                >
                    { this.props.menuList.map((menu) => {
                        return (
                            <SubMenu key={menu.path} title={
                                    <span>
                                        { menu.meta.icon ? <Icon type={menu.meta.icon} /> : null}
                                        <span>{menu.meta.title}</span>
                                    </span>
                                }
                            >

                                {
                                    (menu.children && menu.children.length)?(
                                        <React.Fragment>
                                        {
                                            menu.children.map((item)=>{
                                                return(
                                                    <Menu.Item key={item.path} >
                                                        <Link to={item.path} >{
                                                            <span>
                                                                { item.meta.icon ? <Icon type={item.meta.icon} /> : null}
                                                                <span>{item.meta.title}</span>
                                                            </span>
                                                        }</Link>
                                                    </Menu.Item>
                                                )
                                            })
                                        }
                                        </React.Fragment>
                                    ):''
                                }
                            </SubMenu>
                        );
                    })}
                </Menu>
            </Sider>
        )

    }
}

export default Aside;