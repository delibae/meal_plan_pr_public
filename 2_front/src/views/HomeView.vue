<script setup>
import { computed, ref, onMounted } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
  mdiChartPie,
  mdiFire,
  mdiWeightKilogram,
  mdiRun,
  mdiCalendarToday,
  mdiRice,
  mdiFoodDrumstick,
  mdiPigVariantOutline,
  mdiCalendarTodayOutline,
  mdiKettlebell,
  mdiScale,
} from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import * as chartConfig from "@/components/Charts/chart.config.js";
import LineChart from "@/components/Charts/LineChart.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
import TableSampleClients from "@/components/TableSampleClients.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxTransaction from "@/components/CardBoxTransaction.vue";
import CardBoxClient from "@/components/CardBoxClient.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import SectionBannerStarOnGitHub from "@/components/SectionBannerStarOnGitHub.vue";
import { get_days, get_months } from "@/rest/chartconfig.js";
import Tandanji from "@/components/Tandanji.vue";
import Tandanji2 from "@/components/Tandanji2.vue";
import SectionFullScreen from "@/components/SectionFullScreen.vue";

import LoadingSpinner from "@/components/LoadingSpinner.vue";

import { main_url, port } from '../config'
// to do 
function Today() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

let now = Today();
const form2 = ref(null);
form2.value = {
  coeff: 1,
}
const percent_today_nutrient = ref(null);
percent_today_nutrient.value = {
  kcal: 0,
  carbo: 0,
  protein: 0,
  fat: 0,
}
const chartData = ref(null);

const chartData2 = ref(null);

const loading_c = ref(null);

loading_c.value = false;

const fillChartData_days = async () => {

  var rrr = await get_days()

  chartData.value = rrr;
};

const fillChartData_months = async () => {

  var rrr = await get_months()

  chartData2.value = rrr;
};

const today_sum = ref(null);
const activity_sum = ref(null);
const nutrient_sum = ref(null);
const weight_trend = ref(null);
const nutrient_trend = ref(null);
const yes_nutrient_sum = ref(null);
const activity_warn = ref(null);
const perday_nutirent = ref(null);
const purpose = ref(null);

perday_nutirent.value = {
  "carbo": 0,
  "protein": 0,
  "fat": 0
};
weight_trend.value = ['13%', 'down']
today_sum.value = { "today_cal": 3000, "today_weight": 70, "today_remain": 1000 };
nutrient_sum.value = { 'fat': 300, 'protein': 400, 'carbo': 300, 'kcal': 500 };
yes_nutrient_sum.value = { 'fat': 300, 'protein': 400, 'carbo': 300, 'kcal': 200 };
nutrient_trend.value = { 'fat': ['12%', 'down'], 'protein': ['13%', 'up'], 'carbo': ['0%', 'mid'], 'kcal': ['20%', 'down'] };

activity_sum.value = { 'today_activity': 1000, 'today_activity_goal': 500 };

activity_warn.value = ['Good!', 'success'];



function get_perday_nutrient() {

  var energy_for_day = today_sum.value['today_cal'];
  var meal_ty = form2.value['coeff']
  if (meal_ty == 0) {
    perday_nutirent.value['carbo'] = Math.round((energy_for_day / 100) * 20 * 0.8 / 4)
    perday_nutirent.value['protein'] = Math.round((energy_for_day / 100) * 40 * 0.8 / 4)
    perday_nutirent.value['fat'] = Math.round((energy_for_day / 100) * 40 * 0.8 / 9)
  }
  else if (meal_ty == 1) {
    perday_nutirent.value['carbo'] = Math.round((energy_for_day / 100) * 25 * 0.8 / 4)
    perday_nutirent.value['protein'] = Math.round((energy_for_day / 100) * 40 * 0.8 / 4)
    perday_nutirent.value['fat'] = Math.round((energy_for_day / 100) * 35 * 0.8 / 9)
  }
  else {
    perday_nutirent.value['carbo'] = Math.round((energy_for_day / 100) * 30 * 0.8 / 4)
    perday_nutirent.value['protein'] = Math.round((energy_for_day / 100) * 40 * 0.8 / 4)
    perday_nutirent.value['fat'] = Math.round((energy_for_day / 100) * 30 * 0.8 / 9)
  }

  percent_today_nutrient.value['kcal'] = Math.round(nutrient_sum.value['kcal'] / today_sum.value['today_cal'] * 100);
  percent_today_nutrient.value['carbo'] = Math.round(nutrient_sum.value['carbo'] / perday_nutirent.value['carbo'] * 100);
  percent_today_nutrient.value['protein'] = Math.round(nutrient_sum.value['protein'] / perday_nutirent.value['protein'] * 100);
  percent_today_nutrient.value['fat'] = Math.round(nutrient_sum.value['fat'] / perday_nutirent.value['fat'] * 100);
}


