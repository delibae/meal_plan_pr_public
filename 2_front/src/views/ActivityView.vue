<script setup>
import { reactive, ref } from "vue";
import {
  mdiBallotOutline,
  mdiAccount,
  mdiMail,
  mdiGithub,
  mdiRun,
  mdiPencil,
  mdiTrashCan,
  mdiFire,
  mdiSwim,
  mdiRunFast,
  mdiJumpRope,
  mdiBike,
  mdiYoga,
  mdiKettlebell,
  mdiClipboardCheckOutline,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import { useMainStore } from "@/stores/main";
import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import Tandanji2 from "@/components/Tandanji2.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import NotificationBarInCard from "@/components/NotificationBarInCard.vue";
// import CardBoxActivityTime from "@/components/CardBoxActivityTime.vue";
import CardBoxModal from "@/components/CardBoxModalCustom.vue";
import SectionFullScreen from "@/components/SectionFullScreen.vue";

import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { main_url, port } from "../config";
const loading_c = ref(null);
loading_c.value = false;
// to do
function Today() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

let now = Today();

const selectOptions = [
  { id: 0, label: "걷기" },
  { id: 1, label: "러닝" },
  { id: 2, label: "줄넘기" },
  { id: 3, label: "수영" },
  { id: 4, label: "자전거" },
  { id: 5, label: "에어로빅 및 필라테스" },
];

const form = reactive({
  working_out_code2: "",
  working_time: "",
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
  // formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
  //   ? formStatusCurrent.value + 1
  //   : 0;
  console.log(1);
};
const today_sum = ref(null);
const activity_sum = ref(null);
// const nutrient_sum = ref(null);
// const weight_trend = ref(null);
// const nutrient_trend = ref(null);
// const yes_nutrient_sum = ref(null);
const activity_warn = ref(null);
const today_activity_goal = ref(null);
const today_activity_time = ref(null);
today_activity_time.value = [];
today_activity_goal.value = []; // 오늘 한[ [운동, 시간(분)],[운동, 시간(분)],[운동, 시간(분)],[운동, 시간(분)] ]
const icons = ref(null);

icons.value = {
  걷기: mdiRun,
  러닝: mdiRunFast,
  줄넘기: mdiJumpRope,
  수영: mdiSwim,
  자전거: mdiBike,
  "에어로빅 및 필라테스": mdiYoga,
};
activity_sum.value = { today_activity: 1000, today_activity_goal: 500 };
today_sum.value = { today_cal: 3000, today_weight: 70, today_remain: 1000 };
activity_warn.value = ["Good!", "success"];

const to_send_act = ref(null);
const to_send_weight = ref(null);

const get_today = async () => {
  try {
    var response = await axios.get(main_url + ":" + port + "/api/profile", {
      withCredentials: true,
    });
    today_sum.value["today_cal"] = response.data[0].kcal_per_day;
    today_sum.value["today_weight"] = response.data[0].current_weight;
    var current_weight = response.data[0].current_weight;
    to_send_weight.value = response.data[0].current_weight; // 나중에 함수 쓸 때 필요함.
  } catch (err) {
    console.log("Error >>", err);
  }

  try {
    var response = await axios.get(main_url + ":" + port + "/api/today/total", {
      params: { date: now },
      withCredentials: true,
    });

    var total_eat = 0;
    console.log(response.data);
    for (var i = 0; i < response.data[0].length; i++) {
      total_eat += response.data[0][i]["kcal"] * response.data[0][i]["gram"];
    }

    var yes_total_eat = 0;
    for (var i = 0; i < response.data[1].length; i++) {
      yes_total_eat +=
        response.data[1][i]["kcal"] * response.data[1][i]["gram"];
    }

    var activity_in = { today_activity: 0, today_activity_goal: 0 };

    for (var i = 0; i < response.data[3].length; i++) {
      activity_in["today_activity"] += Math.round(
        (response.data[3][i]["working_time"] *
          response.data[3][i]["coefficient"] *
          current_weight) /
        15
      );
    }

    activity_sum.value = activity_in;

    // to do 운동으로 인한 섭취 가능 칼로리 증가 필요(완료)
    today_sum.value["today_remain"] =
      today_sum.value["today_cal"] - total_eat + activity_in["today_activity"];

    if (today_sum.value["today_remain"] >= 0) {
      activity_sum.value["today_activity_goal"] = 0;
      to_send_act.value = today_sum.value["today_remain"];
    } else {
      activity_sum.value["today_activity_goal"] =
        -Math.round(today_sum.value["today_remain"]);
      to_send_act.value = today_sum.value["today_remain"];
      activity_warn.value[0] = "Warning!";
      activity_warn.value[1] = "alert";
    }

    let arr = [
      "걷기",
      "러닝",
      "줄넘기",
      "수영",
      "자전거",
      "에어로빅 및 필라테스",
    ];
    let coeff_arr = {
      걷기: 0.9,
      러닝: 2.5,
      줄넘기: 2.3,
      수영: 2,
      자전거: 2,
      "에어로빅 및 필라테스": 1.5,
    };

    let activity_dict = {};
    let act_kcal_dict = {};
    for (let i = 0; i < Object.keys(response.data[3]).length; i++) {
      var activity_name = arr[Number(response.data[3][i]["working_out_code"])];
      var time = Number(response.data[3][i]["working_time"]);
      if (activity_name in activity_dict) {
        activity_dict[activity_name] += time;
      } else {
        activity_dict[activity_name] = time;
      }
    }
    today_activity_time.value = [];
    for (var key in activity_dict) {
      console.log(
        "key : " + key + ", value : " + activity_dict[key] + "현재무게"
      );
      var total_kcal = Math.round(
        (activity_dict[key] * coeff_arr[key] * current_weight) / 15
      );

      today_activity_time.value.push([key, activity_dict[key], total_kcal]);
    }
    console.log("today total >>", response.data[3]);
  } catch (err) {
    console.log("Error >>", err);
  }
  loading_c.value = true;
};

get_today();

function temp() {
  if (form["working_out_code2"].id === undefined || form["working_time"] === '' || form["working_time"] <= 0) {
    alert("운동 입력 및 운동 시간 입력을 다시한 번 확인해주세요");
    return
  } else {
    submit();
  }
}

const submit = async () => {


  if (confirm("등록하시겠습니까?") == true) {




    // var url = protocol + "//" + port + '/api/predict_all';
    var url = main_url + ":" + port + "/api/insertActivity";
    var frm = new FormData();
    var f_list = ["working_out_code2", "working_time"];
    frm.append(f_list[0], form[f_list[0]].id);
    frm.append(f_list[1], form[f_list[1]]);
    frm.append("date", now);

    try {
      var response = await axios.post(url, frm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      get_today();
      console.log("response >> ", response);
    } catch (err) {
      console.log("Error >>", err);
    }
    alert("등록되었습니다.");
    form[f_list[1]] = null;

  } else {
    return
  }

};

const HelpPopUp = ref(null);
const uploadPopUp = ref(null);

function additionalActivity() {
  var left_kcal_per_Day = to_send_act.value;
  var weight = to_send_weight.value;
  var result = "<html><body>";

  if (to_send_act.value >= 0) {
    result +=
      "<li><b>다이어트 유저</b>의 경우<br>추가적으로 해야하는 운동량 = 0<br>즉,  <kcal style='color:red;'> " +
      Math.round(to_send_act.value) +
      "kcal</kcal>만큼의 <b>여유 열량</b>이 있습니다.<br><b>여유 열량</b>이 <b>0 밑으로만 떨어지지 않는다면</b><br>목표 날짜에 맞춰 목표 무게까지<br>도달하는 데 있어 어려움이 없습니다.<br><br>";
    result +=
      "<li><b>벌크업 유저</b>의 경우<br>살을 찌우시는 게 목적이라면 최소" +
      Math.round(to_send_act.value) +
      "kcal만큼의 식사는 하셔야 체중 증량이 가능합니다.<br>자세한 탄단지 내용은 <a href='/upload2' >[여기]</a>를 눌러주세요";
  } else {
    left_kcal_per_Day *= -1;
    var walk = Math.round(left_kcal_per_Day / ((0.9 * weight) / 15));
    var run = Math.round(left_kcal_per_Day / ((2.5 * weight) / 15));
    var bicycle = Math.round(left_kcal_per_Day / ((2 * weight) / 15));
    var jumping = Math.round(left_kcal_per_Day / ((2.3 * weight) / 15));
    var swimming = Math.round(left_kcal_per_Day / ((2 * weight) / 15));
    var aerobic = Math.round(left_kcal_per_Day / ((1.5 * weight) / 15));

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
    result +=
      "<li><b>벌크업 유저</b>의 경우<br>증량에는 문제가 없지만, 탄단지의 비율도 중요합니다.<br>자세한 탄단지 내용은 <a href='/upload2' ><span style='background-color:red;'[여기]</span></a>를 눌러주세요";
  }
  result += "</body></html>";
  document.getElementById("popupMSG").innerHTML = result;
}
</script>

<template>
  <CardBoxModal v-model="HelpPopUp" title="자세히 알아보기">
    <div id="popupMSG"></div>
    <div style="text-align: center;">
      <BaseButton class="w-3/10 " type="submit" color="info" @click="HelpPopUp = false" label="확인">
      </BaseButton>
    </div>
  </CardBoxModal>



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
          <SectionTitleLineWithButton :icon="mdiRun" title="오늘의 활동">
          </SectionTitleLineWithButton>

          <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
            <CardBoxWidget trend="12%" trend-type="up" color="text-red-500" :icon="mdiFire"
              :number="activity_sum['today_activity']" suffix="kcal" label="금일 운동 열량" />

            <span style="cursor: pointer">

              <CardBoxWidget
                class="transition ease-in-out hover:-translate-y-1 hover:scale-104 hover:bg-amber-100 duration-300  dark:hover:bg-slate-600"
                :trend="activity_warn[0]" :trend-type="activity_warn[1]" color="text-orange-500" :icon="mdiKettlebell"
                :number="activity_sum['today_activity_goal']" suffix="kcal" label="추가적으로 해야하는 운동량"
                @click="additionalActivity(), (HelpPopUp = true)" />
            </span>
          </div>
        </CardBox>
        <br />

        <!-- todo 금일운동목록 -->
        <CardBox>
          <SectionTitleLineWithButton :icon="mdiClipboardCheckOutline" title="오늘의 운동목록">
          </SectionTitleLineWithButton>


          <div v-for="item in today_activity_time" :key="item">
            <div style="float: left; margin: 0.4rem">
              <Tandanji2 class="shadow-2xl" :trend="item[0]" trend-type="act" color="text-rose-400" :icon="icons[item[0]]"
                :number1="item[1]" suffix1="분" :number2="item[2]" suffix2="kcal" />
            </div>
          </div>

        </CardBox>
        <br />
        <div style="text-align: center;">
          <BaseButton class="w-3/10 " type="submit" color="info" @click="uploadPopUp = true" label="운동등록">운동등록
          </BaseButton>

        </div>

        <CardBoxModal is-form is-hoverable @submit.prevent="formStatusSubmit" v-model="uploadPopUp">
          <NotificationBarInCard :color="formStatusOptions[formStatusCurrent]"
            :is-placed-with-header="formStatusWithHeader">
            <span><b class="capitalize">오늘은 무슨 운동을 하셨나요?</b> </span>
          </NotificationBarInCard>
          <FormField label="운동 종류">
            <FormControl v-model="form.working_out_code2" :icon-left="mdiAccount" help="운동 종류를 입력해주세요"
              placeholder="ex. 러닝" :options="selectOptions" />
          </FormField>
          <FormField label="운동 시간(분)">
            <FormControl type="number" v-model="form.working_time" :icon-left="mdiAccount" help="운동 시간을 입력해주세요"
              placeholder="분 단위로 입력해주세요" />
          </FormField>

          <BaseButton class="w-3/12" label="등록" type="submit" color="info" @click="temp()" />
          <BaseButton class="w-3/12 mx-2" label="취소" type="취소" color="danger" @click="uploadPopUp = false" />

        </CardBoxModal>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script>
import axios from "axios";
export default {
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