import Loadable from 'react-loadable';
import Loading from '../components/Loading'

const EditShop = Loadable({loader: () => import('../views/shop/EditShop'),loading: Loading});
const EditApp = Loadable({loader: () => import('../views/saas/EditApp'),loading: Loading});

export default [
    {
        path: "/shop/editShop",
        name: "editShop",
        component: EditShop,
        meta: { title: "修改商户" }
    },
    {
        path: "/saas/editApp",
        name: "editApp",
        component: EditApp,
        meta: { title: "修改应用" }
    }
];

