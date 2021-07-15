import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'
import {
    FolderOutlined,
    UserOutlined,
    TeamOutlined,
    MessageOutlined,
    BarChartOutlined,
    PieChartOutlined,
    AreaChartOutlined,
    SlidersOutlined,
    MenuOutlined,
    HeartOutlined,
    AppstoreOutlined,
    AppstoreAddOutlined,
    SoundOutlined,
    CheckOutlined,
} from '@ant-design/icons';

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
                            <SubMenu key={menu.path} icon={<FolderOutlined />} title={menu.meta.title}>
                                {
                                    (menu.children && menu.children.length)?(
                                        <React.Fragment>
                                        {
                                            menu.children.map((item)=>{
                                                return(
                                                    <Menu.Item key={item.path} >
                                                        <Link to={item.path} >{item.meta.title}</Link>
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
                    {/* <SubMenu key="sub1" icon={<FolderOutlined />} title="账号管理">
                        <Menu.Item key="/info/information" icon={<UserOutlined />}>
                            <Link to={'/info/information'} >基本信息</Link>
                        </Menu.Item>
                        <Menu.Item key="/info/setting" icon={<TeamOutlined />}>
                            <Link to={'/info/setting'} >账号设置</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<FolderOutlined />} title="商户管理">
                        <Menu.Item key="/shop/shopList" icon={<AppstoreOutlined />}>
                            <Link to={'/shop/shopList'} >商户列表</Link>
                        </Menu.Item>
                        <Menu.Item key="/shop/addShop" icon={<AppstoreAddOutlined />}>
                            <Link to={'/shop/addShop'} >创建商户</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<FolderOutlined />} title="应用管理">
                        <Menu.Item key="/app/appList" icon={<AppstoreOutlined />}>
                            <Link to={'/app/appList'} >应用列表</Link>
                        </Menu.Item>
                        <Menu.Item key="/app/addApp" icon={<AppstoreAddOutlined />}>
                            <Link to={'/app/addApp'} >创建应用</Link>
                        </Menu.Item>
                    </SubMenu> */}
                </Menu>
            </Sider>
        )

    }
}

export default Aside;