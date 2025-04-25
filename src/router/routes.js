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
        component: () => import('@/views/loginPage.vue')
    },
    {
        path: "/NavbarComponents",
        name: "NavbarComponents",
        component: () => import('@/components/layout/NavbarComponents.vue'),
        children: [
            {
                path: "homePage",
                name: "homePage",
                component: () => import('@/views/homePage.vue'),
            },
            {
                path: "userDetails",
                name: "userDetails",
                component: () => import('@/views/userDetailsPage.vue')
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