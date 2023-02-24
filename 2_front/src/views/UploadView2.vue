<script setup>
import {
  mdiMonitorCellphone,
  mdiTableBorder,
  mdiTableOff,
  mdiGithub,
  mdiTable,
  mdiCalendarTextOutline,
  mdiReload,
  mdiAccount,
  mdiFire,
  mdiRice,
  mdiFoodDrumstick,
  mdiPigVariantOutline,
  mdiBallotOutline,
  mdiTransferUp,
  mdiSilverwareClean,
  mdiNutrition,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBoxTest from "@/components/CardBoxTest.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import TableSam2 from "@/components/TableSam2.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxModal from "@/components/CardBoxModalCustom.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import { get_days, get_months } from "@/rest/chartconfig.js";
import NotificationBarInCard from "@/components/NotificationBarInCard.vue";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import Tandanji from "@/components/Tandanji.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { ref, watch } from "vue";
import { main_url, port } from "../config";
const loading_c = ref(null);
loading_c.value = false;
const form2 = ref(null);
form2.value = {
  coeff: 1,
};
const perday_nutirent = ref(null);
const percent_today_nutrient = ref(null);
percent_today_nutrient.value = {
  kcal: 0,
  carbo: 0,
  protein: 0,
  fat: 0,
};
perday_nutirent.value = {
  carbo: 0,
  protein: 0,
  fat: 0,
};
function get_perday_nutrient() {
  var energy_for_day = today_sum.value["today_cal"];
  var meal_ty = form2.value["coeff"];
  if (meal_ty == 0) {
    perday_nutirent.value["carbo"] = Math.round(
      ((energy_for_day / 100) * 20 * 0.8) / 4
    );
    perday_nutirent.value["protein"] = Math.round(
      ((energy_for_day / 100) * 40 * 0.8) / 4
    );
    perday_nutirent.value["fat"] = Math.round(
      ((energy_for_day / 100) * 40 * 0.8) / 9
    );
  } else if (meal_ty == 1) {
    perday_nutirent.value["carbo"] = Math.round(
      ((energy_for_day / 100) * 25 * 0.8) / 4
    );
    perday_nutirent.value["protein"] = Math.round(
      ((energy_for_day / 100) * 40 * 0.8) / 4
    );
    perday_nutirent.value["fat"] = Math.round(
      ((energy_for_day / 100) * 35 * 0.8) / 9
    );
  } else {
    perday_nutirent.value["carbo"] = Math.round(
      ((energy_for_day / 100) * 30 * 0.8) / 4
    );
    perday_nutirent.value["protein"] = Math.round(
      ((energy_for_day / 100) * 40 * 0.8) / 4
    );
    perday_nutirent.value["fat"] = Math.round(
      ((energy_for_day / 100) * 30 * 0.8) / 9
    );
  }

  percent_today_nutrient.value["kcal"] = Math.round(
    (nutrient_sum.value["kcal"] / today_sum.value["today_cal"]) * 100
  );
  percent_today_nutrient.value["carbo"] = Math.round(
    (nutrient_sum.value["carbo"] / perday_nutirent.value["carbo"]) * 100
  );
  percent_today_nutrient.value["protein"] = Math.round((nutrient_sum.value["protein"] / perday_nutirent.value["protein"]) * 100
  );

  percent_today_nutrient.value["fat"] = Math.round(
    (nutrient_sum.value["fat"] / perday_nutirent.value["fat"]) * 100
  );
  console.log("여기여기", percent_today_nutrient.value["protein"]);

}

const today_sum = ref(null);
const activity_sum = ref(null);
const nutrient_sum = ref(null);
const weight_trend = ref(null);
const nutrient_trend = ref(null);
const yes_nutrient_sum = ref(null);
const activity_warn = ref(null);
activity_warn.value = ['Good!', 'success'];
weight_trend.value = ["13%", "down"];
today_sum.value = { today_cal: 0, today_weight: 0, today_remain: 0 };
nutrient_sum.value = { fat: 0, protein: 0, carbo: 0, kcal: 0 };
yes_nutrient_sum.value = { fat: 0, protein: 0, carbo: 0, kcal: 0 };
nutrient_trend.value = {
  fat: ["12%", "down"],
  protein: ["13%", "up"],
  carbo: ["0%", "mid"],
  kcal: ["20%", "down"],
};

var ids = [];
var user_id;

const lineData = ref(null);
lineData.value = [];

function Today() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

let now = Today();
const today_food_list = function (
  date,
  food_name,
  gram,
  kcal,
  carbo,
  protein,
  fat,
  id
) {

  lineData.value.push({
    date: date,
    meal_type: food_name,
    meal_amount: gram,
    meal_cal: kcal,
    meal_carbo: carbo,
    meal_protein: protein,
    meal_fat: fat,

    id: id,
  });
};

const get_today = async () => {
  try {
    var response = await axios.get(main_url + ":" + port + "/api/profile", {
      withCredentials: true,
    });

    user_id = response.data[0]["user_id"];
    lineData.value = [];
  } catch (err) {
    console.log("Error >>", err);
  }

  try {
    var response = await axios.get(main_url + ":" + port + "/api/today/total", {
      params: { date: now },
      withCredentials: true,
    });
    var n_in = { fat: 0, protein: 0, carbo: 0, kcal: 0 };
    var total_eat = 0;

    for (var i = 0; i < response.data[0].length; i++) {
      console.log(response.data[0][i]["id"]);
      var day = now; //나중에 날짜 바꿔야됨 
      var food_name = response.data[0][i]["food_name"];
      var gram = response.data[0][i]["gram"];
      var kcal = Math.round(response.data[0][i]["kcal"] * gram);
      var carbo = Math.round(response.data[0][i]["carbo"] * gram);
      var protein = Math.round(response.data[0][i]["protein"] * gram);
      var fat = Math.round(response.data[0][i]["fat"] * gram);
      var id = response.data[0][i]["id"];
      today_food_list(day, food_name, gram, kcal, carbo, protein, fat, id);
    }

    try {
      var response = await axios.get(main_url + ":" + port + "/api/profile", {
        withCredentials: true,
      });
      console.log(response);
      today_sum.value["today_cal"] = response.data[0].kcal_per_day;
      today_sum.value["today_weight"] = response.data[0].current_weight;



    } catch (err) {
      console.log("Error >>", err);
    }

    try {
      var response = await axios.get(
        main_url + ":" + port + "/api/today/total",
        {
          params: { date: now },
          withCredentials: true,
        }
      );
      var n_in = { fat: 0, protein: 0, carbo: 0, kcal: 0 };
      var total_eat = 0;
      console.log(response.data);
      for (var i = 0; i < response.data[0].length; i++) {
        n_in["fat"] += response.data[0][i]["fat"] * response.data[0][i]["gram"];
        n_in["protein"] +=
          response.data[0][i]["protein"] * response.data[0][i]["gram"];
        n_in["carbo"] +=
          response.data[0][i]["carbo"] * response.data[0][i]["gram"];
        n_in["kcal"] +=
          response.data[0][i]["kcal"] * response.data[0][i]["gram"];
        total_eat += response.data[0][i]["kcal"] * response.data[0][i]["gram"];
      }
      n_in["protein"] = Math.round(n_in["protein"]);
      n_in["kcal"] = Math.round(n_in["kcal"]);
      n_in["carbo"] = Math.round(n_in["carbo"]);
      n_in["fat"] = Math.round(n_in["fat"]);
      nutrient_sum.value = n_in;
      var n_in = { fat: 0, protein: 0, carbo: 0, kcal: 0 }; // 'kcal':0 추가
      var yes_total_eat = 0;

      for (var i = 0; i < response.data[1].length; i++) {
        n_in["fat"] += response.data[1][i]["fat"] * response.data[1][i]["gram"];
        n_in["protein"] +=
          response.data[1][i]["protein"] * response.data[1][i]["gram"];
        n_in["carbo"] +=
          response.data[1][i]["carbo"] * response.data[1][i]["gram"];
        n_in["kcal"] +=
          response.data[1][i]["kcal"] * response.data[1][i]["gram"];
        yes_total_eat +=
          response.data[1][i]["kcal"] * response.data[1][i]["gram"]; // yes_total_eat을 response.data[0][i] 에서 바꿈
      }

      console.log("total, yes", total_eat, yes_total_eat);
      yes_nutrient_sum.value = n_in;
      console.log("yes", yes_nutrient_sum.value);

      var label_list = ["fat", "protein", "carbo", "kcal"];
      for (var i = 0; i < label_list.length; i++) {
        var percent = Math.round(
          ((nutrient_sum.value[label_list[i]] -
            yes_nutrient_sum.value[label_list[i]]) *
            100) /
          yes_nutrient_sum.value[label_list[i]]
        );
        nutrient_trend.value[label_list[i]][0] = percent + "%";
        if (percent > 0) {
          nutrient_trend.value[label_list[i]][1] = "up";
        } else if (percent < 0) {
          nutrient_trend.value[label_list[i]][1] = "down";
        } else {
          nutrient_trend.value[label_list[i]][1] = "mid";
        }
      }

      var yes_weight = response.data[2][0].weight;
      var w_percent = Math.round(
        ((today_sum.value.today_weight - yes_weight) * 100) / yes_weight
      );
      weight_trend.value[0] = w_percent + "%";

      if (w_percent > 0) {
        weight_trend.value[1] = "up";
      } else if (w_percent < 0) {
        weight_trend.value[1] = "down";
      } else {
        weight_trend.value[1] = "mid";
      }

      var activity_in = { today_activity: 0, today_activity_goal: 0 };

      for (var i = 0; i < response.data[3].length; i++) {
        activity_in["today_activity"] += Math.round(
          (response.data[3][i]["working_time"] *
            response.data[3][i]["coefficient"] *
            today_sum.value["today_weight"]) /
          15
        );
      }

      activity_sum.value = activity_in;

      // to do 운동으로 인한 섭취 가능 칼로리 증가 필요(완료)
      today_sum.value["today_remain"] =
        today_sum.value["today_cal"] -
        total_eat +
        activity_in["today_activity"];
      console.log("남은칼로리 = ", today_sum.value["today_remain"]);
      if (today_sum.value["today_remain"] >= 0) {
        activity_sum.value["today_activity_goal"] = 0;
      } else {
        activity_sum.value["today_activity_goal"] -=
          today_sum.value["total_remain"];

        activity_warn.value[0] = "Warning!";
        activity_warn.value[1] = "alert";
      }
      console.log()
      get_perday_nutrient();
      console.log("today total >>", response.data[3]);
      loading_c.value = true;
    } catch (err) {
      console.log("Error >>", err);
    }

    loading_c.value = true;
  } catch (err) {
    console.log("Error >>", err);
  }
};

get_today();


const push_data = async (data) => {

  lineData.value.unshift(data);

  var food_name = data["meal_type"];
  var gram = data["meal_amount"];

  var url = main_url + ":" + port + "/api/insertFood";
  var frm = new FormData();

  frm.append("user_id", user_id);
  frm.append("food_name", food_name);
  frm.append("date", now);
  frm.append("gram", gram);

  try {
    var response = await axios.post(url, frm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    console.log("씨발 마지막", response);
    if (response['data'] == "0") {
      alert("찾는 음식이 존재하지 않습니다.");
      get_today();
      return;
    }
    alert("등록되었습니다.");
    get_today();
    console.log("response >> ", response);
  } catch (err) {
    console.log("Error >>", err);
  }

  // DEBUG
  // console.log("data>>", data);
  // var bef = lineData.value;
  // bef.push(data)
  // var aft = bef;
  // console.log("aft>>", aft);
  // for (var i = 0; i < aft.length; i++) {
  //     console.log("item >>", aft[i]);
  // }
  // lineData.value = aft;
};

//date 연산 함수


const pop_data = async (idx) => {
  // 2022-09-01 00:00:00 이런 형식으로 들어가야됨

  console.log("Delete index number>>", idx);
  console.log("New linedata>>", lineData.value);
  var url = main_url + ":" + port + "/api/deleteFood";
  var frm = new FormData();
  frm.append("food_name", lineData.value[idx]["meal_type"]);
  frm.append("date", now);
  frm.append("user_id", user_id);
  frm.append("id", lineData.value[idx]["id"]);
  lineData.value.splice(idx, 1);

  try {
    var response = await axios.post(url, frm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    console.log("response >> ", response);
    get_today();
  } catch (err) {
    console.log("Error >>", err);
  }
};



</script>

<template>
  <LayoutAuthenticated @change="change">
    <SectionMain>
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
        <CardBox>
          <SectionTitleLineWithButton :icon="mdiCalendarTextOutline" title="오늘의 요약">
            <BaseButton :icon="mdiReload" color="whiteDark" />
          </SectionTitleLineWithButton>
          <select v-model="form2.coeff" id="meal_type"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
            required @click="get_today" style="width: 120px">
            <option value="0">저탄고지</option>
            <option value="1">평균</option>
            <option value="2">고탄저지</option>
          </select>

          <div class="grid grid-cols-1 gap-6 lg:grid-cols-5 mb-6">
            <Tandanji :number1="perday_nutirent['carbo']" suffix1="g" label1="권장 탄수화물"
              :number2="perday_nutirent['protein']" label2="권장 단백질" suffix2="g" :number3="perday_nutirent['fat']"
              label3="권장 지방" suffix3="g" class="bg-amber-50 mt-3" />
            <div>
              <CardBoxWidget :trend="nutrient_trend['kcal'][0]" :trend-type="nutrient_trend['kcal'][1]"
                color="text-rose-300" :number="nutrient_sum['kcal']" suffix="kcal" label="kcal" />
              <br />
              <CardBoxWidget :number="percent_today_nutrient['kcal']" suffix="%" label="하루권장 대비" />
            </div>
            <div>
              <CardBoxWidget :trend="nutrient_trend['carbo'][0]" :trend-type="nutrient_trend['carbo'][1]"
                color="text-lime-400" :icon="mdiRice" :number="nutrient_sum['carbo']" suffix="g" label="탄수화물" />
              <br />
              <CardBoxWidget :number="percent_today_nutrient['carbo']" suffix="%" label="하루권장 대비" />
            </div>
            <div>
              <CardBoxWidget :trend="nutrient_trend['protein'][0]" :trend-type="nutrient_trend['protein'][1]"
                color="text-orange-800" :icon="mdiFoodDrumstick" :number="nutrient_sum['protein']" suffix="g"
                label="단백질" />
              <br />
              <CardBoxWidget :number="percent_today_nutrient['protein']" suffix="%" label="하루권장 대비" />
            </div>
            <div>
              <CardBoxWidget :trend="nutrient_trend['fat'][0]" :trend-type="nutrient_trend['fat'][1]"
                color="text-rose-300" :icon="mdiPigVariantOutline" :number="nutrient_sum['fat']" suffix="g" label="지방" />
              <br />
              <CardBoxWidget :number="percent_today_nutrient['fat']" suffix="%" label="하루권장 대비" />
            </div>
          </div>

        </CardBox>
        <br />
        <CardBox>
          <SectionTitleLineWithButton :icon="mdiNutrition" title="식단 등록">
            <BaseButton :icon="mdiReload" color="whiteDark" />
          </SectionTitleLineWithButton>

          <br />
          <CardBox class="mb-6" has-table>
            <TableSam2 checkable :today_sum="today_sum" :perday_nutrient="perday_nutirent" :lineData="lineData"
              @push_data="push_data" @pop_data="pop_data" />
          </CardBox>
        </CardBox>

        <br />
        <CardBox>

          <SectionTitleLineWithButton :icon="mdiSilverwareClean" title="AI가 추천하는 식단">
            <BaseButton :icon="mdiReload" color="whiteDark" />
          </SectionTitleLineWithButton>
          <!--upload1이랑 합치는 부분-->

          <div class="gap-6 mb-6">
            <CardBoxTest class="grid shadow-md" color="text-rose-300" :number="nutrient_sum['fat']" suffix="g" />
          </div>


        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script>
import axios from "axios";
import { isTemplateNode } from "@vue/compiler-core";

export default {
  name: "LoginView",
  components: {},
  beforeMount() {
    var url = main_url + ":" + port + "/api/session";
    axios
      .get(url, { withCredentials: true })
      .then(function (response) {
        // 성공 핸들링
        console.log(response);
        if (response.data == "") {
          window.location.href = "/login";
        }
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
      avg_consume: 3000,
    };
  },
  methods: {
    test: function () {
      console.log(1);
    },
    change: function () {
      console.log(1);
      window.location.href = "/login";
    },
  },
};
</script>
