import Loadable from 'react-loadable';
import Loading from '../components/Loading'

const AppList = Loadable({loader: () => import('../views/app/AppList'),loading: Loading});
const AddApp = Loadable({loader: () => import('../views/app/AddApp'),loading: Loading});
const SaasAppList = Loadable({loader: () => import('../views/saasapp/SaasAppList'),loading: Loading});
const AddSaasApp = Loadable({loader: () => import('../views/saasapp/AddSaasApp'),loading: Loading});
const ShopList = Loadable({loader: () => import('../views/shop/ShopList'),loading: Loading});
const AddShop = Loadable({loader: () => import('../views/shop/AddShop'),loading: Loading});
const Information = Loadable({loader: () => import('../views/info/Information'),loading: Loading});
const Setting = Loadable({loader: () => import('../views/info/Setting'),loading: Loading});
const Message = Loadable({loader: () => import('../views/Message'),loading: Loading});
const GroupSend = Loadable({loader: () => import('../views/GroupSend'),loading: Loading});
const SendHistory = Loadable({loader: () => import('../views/SendHistory'),loading: Loading});
const MaterialManager = Loadable({loader: () => import('../views/MaterialManager'),loading: Loading});
const AddImageText = Loadable({loader: () => import('../views/AddImageText'),loading: Loading});
const EditImageText = Loadable({loader: () => import('../views/EditImageText'),loading: Loading});
const UserStatistics = Loadable({loader: () => import('../views/UserStatistics'),loading: Loading});
const MenuStatistics = Loadable({loader: () => import('../views/MenuStatistics'),loading: Loading});
const MessageStatistics = Loadable({loader: () => import('../views/MessageStatistics'),loading: Loading});
const CustomizeMenu = Loadable({loader: () => import('../views/CustomizeMenu'),loading: Loading});
const ServiceList = Loadable({loader: () => import('../views/ServiceList'),loading: Loading});
const EditService = Loadable({loader: () => import('../views/EditService'),loading: Loading});
const CreateAudio = Loadable({loader: () => import('../views/CreateAudio'),loading: Loading});
const CreateVideo = Loadable({loader: () => import('../views/CreateVideo'),loading: Loading});
const Demo = Loadable({loader: () => import('../views/Demo'),loading: Loading});

export default [
    {
        path: '/info',
        name: 'info',
        meta: {  title: '账号管理', icon: 'home', roleId: ['1','2','3'] },
        children: [
            {
                path: "/info/information",
                name: "information",
                component: Information,
                meta: { title: "基本信息" }
            },
            {
                path: "/info/setting",
                name: "setting",
                component: Setting,
                meta: { title: "账号设置" }
            }
        ]
    },
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
                meta: { title: "创建商户" }
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
                meta: { title: "创建商户接入" }
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
                meta: { title: "创建应用" }
            }
        ]
    }
];