const get_today = async () => {
  try {
    var response = await axios.get(main_url + ":" + port + '/api/profile', {
      withCredentials: true,
    });
    purpose.value = response.data[0]['purpose']  // 벌크업모드인지 다이어트유저인지.   0 : 다이어트 , 1 : 벌크업
    console.log("회원정보", purpose.value)
    today_sum.value['today_cal'] = Math.round(response.data[0].kcal_per_day);
    today_sum.value['today_weight'] = response.data[0].current_weight;




  } catch (err) {
    console.log("Error >>", err);
  }

  try {
    var response = await axios.get(main_url + ":" + port + "/api/today/total", {
      params: { date: now },
      withCredentials: true,
    });
    var n_in = { 'fat': 0, 'protein': 0, 'carbo': 0, 'kcal': 0 }
    var total_eat = 0;
    console.log(response.data);
    for (var i = 0; i < response.data[0].length; i++) {
      n_in['fat'] += response.data[0][i]['fat'] * response.data[0][i]['gram'];
      n_in['protein'] += response.data[0][i]['protein'] * response.data[0][i]['gram'];
      n_in['carbo'] += response.data[0][i]['carbo'] * response.data[0][i]['gram'];
      n_in['kcal'] += response.data[0][i]['kcal'] * response.data[0][i]['gram'];
      total_eat += response.data[0][i]['kcal'] * response.data[0][i]['gram'];
    }
    n_in['protein'] = Math.round(n_in['protein']);
    n_in['kcal'] = Math.round(n_in['kcal']);
    n_in['carbo'] = Math.round(n_in['carbo']);
    n_in['fat'] = Math.round(n_in['fat']);
    nutrient_sum.value = n_in;
    var n_in = { 'fat': 0, 'protein': 0, 'carbo': 0, 'kcal': 0 };   // 'kcal':0 추가 
    var yes_total_eat = 0;

    for (var i = 0; i < response.data[1].length; i++) {
      n_in['fat'] += response.data[1][i]['fat'] * response.data[1][i]['gram'];
      n_in['protein'] += response.data[1][i]['protein'] * response.data[1][i]['gram'];
      n_in['carbo'] += response.data[1][i]['carbo'] * response.data[1][i]['gram'];
      n_in['kcal'] += response.data[1][i]['kcal'] * response.data[1][i]['gram'];
      yes_total_eat += response.data[1][i]['kcal'] * response.data[1][i]['gram'];    // yes_total_eat을 response.data[0][i] 에서 바꿈
    }

    console.log("total, yes", total_eat, yes_total_eat);
    yes_nutrient_sum.value = n_in;
    console.log('yes', yes_nutrient_sum.value);

    var label_list = ['kcal', 'fat', 'protein', 'carbo']
    for (var i = 0; i < label_list.length; i++) {
      var percent = Math.round((nutrient_sum.value[label_list[i]] - yes_nutrient_sum.value[label_list[i]]) * 100 / (yes_nutrient_sum.value[label_list[i]]));
      nutrient_trend.value[label_list[i]][0] = percent + '%'
      if (percent > 0) {
        nutrient_trend.value[label_list[i]][1] = 'up';
      } else if (percent < 0) {
        nutrient_trend.value[label_list[i]][1] = 'down';
      } else {
        nutrient_trend.value[label_list[i]][1] = 'mid';
      }

    }


    var activity_in = { 'today_activity': 0, 'today_activity_goal': 0 };

    for (var i = 0; i < response.data[3].length; i++) {
      activity_in['today_activity'] += Math.round(response.data[3][i]['working_time'] * response.data[3][i]['coefficient'] * today_sum.value['today_weight'] / 15);
    }

    activity_sum.value = activity_in;
    get_perday_nutrient();

    // to do 운동으로 인한 섭취 가능 칼로리 증가 필요(완료)
    today_sum.value['today_remain'] = Math.round(today_sum.value['today_cal'] - total_eat + activity_in['today_activity']);
    console.log("남은칼로리 = ", today_sum.value['today_remain']);
    if (today_sum.value['today_remain'] >= 0) {
      activity_sum.value['today_activity_goal'] = 0;
    } else {

      activity_sum.value['today_activity_goal'] = -today_sum.value['today_remain'];
      console.log("음식먹은거 초과");
      activity_warn.value[0] = "Warning!";
      activity_warn.value[1] = "alert";
    }

    console.log("today total >>", response.data[3]);
    console.log("제발", response.data);
    var yes_weight = response.data[2][0].weight;
    var w_percent = Math.round((today_sum.value.today_weight - yes_weight) * 100 / yes_weight)
    weight_trend.value[0] = w_percent + '%'

    if (w_percent > 0) {
      weight_trend.value[1] = 'up'
    } else if (w_percent < 0) {
      weight_trend.value[1] = 'down'
    } else {
      weight_trend.value[1] = 'mid'
    }
    loading_c.value = true;


  } catch (err) {
    console.log("Error >>", err);
  }

  loading_c.value = true;
};

