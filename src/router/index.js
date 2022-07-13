import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Settings from "@/views/Settings.vue";
import ThreatAssessment from "@/views/ThreatAssessment.vue";
import ThreatAssessmentRequests from "@/views/ThreatAssessmentRequests.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings
  },
  {
    path: "/tars",
    name: "tars",
    component: ThreatAssessmentRequests
  },
  {
    path: "/tar/:id",
    name: "tar-edit-view",
    component: ThreatAssessment,
    props: true
  },
  {
    path: "/tar",
    name: "tar",
    component: ThreatAssessment
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
