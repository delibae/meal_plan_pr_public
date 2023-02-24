<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiBallotOutline,
  mdiAccount,
  mdiMail,
  mdiGithub,
  mdiFire,
  mdiRice,
  mdiFoodDrumstick,
  mdiPigVariantOutline,
} from "@mdi/js";
import CardBoxTest from "@/components/CardBoxTest.vue";
import { get_days, get_months } from "@/rest/chartconfig.js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import NotificationBarInCard from "@/components/NotificationBarInCard.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";

//custom modal
// import CardBoxModal from "@/components/CardBoxModal.vue";
import CardBoxModal from "@/components/CardBoxModalCustom.vue";
import { main_url, port } from "../config";
const selectOptions = [
  { id: 1, label: "Business development" },
  { id: 2, label: "Marketing" },
  { id: 3, label: "Sales" },
];

const form = reactive({
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "",
  department: selectOptions[0],
});

const addinfo = reactive({
  foodtype: "",
  foodamount: "",
});

const customElementsForm = reactive({
  checkbox: ["lorem"],
  radio: "one",
  switch: ["one"],
  file: null,
});

const formStatusWithHeader = ref(true);

const formStatusCurrent = ref(0);

const formStatusOptions = ["info", "success", "danger", "warning"];

const formStatusSubmit = () => {
  formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
    ? formStatusCurrent.value + 1
    : 0;
};

//모달창 (팝업)
const modalInputActive = ref(false); //입력값으로 추가
const modalDetectionActive = ref(false); //인공지능 예측으로 추가
const modalDeleteActive = ref(false); //삭제

//Home에서 복붙
let now = new Date("2022-09-01");

const chartData = ref(null);

const chartData2 = ref(null);

const fillChartData_days = async () => {
  var rrr = await get_days();

  chartData.value = rrr;
};

const fillChartData_months = async () => {
  var rrr = await get_months();

  chartData2.value = rrr;
};

const today_sum = ref(null);
const activity_sum = ref(null);
const nutrient_sum = ref(null);
const weight_trend = ref(null);
const nutrient_trend = ref(null);
const yes_nutrient_sum = ref(null);
const activity_warn = ref(null);

weight_trend.value = ["13%", "down"];
today_sum.value = { today_cal: 3000, today_weight: 70, today_remain: 1000 };
nutrient_sum.value = { fat: 300, protein: 400, carbo: 300 };
yes_nutrient_sum.value = { fat: 300, protein: 400, carbo: 300 };
nutrient_trend.value = {
  fat: ["12%", "down"],
  protein: ["13%", "up"],
  carbo: ["0%", "mid"],
};

activity_sum.value = { today_activity: 1000, today_activity_goal: 500 };

activity_warn.value = ["Good!", "success"];