get_today();



const get_sum = function () {
  console.log(today_sum['today_cal'])
}

onMounted(() => {
  fillChartData_days();
  fillChartData_months();

});



const mainStore = useMainStore();

const clientBarItems = computed(() => mainStore.clients.slice(0, 4));

const transactionBarItems = computed(() => mainStore.history);
const HelpPopUp = ref(null); //팝업이
const today_recommend_kcal = ref(null); //팝업임
const left_kcal_popup = ref(null); //팝업임

function additionalActivity() {
  var left_kcal_per_Day = today_sum.value["today_remain"];
  var weight = today_sum.value['today_weight'];
  var result = "<html><body>";

  if (today_sum.value["today_remain"] >= 0) {
    if (purpose.value == 0) {
      result +=
        "<li><b>다이어트 유저</b>의 경우<br>추가적으로 해야하는 운동량 = 0<br>즉,  <kcal style='color:red;'> " +
        Math.round(today_sum.value["today_remain"]) +
        "kcal</kcal>만큼의 <b>여유 열량</b>이 있습니다.<br><b>여유 열량</b>이 <b>0 밑으로만 떨어지지 않는다면</b><br>목표 날짜에 맞춰 목표 무게까지<br>도달하는 데 있어 어려움이 없습니다.<br><br>";
    } else {
      result +=
        "<li><b>벌크업 유저</b>의 경우<br>단순 체중 증량이 목적이라면 최소" +
        Math.round(today_sum.value["today_remain"]) +
        "kcal만큼의 식사는 하셔야 체중 증량이 가능합니다.<br>자세한 탄단지 내용은 <a href='/upload2' >[여기]</a>를 눌러주세요";
    }
  } else {
    left_kcal_per_Day *= -1;
    var walk = Math.round(left_kcal_per_Day / ((0.9 * weight) / 15));
    var run = Math.round(left_kcal_per_Day / ((2.5 * weight) / 15));
    var bicycle = Math.round(left_kcal_per_Day / ((2 * weight) / 15));
    var jumping = Math.round(left_kcal_per_Day / ((2.3 * weight) / 15));
    var swimming = Math.round(left_kcal_per_Day / ((2 * weight) / 15));
    var aerobic = Math.round(left_kcal_per_Day / ((1.5 * weight) / 15));
    if (purpose.value == 0) {
      result +=
        "<li><b>다이어트 유저</b>의 경우<br>추가적으로 해야하는 운동량 = " +
        Math.round(left_kcal_per_Day) +
        "kcal<br>위의 열량을 소비하기위해선 다음과 같은 운동이 필요합니다.<br>";
      result +=
        "1) 걷기 : " +
        walk +
        "분<br>2) 달리기(8km/h 기준) : " +
        run +
        "분<br>3) 자전거 : " +
        bicycle +
        "분<br>4) 줄넘기 :" +
        jumping +
        " 분<br>5) 수영  : " +
        swimming +
        "분<br>6) 에어로빅 : " +
        aerobic +
        " 분<br><br>";
    } else {
      result +=
        "<li><b>벌크업 유저</b>의 경우<br>증량에는 문제가 없지만, 탄단지의 비율도 중요합니다.<br>자세한 탄단지 내용은 <a href='/upload2' >[여기]</a>를 눌러주세요";
    }
  }
  result += "</body></html>";
  document.getElementById("popupMSG").innerHTML = result;
}

