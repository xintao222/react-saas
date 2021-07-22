import Loadable from 'react-loadable';
import Loading from '../components/Loading'

const ShopList = Loadable({loader: () => import('../views/shop/ShopList'),loading: Loading});
const AddShop = Loadable({loader: () => import('../views/shop/AddShop'),loading: Loading});
const SaasAppList = Loadable({loader: () => import('../views/saasapp/SaasAppList'),loading: Loading});
const AddSaasApp = Loadable({loader: () => import('../views/saasapp/AddSaasApp'),loading: Loading});
const AppList = Loadable({loader: () => import('../views/app/AppList'),loading: Loading});
const AddApp = Loadable({loader: () => import('../views/app/AddApp'),loading: Loading});
const TplList = Loadable({loader: () => import('../views/tpl/TplList'),loading: Loading});
const AddTpl = Loadable({loader: () => import('../views/tpl/AddTpl'),loading: Loading});
const TargetList = Loadable({loader: () => import('../views/target/TargetList'),loading: Loading});
const AddTarget = Loadable({loader: () => import('../views/target/AddTarget'),loading: Loading});
const Information = Loadable({loader: () => import('../views/info/Information'),loading: Loading});
const Setting = Loadable({loader: () => import('../views/info/Setting'),loading: Loading});

export default [
    // {
    //     path: '/info',
    //     name: 'info',
    //     meta: {  title: '账号管理', icon: 'home', roleId: ['1','2','3'] },
    //     children: [
    //         {
    //             path: "/info/information",
    //             name: "information",
    //             component: Information,
    //             meta: { title: "基本信息" }
    //         },
    //         {
    //             path: "/info/setting",
    //             name: "setting",
    //             component: Setting,
    //             meta: { title: "账号设置" }
    //         }
    //     ]
    // },
    {
        path: '/shop',
        name: 'shop',
        meta: {  title: '商户管理', icon: 'shop', roleId: ['1','2'] },
        children: [
            {
                path: "/shop/shopList",
                name: "shopList",
                component: ShopList,
                meta: { title: "商户列表" }
            },
            {
                path: "/shop/addShop",
                name: "addShop",
                component: AddShop,
                meta: { title: "新建商户" }
            }
        ]
    },
    {
        path: '/saasapp',
        name: 'saasapp',
        meta: {  title: '商户接入管理', icon: 'appstore', roleId: ['1','3'] },
        children: [
            {
                path: "/saasapp/saasAppList",
                name: "saasAppList",
                component: SaasAppList,
                meta: { title: "商户接入列表" }
            },
            {
                path: "/saasapp/addSaasApp",
                name: "addSaasApp",
                component: AddSaasApp,
                meta: { title: "新建商户接入" }
            }
        ]
    },
    {
        path: '/app',
        name: 'app',
        meta: {  title: '应用管理', icon: 'appstore', roleId: ['1','3'] },
        children: [
            {
                path: "/app/appList",
                name: "appList",
                component: AppList,
                meta: { title: "应用列表" }
            },
            {
                path: "/app/addApp",
                name: "addApp",
                component: AddApp,
                meta: { title: "新建应用" }
            }
        ]
    },
    {
        path: '/tpl',
        name: 'tpl',
        meta: {  title: '模板管理', icon: 'appstore', roleId: ['1','3'] },
        children: [
            {
                path: "/tpl/tplList",
                name: "tplList",
                component: TplList,
                meta: { title: "模板列表" }
            },
            {
                path: "/tpl/addTpl",
                name: "addTpl",
                component: AddTpl,
                meta: { title: "新建模板" }
            }
        ]
    },
    {
        path: '/target',
        name: 'target',
        meta: {  title: '跳转链接管理', icon: 'appstore', roleId: ['1','3'] },
        children: [
            {
                path: "/target/targetList",
                name: "targetList",
                component: TargetList,
                meta: { title: "跳转链接列表" }
            },
            {
                path: "/target/addTarget",
                name: "addTarget",
                component: AddTarget,
                meta: { title: "新建跳转链接" }
            }
        ]
    }
];

