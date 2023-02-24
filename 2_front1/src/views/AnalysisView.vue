<script setup>
import {
  mdiMonitorCellphone,
  mdiTableBorder,
  mdiTableOff,
  mdiGithub,
  mdiTable,
  mdiCalendarTextOutline,
  mdiReload
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import TableSam from "@/components/TableSam.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import { useMainStore } from "@/stores/main";
import { ref, watch } from "vue";


import SectionFullScreen from "@/components/SectionFullScreen.vue";

import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { main_url, port } from '../config'
const date_range = ref(null);

const loading_c = ref(null);
loading_c.value = false;
function Today() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

let now = Today();
// var oldDate = new Date(now).add(-1).print("yyyy-mm-dd");

function yesterday() {
  var loadDt = new Date();
  var day = new Date(Date.parse(loadDt) - 1 * 1000 * 60 * 60 * 24); //하루전

  return day;
}

console.log(yesterday());
// date_range.value = [yesterday(), now]
date_range.value = ["2022-08-30", "2022-09-01"]

const table_view = ref(null);
table_view.value = false;
const average = ref(null);
const lineData = ref(null);

average.value = { avgWeight: 60, avgLose: 1000, avgConsume: 1000 }

const label_list = ['avgWeight', 'avgKcal', 'avgConsume']


async function test() {
  try {
    var response = await axios.get(main_url + ":" + port + "/api/Period", {
      params: { startDate: date_range.value[0], endDate: date_range.value[1] },
      withCredentials: true,
    });
    console.log("response >> ", response.data);

    for (var i = 0; i < label_list.length; i++) {
      average.value[label_list[i]] = Math.round(response.data[label_list[i]]);
    }
    lineData.value = response.data.lineData;
    table_view.value = true;
    loading_c.value = true;
  } catch (err) {
    console.log("Error >>", err);
  }
}

test()

watch(() => date_range.value[0], (newValue, oldValue) => {
  console.log("왜 안됨?")
  test()
})

watch(() => date_range.value[1], (newValue, oldValue) => {
  console.log("왜 안됨?")
  test()
})



</script>

<template>
  <LayoutAuthenticated @change="change">
    <div v-if="!loading_c">
      <SectionFullScreen v-slot="{ cardClass }" bg="greenBlue">
        <CardBox :class="cardClass">
          <div class="space-y-3">
            <h1 class="text-2xl" style="text-align: center"></h1>
            <LoadingSpinner style="text-align: center" />

            <p style="text-align: center">Loading...</p>
          </div>
        </CardBox>
      </SectionFullScreen>
    </div>
    <div v-if="loading_c">
      <SectionMain>

        <CardBox>
          <SectionTitleLineWithButton :icon="mdiCalendarTextOutline" title="설정 기간 분석">
            <!-- <BaseButton :icon="mdiReload" color="whiteDark" /> -->
          </SectionTitleLineWithButton>
          <div date-rangepicker class="flex items-center overflow-auto">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"></path>
                </svg>
              </div>
              <input name="start" type="date" v-model="date_range[0]"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-400 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date start">
            </div>
            <span class="mx-4 text-gray-500">~</span>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"></path>
                </svg>
              </div>
              <input name="end" type="date" v-model="date_range[1]"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-400 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date end">
            </div>
          </div>
          <br />
          <CardBox class="mb-6" has-table v-if="table_view">
            <TableSam :lineData="lineData" :checkable="false" />
          </CardBox>
        </CardBox>

        <br />
        <CardBox>
          <SectionTitleLineWithButton :icon="mdiCalendarTextOutline" title="설정 기간 통계">
            <!-- <BaseButton :icon="mdiReload" color="whiteDark" /> -->
          </SectionTitleLineWithButton>

          <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
            <CardBoxWidget trend="12%" trend-type="up" color="text-red-500" :icon="mdiFire" :number="average.avgWeight"
              suffix="kg" label="평균 몸무게" />
            <CardBoxWidget trend="12%" trend-type="down" color="text-black-500" :icon="mdiWeightKilogram"
              :number="average.avgKcal" suffix="kcal" label="평균 감량 열량" />
            <CardBoxWidget trend="Overflow" trend-type="alert" color="text-red-500" :icon="mdiFire"
              :number="average.avgConsume" suffix="kcal" label="평균 소비 열량" />
          </div>

        </CardBox>

      </SectionMain>
    </div>
  </LayoutAuthenticated>
</template>

<script>
import axios from 'axios';
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";

export default {
  name: 'LoginView',
  components: {
  },

  beforeMount() {
    var url = main_url + ":" + port + "/api/session";
    axios.get(url, { withCredentials: true })
      .then(function (response) {
        // 성공 핸들링
        console.log(response);
        if (response.data == "") {
          window.location.href = '/login'
        }
      })
      .catch(function (error) {
        // 에러 핸들링
        console.log(error);
      })
      .then(function () {
        // 항상 실행되는 영역
      });

    var url2 = main_url + ":" + port + "/api/profile";
    axios.get(url2, { withCredentials: true })
      .then(function (response) {
        // 성공 핸들링
        console.log(response.data[0]);
        var user_name = response.data[0].user_name;

        useMainStore().setUser({
          name: user_name,
          email: "john@example.com",
          avatar:
            "https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93",
        });

      })
      .catch(function (error) {
        // 에러 핸들링
        console.log(error);
      })
      .then(function () {
        // 항상 실행되는 영역
      });

  },
  data() {
    return {
      avg_weight: 73,
      avg_lose: 2000,
      avg_consume: 3000
    }
  },
  methods: {
    test: function () {
      console.log(1);
    },
    change: function () {
      console.log(1);
      window.location.href = '/login';
    }

  },

}
</script>
