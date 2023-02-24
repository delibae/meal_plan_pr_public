<script setup>
import { mdiForwardburger, mdiBackburger, mdiMenu } from "@mdi/js";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import menuAside from "@/menuAside.js";
import menuNavBar from "@/menuNavBar.js";
import { useMainStore } from "@/stores/main.js";
import { useStyleStore } from "@/stores/style.js";
import BaseIcon from "@/components/BaseIcon.vue";
import FormControl from "@/components/FormControl.vue";
import NavBar from "@/components/NavBar.vue";
import NavBarItemPlain from "@/components/NavBarItemPlain.vue";
import AsideMenu from "@/components/AsideMenu.vue";
import FooterBar from "@/components/FooterBar.vue";
import axios from "axios";

import { main_url, port } from '../config'






useMainStore().setUser({
  name: '',
  email: "john@example.com",
  avatar:
    "https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93",
});




const layoutAsidePadding = "xl:pl-60";

const styleStore = useStyleStore();

const router = useRouter();

const isAsideMobileExpanded = ref(false);
const isAsideLgActive = ref(false);

router.beforeEach(() => {
  isAsideMobileExpanded.value = false;
  isAsideLgActive.value = false;
});
const self = this;

const emit = defineEmits([
  'change'
]);




const menuClick = async (event, item) => {
  if (item.isToggleLightDark) {
    styleStore.setDarkMode();
  }

  if (item.isLogout) {
    console.log(1);
    axios.get(main_url + ":" + port + "/api/logout", { withCredentials: true })
      .then((response) => {
        console.log("r1", response);
        // check session
        var url = main_url + ":" + port + '/api/session';
        axios.get(url, { withCredentials: true })
          .then(function (response) {
            // 성공 핸들링
            console.log("r2", response.data)
            if (response.data == "") {
              emit("change")
            }
          })
          .catch(function (error) {
            // 에러 핸들링
            console.log(error);
          })
          .then(function () {
            // 항상 실행되는 영역
          });

      })
      .catch((error) => {
        console.log(error);
      })

  }
};
</script>

<template>
  <div :class="{
    dark: styleStore.darkMode,
    'overflow-hidden lg:overflow-visible': isAsideMobileExpanded,
  }">
    <div :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
      class="pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100">
      <NavBar :menu="menuNavBar" :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
        @menu-click="menuClick">
        <NavBarItemPlain display="flex lg:hidden" @click.prevent="isAsideMobileExpanded = !isAsideMobileExpanded">
          <BaseIcon :path="isAsideMobileExpanded ? mdiBackburger : mdiForwardburger" size="24" />
        </NavBarItemPlain>
        <NavBarItemPlain display="hidden lg:flex xl:hidden" @click.prevent="isAsideLgActive = true">
          <BaseIcon :path="mdiMenu" size="24" />
        </NavBarItemPlain>
        <NavBarItemPlain use-margin>
          <div class="my-2">
            <a href="/dashboard"><img src='../assets/img/team_logo.png' style="height:50px; margin:5px 0 0 20px"></a>
          </div>
        </NavBarItemPlain>
      </NavBar>
      <AsideMenu :is-aside-mobile-expanded="isAsideMobileExpanded" :is-aside-lg-active="isAsideLgActive" :menu="menuAside"
        @menu-click="menuClick" @aside-lg-close-click="isAsideLgActive = false" />

      <slot />

      <!--<FooterBar>
              Get more with
              <a href="https://tailwind-vue.justboil.me/" target="_blank" class="text-blue-600">Premium version</a>
            </FooterBar>-->

    </div>
  </div>
</template>

<script>

import { useMainStore } from "@/stores/main.js";
export default {
  name: 'LoginView',
  components: {
  },

  data() {
    return {
      profile: []
    }
  },

  onMounted() {


  },
  methods: {
    test: function () {
      console.log(1);
    },

    menuClick: function (event, item) {
      if (item.isToggleLightDark) {
        styleStore.setDarkMode();
      }

      if (item.isLogout) {

        var url = main_url + ":" + port + '/api/logout';
        axios.get(url, { withCredentials: true })
          .then(function (response) {
            // 성공 핸들링
            this.is_logout = true
            this.$emit("change", this.is_logout);

          })
          .catch(function (error) {
            // 에러 핸들링
            console.log(error);
          })
          .then(function () {
            console.log("왜 안됨?")
            // 항상 실행되는 영역
          });

      }

    }

  }
}
</script>