function today_recommend_kcal_f() {
  var result = "";
  result += "<b>하루 권장 섭취 열량</b> : 목표 체중에 도달하기위해 하루 섭취해야하는 열량<br><br>"
  if (today_sum.value['today_cal'] < 1000) {
    if (purpose.value == 0) {
      result += "<li><b>다이어트 유저</b>의 경우<br>하루 권장 섭취 열량이 <b>1000kcal 미만</b>입니다. <b>목표 날짜</b>를 늘리거나, 혹은 <b>목표 체중</b>을 줄이시기 바랍니다."
    } else {
      result += "<li><b>벌크업 유저</b>의 경우<br>하루 권장 섭취 열량이 <b>1000kcal 미만</b>입니다.<br><b>목표 체중을 좀 더 증량</b>시키셔도 원하는 날짜에 목표 체중까지 도달하는 데 있어<br>어려움이 없어 보입니다.<br>"
    }
  } else {
    result += "즉, 하루에 <b>" + today_sum.value['today_cal'] + "kcal</b>의 열량만 소비한다면 목표 날짜에 맞춰 목표 체중에 도달하실 수 있습니다.<br>"
  }
  if (today_sum.value['today_remain'] > 0) {

    if (purpose.value == 0) {

    } else {
      result += "<li><b>벌크업 유저</b>의 경우<br>" + today_sum.value['today_remain'] + " kcal만큼은 최소 더 드셔야 목표 중량까지 도달하실 수 있습니다."
    }
  } else {
    if (purpose.value == 0) {
      result += "<li><b>다이어트 유저</b>의 경우<br>이대로는 목표 날짜까지 목표 체중에 도달하기가 어려워 보입니다.<br>운동을 하신 후 남은 칼로리를 확보하시기 바랍니다.<br>자세한 운동사항은 <a href='/activity'>[여기]를 눌러 확인해주세요 ";
    } else {
      result += "<li><b>벌크업 유저</b>의 경우<br>오늘하루 목표 열량은 모두 충족하였습니다. 다만, 아무리 체중 증량이 목표여도<br>과도한 열량 섭취는 문제가 될 수 있습니다."
    }
  }



  document.getElementById("today_recommend_kcal").innerHTML = result;
}

function left_kcal_popup_f() {
  var result = ""
  if (purpose.value == 0) {
    result += "<li><b>다이어트 유저</b>의 경우<br><b>쉽게 말해</b> 이 수치가 <b>0미만</b>으로만 떨어지지 않으면  목표 날짜까지 목표 체중에 도달하게됩니다.<br><br>";
  } else {
    result += "<li><b>벌크업 유저</b>의 경우<br>단순 체중 증량만 놓고 보자면 본 지표가 0에 가깝거나 음수가 되어야 증량이 가능합니다.<br><b>다만</b>, 단순 열량 섭취보다는 적절한 탄단지 섭취도 중요하므로 <a href='/upload2' >[여기]</a>를 눌러 확인하시기바랍니다."
  }
  document.getElementById("left_kcal_popup").innerHTML = result;
}

