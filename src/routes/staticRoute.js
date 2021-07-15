import Loadable from 'react-loadable';
import Loading from '../components/Loading'

const EditShop = Loadable({loader: () => import('../views/shop/EditShop'),loading: Loading});
const EditApp = Loadable({loader: () => import('../views/app/EditApp'),loading: Loading});

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
    }
];

