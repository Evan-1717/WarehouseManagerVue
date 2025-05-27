
import VueRouter from 'vue-router';

const routes = [
    {
        path:'/',
        name:'login',
        component:()=>import('../components/Login')
    },
    {
        path:'/Index',
        name:'index',
        component:()=>import('../components/Index'),
        children:[
            {
                path:'/Home',
                name:'home',
                meta:{
                    title:'首页'
                },
                component:()=>import('../components/Home')
            },
            {
                path:'/Admin',
                name:'admin',
                meta:{
                    title:'管理员管理'
                },
                component:()=>import('../components/admin/AdminManage')
            },
            {
                path:'/User',
                name:'user',
                meta:{
                    title:'用户管理'
                },
                component:()=>import('../components/user/UserManage.vue')
            },
            {
                path:'/JlPromotion',
                name:'jlPromotion',
                meta:{
                    title:'巨量投放广告'
                },
                component:()=>import('../components/jlPromotion/JlPromotionManage.vue')
            },
            {
                path:'/Shouzhi',
                name:'shouzhi',
                meta:{
                    title:'短剧投放统计'
                },
                component:()=>import('../components/shouzhi/ShouzhiManage.vue')
            },
            {
                path:'/Novel',
                name:'novel',
                meta:{
                    title:'小说投放统计'
                },
                component:()=>import('../components/novel/NovelManage.vue')
            },
            {
                path:'/Tencent',
                name:'tencent',
                meta:{
                    title:'腾讯投放统计'
                },
                component:()=>import('../components/tencent/TencentManage.vue')
            },
            {
                path:'/Advertiser',
                name:'advertiser',
                meta:{
                    title:'推广链管理'
                },
                component:()=>import('../components/advertiser/AdvertiserManage.vue')
            },
        ]
    }
]

const router = new VueRouter({
    mode:'history',
    routes
})

export function resetRouter() {
    router.matcher = new VueRouter({
        mode:'history',
        routes: []
    }).matcher
}
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
export  default router;
