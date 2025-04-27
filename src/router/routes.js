import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: "/",
        name: "root",
        redirect: "/NavbarComponents/homePage"
    },
    {
        path: "/login",
        name: "login",
        component: () => import('@/views/loginView.vue')
    },
    {
        path: "/NavbarComponents",
        name: "NavbarComponents",
        component: () => import('@/components/layout/NavbarComponents.vue'),
        children: [
            {
                path: "homePage",
                name: "homePage",
                component: () => import('@/views/homeView.vue'),
            },
            {
                path: "userDetails",
                name: "userDetails",
                component: () => import('@/views/userDetailsView.vue')
            },
            {
                path: "WorkList"  ,
                name:"WorkList",
                component: () => import('@/views/WorkListView')
            },
            {
                path: "UserEdit" ,
                name: "UserEdit",
                component: () => import('@/views/UserEditView')
            },
            {
                path:"UploadWork"  ,
                name:"UploadWork",
                component: () => import('@/views/UploadWorkView')
            },
            {
                path: "WorkDetails",
                name: "WorkDetails",
                component: () =>import('@/views/WorkDetailsView')
            },
            {
                path: "AiLayout",
                name: "AiLayout",
                component: () => import('@/components/layout/AiLayout.vue'),
                meta: { isAIModule: true },
                children: [
                    {
                        path: "AiPhotographyView",
                        name: "AiPhotographyView",
                        component: () => import('@/views/AiPhotographyView.vue'),
                        meta: {
                            title: '摄影老炮',
                            icon: 'fas fa-camera-retro'
                        }
                    },
                    {
                        path: "SuperResolutionView",
                        name: "SuperResolutionView",
                        component: () => import('@/views/SuperResolutionView.vue'),
                        meta: {
                            title: '超分辨率',
                            icon: 'fas fa-search-plus'
                        }
                    },
                    {
                        path: "AiBeautyView",
                        name: "AiBeautyView",
                        component: () => import('@/views/AiBeautyView.vue'),
                        meta: {
                            title: 'AI美颜',
                            icon: 'fas fa-magic'
                        }
                    }
                ]
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router