async function update_perday_information() {

  var url = main_url + ":" + port + "/api/updatePerDay";
  var frm = new FormData();
  if (purpose.vlue == 0) {
    var losekcal = activity_sum.value['today_activity']
  } else {
    var losekcal = activity_sum.value['today_activity']
  }

  if (confirm("오늘의 섭취 열량(" + nutrient_sum.value['kcal'] + "kcal), 오늘 운동한 열량(" + losekcal + "kcal)을 저장하시겠습니까?\n하루가 끝나기 전에 저장하지 않으면 자동으로 현재상태가 저장됩니다.") == false) {
    alert("취소되었습니다.");
    return;
  }
  frm.append("user_id", user_id);
  frm.append("weight", today_sum.value['today_weight']);
  frm.append("date", now);
  frm.append("losekcal", losekcal);
  frm.append("consumekcal", nutrient_sum.value['kcal']);

  try {
    var response = await axios.post(url, frm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

  } catch (err) {
    console.log("Error >>", err);
  }
  alert("저장되었습니다.");
  get_today();
}



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
          <SectionTitleLineWithButton :icon="mdiCalendarToday" title="오늘의 요약">
            <BaseButton :icon="mdiReload" color="whiteDark" @click="get_today" />
          </SectionTitleLineWithButton>

          <div class="grid grid-rows-1 grid-cols-1 gap-6 lg:grid-cols-4 mb-6">

            <CardBoxWidget trend="info" trend-type="success" color="text-red-500" :icon="mdiFire"
              :number="today_sum['today_cal']" suffix="kcal" label="하루 권장 섭취 열량"
              class="transition ease-in-out hover:-translate-y-1 hover:scale-104 hover:bg-amber-100 duration-300 dark:hover:bg-slate-600"
              @click="today_recommend_kcal = true; today_recommend_kcal_f()" style="cursor: pointer" />

            <CardBoxWidget :trend="weight_trend[0]" :trend-type="weight_trend[1]" color="text-black-500"
              :icon="mdiWeightKilogram" :number="today_sum['today_weight']" suffix="kg" label="몸무게" />

            <CardBoxWidget trend="Info" trend-type="success" color="text-red-500" :icon="mdiFire"
              :number="today_sum['today_remain']" suffix="kcal" label="남은 섭취 가능 열량"
              class="transition ease-in-out hover:-translate-y-1 hover:scale-104 hover:bg-amber-100 duration-300  dark:hover:bg-slate-600"
              @click="left_kcal_popup_f(); left_kcal_popup = true" style="cursor: pointer" />


            <!--오늘 권장 탄단지 들어가는 곳-->
            <div id="meal_type">
              <!-- <FormCheckRadioGroup v-model="form2.coeff" name="coeff-radio" type="radio"
                                                                                                                                                                                                                                                                                                                                                              :options="{ 0: '저탄고지', 1: '평균', 2: '고탄저지' }" /> -->
              <select v-model="form2.coeff" id="meal_type"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                required @click="get_today">
                <option value="0">저탄고지</option>
                <option value="1">평균</option>
                <option value="2">고탄저지</option>
              </select>

              <Tandanji :number1="perday_nutirent['carbo']" suffix1="g" label1="하루 권장 탄수화물"
                :number2="perday_nutirent['protein']" label2="하루 권장 단백질" suffix2="g" :number3="perday_nutirent['fat']"
                label3="하루 권장 지방" suffix3="g" class="mt-3 bg-amber-50" />
              <!--오늘 권장 탄단지 들어가는 곳 end-->
            </div>
          </div>
          <div style="text-align: center;">
            <BaseButton class="mx-2" label="오늘 정보 저장" color="info"
              @click="update_perday_information(); isModalAdd = false" />
          </div>
        </CardBox>

        <br />
        <CardBox>

          <SectionTitleLineWithButton :icon="mdiScale" title="오늘의 영양소">
            <BaseButton :icon="mdiReload" color="whiteDark" />
          </SectionTitleLineWithButton>

          <div class="grid grid-cols-1 gap-6 lg:grid-cols-4 mb-6">
            <div>
              <CardBoxWidget :trend="nutrient_trend['kcal'][0]" :trend-type="nutrient_trend['kcal'][1]"
                color="text-rose-300" :icon="mdiPigVariantOutline" :number="nutrient_sum['kcal']" suffix="kcal"
                label="kcal" />
              <br />
              <CardBoxWidget :number="percent_today_nutrient['kcal']" suffix="%" label="하루 권장 kcal 대비" />
            </div>
            <div>
              <CardBoxWidget :trend="nutrient_trend['carbo'][0]" :trend-type="nutrient_trend['carbo'][1]"
                color="text-lime-400" :icon="mdiRice" :number="nutrient_sum['carbo']" suffix="g" label="탄수화물" />
              <br />
              <CardBoxWidget :number="percent_today_nutrient['carbo']" suffix="%" label="하루 권장 탄수화물g 대비" />
            </div>
            <div>
              <CardBoxWidget :trend="nutrient_trend['protein'][0]" :trend-type="nutrient_trend['protein'][1]"
                color="text-orange-800" :icon="mdiFoodDrumstick" :number="nutrient_sum['protein']" suffix="g"
                label="단백질" />
              <br />
              <CardBoxWidget :number="percent_today_nutrient['protein']" suffix="%" label="하루 권장 단백질g 대비" />
            </div>
            <div>
              <CardBoxWidget :trend="nutrient_trend['fat'][0]" :trend-type="nutrient_trend['fat'][1]"
                color="text-rose-300" :icon="mdiPigVariantOutline" :number="nutrient_sum['fat']" suffix="g" label="지방" />
              <br />
              <CardBoxWidget :number="percent_today_nutrient['fat']" suffix="%" label="하루 권장 지방g 대비" />
            </div>
          </div>

        </CardBox>
        <br />

        <CardBox>
          <SectionTitleLineWithButton :icon="mdiRun" title="오늘의 활동">

          </SectionTitleLineWithButton>

          <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
            <CardBoxWidget trend="12%" trend-type="up" color="text-red-500" :icon="mdiFire"
              :number="activity_sum['today_activity']" suffix="kcal" label="금일 운동 열량" />

            <CardBoxModal v-model="HelpPopUp" title="자세히 알아보기">
              <div id="popupMSG"></div>
              <div style="text-align: center;">
                <BaseButton class="w-3/10 " type="submit" color="info" @click="HelpPopUp = false" label="확인">
                </BaseButton>
              </div>
            </CardBoxModal>



            <CardBoxModal v-model="today_recommend_kcal" title="자세히 알아보기">
              <div id="today_recommend_kcal"></div>
              <div style="text-align: center;">
                <BaseButton class="w-3/10 " type="submit" color="info" @click="today_recommend_kcal = false" label="확인">
                </BaseButton>
              </div>

            </CardBoxModal>
            <CardBoxModal v-model="left_kcal_popup" title="자세히 알아보기">
              <div id="left_kcal_popup"></div>
              <div style="text-align: center;">
                <BaseButton class="w-3/10 " type="submit" color="info" @click="left_kcal_popup = false" label="확인">
                </BaseButton>
              </div>

            </CardBoxModal>
            <span style="cursor: pointer">

              <CardBoxWidget :trend="activity_warn[0]" :trend-type="activity_warn[1]" color="text-orange-500"
                :icon="mdiKettlebell" :number="activity_sum['today_activity_goal']" suffix="kcal" label="추가적으로 해야하는 운동량"
                @click="additionalActivity(), (HelpPopUp = true)"
                class="transition ease-in-out hover:-translate-y-1 hover:scale-104 hover:bg-amber-100 duration-300 dark:hover:bg-slate-600" />
            </span>
          </div>
        </CardBox>


        <br />
        <CardBox>
          <SectionTitleLineWithButton :icon="mdiChartPie" title="Trends overview - 최근 9일">
            <BaseButton :icon="mdiReload" color="whiteDark" @click="fillChartData_days" />
          </SectionTitleLineWithButton>

          <CardBox class="mb-6">
            <div v-if="chartData">
              <line-chart :data="chartData" class="h-96" />
            </div>
          </CardBox>

        </CardBox>

        <br />
        <!-- <CardBox>

                <SectionTitleLineWithButton :icon="mdiChartPie" title="Trends overview - 최근 9달">
                  <BaseButton :icon="mdiReload" color="whiteDark" @click="fillChartData_months" />
                </SectionTitleLineWithButton>

                <CardBox class="mb-6">
                  <div v-if="chartData">
                    <line-chart :data="chartData2" class="h-96" />
                  </div>
                </CardBox>

              </CardBox> -->


        <!-- <SectionTitleLineWithButton :icon="mdiAccountMultiple" title="Clients" /> -->

        <!-- <NotificationBar color="info" :icon="mdiMonitorCellphone">
                                                                                                                                                                                                                                                                                                                                                      <b>Responsive table.</b> Collapses on mobile
                                                                                                                                                                                                                                                                                                                                                    </NotificationBar> -->

        <!-- <CardBox has-table>
                                                                                                                                                                                                                                                                                                                                                      <TableSampleClients />
                                                                                                                                                                                                                                                                                                                                                    </CardBox> -->
      </SectionMain>
    </div>
  </LayoutAuthenticated>
</template>

<script>
var user_id;
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
    var url = main_url + ":" + port + '/api/session';
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

    var url2 = main_url + ":" + port + '/api/profile';
    axios.get(url2, { withCredentials: true })
      .then(function (response) {
        // 성공 핸들링

        var user_name = response.data[0].user_name;
        user_id = response.data[0].user_id;

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

      is_logout: false,
      profile: []
    }
  },
  methods: {
    test: function () {
      console.log(1);
    },
    change: function () {
      console.log(1);
      window.location.href = '/login';
    },




  },


}
</script>
