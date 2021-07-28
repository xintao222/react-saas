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
const CreditList = Loadable({loader: () => import('../views/credit/CreditList'),loading: Loading});
const AddCredit = Loadable({loader: () => import('../views/credit/AddCredit'),loading: Loading});
const CreditRecordList = Loadable({loader: () => import('../views/creditrecord/CreditRecordList'),loading: Loading});
const AddCreditRecord = Loadable({loader: () => import('../views/creditrecord/AddCreditRecord'),loading: Loading});
const SensitiveWordList = Loadable({loader: () => import('../views/sensitive/SensitiveWordList'),loading: Loading});
const AddSensitiveWord = Loadable({loader: () => import('../views/sensitive/AddSensitiveWord'),loading: Loading});

const EditShop = Loadable({loader: () => import('../views/shop/EditShop'),loading: Loading});
const EditApp = Loadable({loader: () => import('../views/app/EditApp'),loading: Loading});
const EditTpl = Loadable({loader: () => import('../views/tpl/EditTpl'),loading: Loading});
const EditTarget = Loadable({loader: () => import('../views/target/EditTarget'),loading: Loading});
const EditCredit = Loadable({loader: () => import('../views/credit/EditCredit'),loading: Loading});



export const StaticRouterMap = [
    {
        path: "/shop/editShop",
        name: "editShop",
        component: EditShop,
        meta: { title: "修改商户" }
    },
    {
        path: "/app/editApp",
        name: "editApp",
        component: EditApp,
        meta: { title: "修改应用" }
    },
    {
        path: "/tpl/editTpl",
        name: "editTpl",
        component: EditTpl,
        meta: { title: "修改模板" }
    },
    {
        path: "/target/editTarget",
        name: "editTarget",
        component: EditTarget,
        meta: { title: "修改跳转链接" }
    },
    {
        path: "/credit/editCredit",
        name: "editCredit",
        component: EditCredit,
        meta: { title: "修改套餐" }
    }
]

export const AsyncRouterMap =  [
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
    },
    {
        path: '/credit',
        name: 'credit',
        meta: {  title: '套餐管理', icon: 'appstore', roleId: ['1','3'] },
        children: [
            {
                path: "/credit/creditList",
                name: "creditList",
                component: CreditList,
                meta: { title: "套餐列表" }
            },
            {
                path: "/credit/addCredit",
                name: "addCredit",
                component: AddCredit,
                meta: { title: "新建套餐" }
            }
        ]
    },
    {
        path: '/creditrecord',
        name: 'creditrecord',
        meta: {  title: '套餐订购管理', icon: 'appstore', roleId: ['1','3'] },
        children: [
            {
                path: "/creditrecord/creditRecordList",
                name: "creditRecordList",
                component: CreditRecordList,
                meta: { title: "套餐订购列表" }
            },
            {
                path: "/creditrecord/addCreditRecord",
                name: "addCreditRecord",
                component: AddCreditRecord,
                meta: { title: "新建套餐订购" }
            }
        ]
    },
    {
        path: '/sensitive',
        name: 'sensitive',
        meta: {  title: '敏感词管理', icon: 'appstore', roleId: ['1','3'] },
        children: [
            {
                path: "/sensitive/sensitiveWordList",
                name: "sensitiveWordList",
                component: SensitiveWordList,
                meta: { title: "敏感词列表" }
            },
            {
                path: "/sensitive/addSensitiveWord",
                name: "addSensitiveWord",
                component: AddSensitiveWord,
                meta: { title: "新建敏感词" }
            }
        ]
    }
];

