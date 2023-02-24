import { createRouter, createWebHistory } from "vue-router";
import Style from "@/views/StyleView.vue";
import Home from "@/views/HomeView.vue";
import Login from "@/views/LoginView2.vue";
import Signup from "@/views/SignupView.vue"

import Activity from "@/views/ActivityView.vue"
import Analysis from "@/views/AnalysisView.vue"
import profile2 from "@/views/ProfileView2.vue"

import Session from "@/views/SessionView.vue"

import axios from "axios";


const routes = [
  {
    meta:{
      title: "Session",
    },
    path: "/session",
    name: 'SessionView',
    component: Session
  },
  {
    meta:{
      title: "Profile",
    },
    path: "/profile2",
    name: 'profile2',
    component: profile2
  },
  {
    meta:{
      title: "Login",
    },
    path: "/login",
    name: 'LoginView',
    component: Login
  },
  {
    meata:{
      title: "Signup",
    },
    path: "/signup",
    name: "SignupView",
    component: Signup,
  },
  {
    meta:{
      title: "Activity",
    },
    path: "/activity",
    name: 'AcitvityView',
    component: Activity
  },
  {
    meta:{
      title: "Analysis",
    },
    path: "/analysis",
    name: 'AnalysisView',
    component: Analysis
  },
  {
    meta: {
      title: "Select style",
    },
    path: "/",
    name: "style",
    component: Style,
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: "Dashboard",
    },
    path: "/dashboard",
    name: "dashboard",
    component: Home,
  },
  {
    meta: {
      title: "Tables",
    },
    path: "/tables",
    name: "tables",
    component: () => import("@/views/TablesView.vue"),
  },
  {
    meta: {
      title: "Forms",
    },
    path: "/forms",
    name: "forms",
    component: () => import("@/views/FormsView.vue"),
  },
  {
    meta: {
      title: "Profile",
    },
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfileView.vue"),
  },
  {
    meta: {
      title: "Goals",
    },
    path: "/goals",
    name: "goals",
    component: () => import("@/views/GoalsView.vue"),
  },
  {
    meta: {
      title: "Upload",
    },
    path: "/upload",
    name: "upload",
    component: () => import("@/views/UploadView.vue"),
  },
  {
    meta: {
      title: "Upload2",
    },
    path: "/upload2",
    name: "upload2",
    component: () => import("@/views/UploadView2.vue"),
  },
  {
    meta: {
      title: "Ui",
    },
    path: "/ui",
    name: "ui",
    component: () => import("@/views/UiView.vue"),
  },
  {
    meta: {
      title: "Responsive layout",
    },
    path: "/responsive",
    name: "responsive",
    component: () => import("@/views/ResponsiveView.vue"),
  },
  {
    meta: {
      title: "Login",
    },
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    meta: {
      title: "Loading",
    },
    path: "/loading",
    name: "loading",
    component: () => import("@/views/LoadingView.vue"),
  },
  {
    meta: {
      title: "Error",
    },
    path: "/error",
    name: "error",
    component: () => import("@/views/ErrorView.vue"),
  },

];


const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

export default router;
