import Loadable from 'react-loadable';
import Loading from '../components/Loading'

const EditShop = Loadable({loader: () => import('../views/shop/EditShop'),loading: Loading});
const EditApp = Loadable({loader: () => import('../views/app/EditApp'),loading: Loading});
const EditTpl = Loadable({loader: () => import('../views/tpl/EditTpl'),loading: Loading});
const EditTarget = Loadable({loader: () => import('../views/target/EditTarget'),loading: Loading});

export default [
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
    }
];