const get_today = async () => {
  try {
    var response = await axios.get(main_url + ":" + port + "/api/profile", {
      withCredentials: true,
    });
    today_sum.value["today_cal"] = response.data[0].kcal_per_day;
    today_sum.value["today_weight"] = response.data[0].current_weight;
    let now = new Date("2022-09-01");
  } catch (err) {
    console.log("Error >>", err);
  }

  try {
    var response = await axios.get(main_url + ":" + port + "/api/today/total", {
      params: { date: now },
      withCredentials: true,
    });
    var n_in = { fat: 0, protein: 0, carbo: 0 };
    var total_eat = 0;
    console.log(response.data);
    for (var i = 0; i < response.data[0].length; i++) {
      n_in["fat"] += response.data[0][i]["fat"];
      n_in["protein"] += response.data[0][i]["protein"];
      n_in["carbo"] += response.data[0][i]["carbo"];
      total_eat += response.data[0][i]["kcal"];
    }
    nutrient_sum.value = n_in;
    var n_in = { fat: 0, protein: 0, carbo: 0 };
    var yes_total_eat = 0;
    for (var i = 0; i < response.data[1].length; i++) {
      n_in["fat"] += response.data[1][i]["fat"];
      n_in["protein"] += response.data[1][i]["protein"];
      n_in["carbo"] += response.data[1][i]["carbo"];
      yes_total_eat += response.data[0][i]["kcal"];
    }
    yes_nutrient_sum.value = n_in;
    console.log("yes", yes_nutrient_sum.value);

    var label_list = ["fat", "protein", "carbo"];
    for (var i = 0; i < label_list.length; i++) {
      var percent = Math.ceil(
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
    var w_percent = Math.ceil(
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
      activity_in["today_activity"] +=
        response.data[3][i]["working_time"] *
        response.data[3][i]["coefficient"];
    }

    activity_sum.value = activity_in;

    // to do 운동으로 인한 섭취 가능 칼로리 증가 필요(완료)
    today_sum.value["today_remain"] =
      today_sum.value["today_cal"] - total_eat + activity_in["today_activity"];

    if (today_sum.value["today_remain"] >= 0) {
      activity_sum.value["today_activity_goal"] = 0;
    } else {
      activity_sum.value["todya_activity_goal"] -=
        today_sum.value["total_remain"];
      activity_warn.value[0] = "Warning!";
      activity_warn.value[1] = "alert";
    }

    console.log("today total >>", response.data[3]);
  } catch (err) {
    console.log("Error >>", err);
  }
};

get_today();

const get_sum = function () {
  console.log(today_sum["today_cal"]);
};

onMounted(() => {
  fillChartData_days();
  fillChartData_months();
});

const mainStore = useMainStore();

const clientBarItems = computed(() => mainStore.clients.slice(0, 4));

const transactionBarItems = computed(() => mainStore.history);
//Home에서 복붙
</script>

<template>
  <LayoutAuthenticated>
    <CardBoxModal v-model="modalInputActive" title="새로운 식사 입력">
      <p>직접 정보를 입력</p>
      <FormField label="무슨 음식을 드셨나요?">
        <FormControl
          v-model="addinfo.foodname"
          :icon-left="mdiAccount"
          help="WhatFood"
          id="whatfood"
          placeholder="음식명 하나를 입력하세요"
        />
      </FormField>

      <FormField label="음식을 얼마나 드셨나요?">
        <FormControl
          v-model="addinfo.foodamount"
          :icon-left="mdiAccount"
          help="CurrentWeight"
          id="foodamount"
          placeholder="먹은 음식의 양을 입력하세요"
          type="number"
        />
      </FormField>

      <BaseDivider />

      <BaseButtons>
        <BaseButton
          class="w-3/12"
          type="submit"
          color="info"
          label="추가"
          @click="addRow()"
        />
        <BaseButton
          class="w-3/12"
          type="submit"
          color="info"
          outline
          label="취소"
          @click="modalInputActive = false"
        />
      </BaseButtons>
    </CardBoxModal>

    <CardBoxModal
      v-model="modalDetectionActive"
      title="인공지능이 예측해주는 식사"
    >
      <FormField label="이미지 업로드" help="하나의 이미지 파일만 추가 가능">
        <FormFilePicker label="파일 추가" />
      </FormField>

      <BaseButtons title>
        <BaseButton
          class="w-3/12"
          type="submit"
          color="info"
          label="전송"
          @click="sendImage"
        />
        <p>[서버 전송상태 표시]</p>
      </BaseButtons>

      <BaseButtons>
        <BaseButton
          class="w-3/12"
          type="submit"
          color="info"
          label="추가"
          @click="addRow()"
        />
        <BaseButton
          class="w-3/12"
          type="submit"
          color="info"
          outline
          label="취소"
          @click="modalDetectionActive = false"
        />
      </BaseButtons>
    </CardBoxModal>

    <CardBoxModal
      v-model="modalDeleteActive"
      title="식사를 삭제하시겠습니까?"
      button="danger"
    >
      <p>가장 마지막에 추가한 식사를 <b>삭제</b>합니다.</p>
      <p>이 작업은 <i>되돌릴 수 없습니다.</i></p>
      <BaseButtons>
        <BaseButton
          class="w-3/12"
          type="submit"
          color="info"
          label="삭제"
          @click="deleteRow()"
        />
        <BaseButton
          class="w-3/12"
          type="submit"
          color="info"
          outline
          label="취소"
          @click="modalDeleteActive = false"
        />
      </BaseButtons>
    </CardBoxModal>

    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiBallotOutline"
        title="식단 추천 & 인증"
        main
      >
      </SectionTitleLineWithButton>
    </SectionMain>

    <SectionMain>
      <CardBox>
        <BaseDivider />

        <FormField label="Radio">
          <FormCheckRadioGroup
            v-model="customElementsForm.radio"
            name="sample-radio"
            type="radio"
            :options="{ one: 'One', two: 'Two' }"
          />
        </FormField>
      </CardBox>

      <!-- class="md:w-7/12 lg:w-5/12 xl:w-4/12 shadow-2xl md:mx-auto" -->
      <CardBox
        class="md:w-12/12 lg:w-12/12 xl:w-12/12 shadow-2xl md:mx-auto"
        is-form
        is-hoverable
        @submit.prevent="formStatusSubmit"
      >
        <NotificationBarInCard
          :color="formStatusOptions[formStatusCurrent]"
          :is-placed-with-header="formStatusWithHeader"
        >
          <span>식단 인증</span>
        </NotificationBarInCard>

        <table id="fruits">
          <thead>
            <tr>
              <th>업로드 시간</th>
              <th>식사 종류</th>
              <th>식사량(g)</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>

        <template #footer>
          <BaseButtons>
            <BaseButton
              label="식사 입력"
              color="info"
              @click="modalInputActive = true"
            />
            <BaseButton
              label="식사 예측"
              color="info"
              @click="modalDetectionActive = true"
            />
            <BaseButton
              label="식사 삭제"
              color="info"
              @click="modalDeleteActive = true"
            />
          </BaseButtons>
        </template>
      </CardBox>

      <SectionMain>
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-4 mb-6">
          <CardBoxWidget
            class="shadow-2xl"
            trend="Info"
            trend-type="success"
            color="text-red-500"
            :icon="mdiFire"
            :number="today_sum['today_remain']"
            suffix="kcal"
            label="남은 섭취 가능 열량"
          />
          <CardBoxWidget
            class="shadow-2xl"
            :trend="nutrient_trend['carbo'][0]"
            :trend-type="nutrient_trend['carbo'][1]"
            color="text-lime-400"
            :icon="mdiRice"
            :number="nutrient_sum['carbo']"
            suffix="g"
            label="남은 탄수화물"
          />
          <CardBoxWidget
            class="shadow-2xl"
            :trend="nutrient_trend['protein'][0]"
            :trend-type="nutrient_trend['protein'][1]"
            color="text-orange-800"
            :icon="mdiFoodDrumstick"
            :number="nutrient_sum['protein']"
            suffix="g"
            label="남은 단백질"
          />
          <CardBoxWidget
            class="shadow-2xl"
            :trend="nutrient_trend['fat'][0]"
            :trend-type="nutrient_trend['fat'][1]"
            color="text-rose-300"
            :icon="mdiPigVariantOutline"
            :number="nutrient_sum['fat']"
            suffix="g"
            label="남은 지방"
          />
        </div>
      </SectionMain>

      <CardBox
        class="md:w-12/12 lg:w-12/12 xl:w-12/12 shadow-2xl md:mx-auto"
        is-form
        is-hoverable
        @submit.prevent="formStatusSubmit"
      >
        <NotificationBarInCard
          :color="formStatusOptions[formStatusCurrent]"
          :is-placed-with-header="formStatusWithHeader"
        >
          <span>식단추천</span>
        </NotificationBarInCard>
        <div class="gap-6 mb-6">
          <CardBoxTest
            class="grid shadow-2xl"
            :trend="nutrient_trend['fat'][0]"
            :trend-type="nutrient_trend['fat'][1]"
            color="text-rose-300"
            :icon="mdiPigVariantOutline"
            :number="nutrient_sum['fat']"
            suffix="g"
            label="남은 지방"
          />
        </div>

        <template #footer>
          <BaseButtons>
            <BaseButton
              label="식사 입력"
              color="info"
              @click="modalInputActive = true"
            />
            <BaseButton
              label="식사 예측"
              color="info"
              @click="modalDetectionActive = true"
            />
            <BaseButton
              label="식사 삭제"
              color="info"
              @click="modalDeleteActive = true"
            />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script>
import axios from "axios";
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
  methods: {
    addRow: function () {
      //현재 날짜 불러오기
      const today = new Date();
      const datetime =
        new Date().getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate() +
        " " +
        today.getHours() +
        ":" +
        today.getMinutes() +
        ":" +
        today.getSeconds();
      // table element 중 tbody 부분 찾기
      const table = document
        .getElementById("fruits")
        .getElementsByTagName("tbody")[0];
      // 새 행(Row) 추가
      const newRow = table.insertRow();
      // 새 행(Row)에 Cell 추가
      const colOne = newRow.insertCell(0);
      const colTwo = newRow.insertCell(1);
      const colThree = newRow.insertCell(2);
      const colFour = newRow.insertCell(3);
      // Cell에 텍스트 추가
      colOne.innerText = datetime;
      //new Date().toLocaleDateString();
      colTwo.innerText = document.getElementById("whatfood").value;
      colThree.innerText = document.getElementById("foodamount").value;
      colFour.innerHTML = '<input type="submit" value="삭제">';
      //삭제 버튼 기능 구현 아직 안됨
      //입력 후 초기화
      document.getElementById("whatfood").value = "";
      document.getElementById("foodamount").value = "";
    },
    deleteRow: function () {
      const table = document
        .getElementById("fruits")
        .getElementsByTagName("tbody")[0];
      table.deleteRow([-1]);
    },

    test: function () {
      console.log(1);
    },
    change: function () {
      console.log(1);
      window.location.href = "/login";
    },
  },
  components: { CardBoxModal },

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

    var url2 = main_url + ":" + port + "/api/profile";
    axios
      .get(url2, { withCredentials: true })
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
      is_logout: false,
      profile: [],
    };
  },
};
</script>
<style>
table {
  width: 75%;
  text-align: left;
}

table th {
  padding: 12px;
  border-bottom: 2px solid darkgray;
}

table td {
  padding: 12px;
}

table tr:nth-of-type(even) {
  background-color: rgba(0, 0, 255, 0.1);
}

.box {
  padding: 10px;
  margin: 10px;
  background-color: rgba(0, 0, 255, 0.1);
}

.ma {
  margin: 10px 10px;
}
</style>