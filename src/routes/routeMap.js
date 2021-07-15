import Loadable from 'react-loadable';
import Loading from '../components/Loading'

const AppList = Loadable({loader: () => import('../views/saas/AppList'),loading: Loading});
const AddApp = Loadable({loader: () => import('../views/saas/AddApp'),loading: Loading});
const ShopList = Loadable({loader: () => import('../views/shop/ShopList'),loading: Loading});
const AddShop = Loadable({loader: () => import('../views/shop/AddShop'),loading: Loading});
const EditShop = Loadable({loader: () => import('../views/shop/EditShop'),loading: Loading});
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
        meta: {  title: '账号管理', roleId: ['1','2','3'] },
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
        meta: {  title: '商户管理', roleId: ['1','2'] },
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
        path: '/saas',
        name: 'saas',
        meta: {  title: '应用管理', roleId: ['1','3'] },
        children: [
            {
                path: "/saas/appList",
                name: "appList",
                component: AppList,
                meta: { title: "应用列表" }
            },
            {
                path: "/saas/addApp",
                name: "addApp",
                component: AddApp,
                meta: { title: "创建应用" }
            }
        ]
    }
    // { role: ["1","3"], path: "/app/appList", component: AppList},
    // { role: ["1","3"], path: "/app/addApp", component: AddApp},
    // { role: ["1","2"], path: "/shop/shopList", component: ShopList},
    // { role: ["1","2"], path: "/shop/addShop", component: AddShop},
    // { role: ["1","2","3"], path: "/info/information", component: Information},
    // { role: ["1","2","3"], path: "/info/setting", component: Setting},
    // { role: [], path: "/message", component: Message},
    // { role: [], path: "/groupSend", component: GroupSend},
    // { role: [], path: "/sendHistory", component: SendHistory},
    // { role: [], path: "/materialManager", component: MaterialManager},
    // { role: [], path: "/addImageText", component: AddImageText},
    // { role: [], path: "/editImageText", component: EditImageText},
    // { role: [], path: "/userStatistics", component: UserStatistics},
    // { role: [], path: "/menuStatistics", component: MenuStatistics},
    // { role: [], path: "/messageStatistics", component: MessageStatistics},
    // { role: [], path: "/customizeMenu", component: CustomizeMenu},
    // { role: [], path: "/serviceList", component: ServiceList},
    // { role: [], path: "/editService", component: EditService},
    // { role: [], path: "/createAudio", component: CreateAudio},
    // { role: [], path: "/createVideo", component: CreateVideo},
    // { role: [], path: "/demo", component: Demo},
];

