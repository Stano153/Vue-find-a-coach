import { createRouter, createWebHistory } from "vue-router";
import CoachesView from './views/coaches/CoachesView.vue';
//import CoachView from './views/coaches/CoachView.vue';
//import RegisterView from './views/coaches/RegisterView.vue';
import RequestsView from './views/requests/RequestsView.vue';
import ContactCoachView from './views/requests/ContactCoachesView.vue'
import NotFoundView from './views/NotFoundView.vue';
import UserAuth from "./views/auth/UserAuth.vue";
import store from "./store/index.js";

const CoachView = () => import('./views/coaches/CoachView.vue');
const RegisterView = () => import('./views/coaches/RegisterView.vue');

const router = createRouter({
    history: createWebHistory(),
    routes:  [
        {
            path: '/',
            redirect: '/coaches'
        },
        {
            path: '/coaches',
            component: CoachesView
        },
        {
            path: '/coaches/:id',
            component: CoachView,
            props: true,
            children: [
                {path: 'contact', component: ContactCoachView}
            ]
        },
        {
            path: '/register',
            component: RegisterView,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/requests',
            component: RequestsView,
            meta: {
                requiresAuth: true
            }
        },
        {
            path:'/auth',
            component: UserAuth,
            meta: {
                requiresUnauth: true
            }
        },
        {
            path: '/:notFound(.*)',
            component: NotFoundView
        }

    ]
});

router.beforeEach(function(to, _, next) {
    if(to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth');
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next('/coaches');
    } else {
        next();
    }
})

export default router;