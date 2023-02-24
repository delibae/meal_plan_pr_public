<script setup>
import { reactive, ref } from "vue";
import { mdiBallotOutline, mdiAccount, mdiMail, mdiGithub, mdiConsoleNetwork } from "@mdi/js";
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
import { useMainStore } from "@/stores/main";

import SectionFullScreen from "@/components/SectionFullScreen.vue";

import LoadingSpinner from "@/components/LoadingSpinner.vue";

import { main_url, port } from '../config'

// to do 
let now = new Date("2022-09-01");




const numberMeals = [
  { id: 1, label: "1끼" },
  { id: 2, label: "2끼" },
  { id: 3, label: "3끼" },
  { id: 4, label: "4끼" },
];

const form = ref(null);
var to_update_data = [];

form.value = {
  purpose: 0,
  d_day: new Date().toISOString().slice(0, 10),
  current_weight: "",
  goal_weight: "",
  // num_meals: numberMeals[2],  //default: 3끼
  minimum_kcal: "",
  coeff: 0,
}


//태희 2/11/10:22Am 추가
function get_bmr(height, weight, age, gender, purpose, coefficient) {
  var bmr;
  console.log('purpose', purpose);
  console.log('coeff', coefficient);
  if (gender.toLowerCase() == 'f') {
    var activity_type = [1, 1.12, 1.27, 1.45]
    bmr = (6.25 * height) + (10 * weight) - (5 * age) - 161;
    if (purpose == 1) {
      bmr *= activity_type[coefficient];
    }
  } else {
    var activity_type = [1, 1.11, 1.25, 1.48];
    bmr = (6.25 * height) + (10 * weight) - (5 * age) + 5;
    if (purpose == 1) {
      bmr *= activity_type[coefficient];

    }
  }

  return bmr;
}
// to do (태희)
function get_kcal_per_day(energy_for_day, goal_weight, weight, goal_date) {
  console.log(goal_date);
  var today = new Date();
  var arr1 = goal_date.split('-');
  console.log(arr1);
  console.log(today);
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1;  // 월
  let day = today.getDay();  // 요일
  var arr2 = [year, month, day];



  var dat1 = new Date(arr1[0], arr1[1], arr1[2]); // 목표일
  var dat2 = new Date(arr2[0], arr2[1], arr2[2]); // 오늘




  let goal_days = Math.floor((dat1 - dat2) / (1000 * 60 * 60 * 24));
  console.log('goal_days = ' + goal_days);
  var kcal_per_day = energy_for_day - ((((weight - goal_weight) / goal_days)) * 7000);

  return kcal_per_day

}


const loading_c = ref(null);

loading_c.value = false;

const get_prev = async () => {
  try {

    var response = await axios.get(main_url + ":" + port + "/api/profile", {
      withCredentials: true,
    });
    console.log("response >>", response);
    form.value.purpose = response.data[0].purpose;
    form.value.current_weight = response.data[0].current_weight;
    to_update_data.push(response.data[0].height);
    to_update_data.push(response.data[0].gender);
    to_update_data.push(response.data[0].age);
    form.value.d_day = new Date(response.data[0].d_day).toISOString().split("T")[0];;
    form.value.goal_weight = response.data[0].goal_weight;
    form.value.minimum_kcal = response.data[0].minimum_kcal;

    console.log("form >> ", form.value);
    loading_c.value = true;
  } catch (err) {
    console.log("Error >>", err);
  }
}

get_prev()



const submit = async () => {


  var url = main_url + ":" + port + "/api/profile/updateGoal";
  var frm = new FormData();
  var f_list = ['purpose', 'current_weight', 'goal_weight', 'minimum_kcal', 'd_day'];
  for (var i = 0; i < f_list.length; i++) {
    frm.append(f_list[i], form.value[f_list[i]]);
  }

  var bmr_ = get_bmr(to_update_data[0], form.value[f_list[1]], to_update_data[2], to_update_data[1], form.value['purpose'], form.value['coeff']);
  frm.append('bmr', bmr_);
  console.log('bmr', bmr_);

  frm.append('kcal_per_day', get_kcal_per_day(bmr_, form.value['goal_weight'], form.value['current_weight'], form.value['d_day']));
  console.log('test', frm);
  try {
    var response = await axios.post(url, frm, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }, withCredentials: true,
    });
    console.log("response >> ", response)
    loading_c.value = true;
    window.location.href = '/dashboard'
  } catch (err) {
    console.log("Error >>", err);
  }


};

const formStatusWithHeader = ref(true);

const formStatusCurrent = ref(0);

const formStatusOptions = ["info", "success", "danger", "warning"];

const formStatusSubmit = () => {
  formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
    ? formStatusCurrent.value + 1
    : 0;
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
          <SectionTitleLineWithButton :icon="mdiBallotOutline" title="나의 체중과 목표" />

          <UserCard class="mb-6" />

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CardBox>

              <FormField label="사용 목적">
                <FormCheckRadioGroup v-model="form.purpose" name="sample-radio" type="radio"
                  :options="{ 0: '다이어트', 1: '벌크업' }" />
              </FormField>
              <FormField label="나의 활동성향 체크">

                <FormCheckRadioGroup v-model="form.coeff" name="coeff-radio" type="radio"
                  :options="{ 0: '비활동적 : 일상생활에 필요한 최소한의 활동만 함', 1: '저활동적 : 일상활동 + 30~60분 가량의 꾸준한 운동을 함', 2: '활동적 : 일상활동 + 60분 이상의 꾸준한 운동을 함', 3: '매우 활동적 : 일상활동 + 60분 가량의 무난한 운동 + 30~60분의 격한 운동을 함' }" />

              </FormField>
              <!-- <FormField label="식사 횟수">
                        <FormControl v-model="form.num_meals" :options="numberMeals" />
                      </FormField> -->

              <FormField label="마감 날짜" help="최대 한 달 후까지 선택할 수 있습니다.">
                <FormControl v-model="form.d_day" :icon-left="mdiAccount" help="TargetDate"
                  placeholder="목표 날짜 입력 [YYYYMMDD]" type="date" />
              </FormField>

            </CardBox>

            <CardBox>

              <FormField label="현재 몸무게(kg)">
                <FormControl v-model="form.current_weight" :icon-left="mdiAccount" help="CurrentWeight"
                  placeholder="숫자로만 입력" type="number" />
              </FormField>

              <FormField label="목표 몸무게(kg)">
                <FormControl v-model="form.goal_weight" :icon-left="mdiAccount" help="TargetWeight" placeholder="숫자로만 입력"
                  type="number" />
              </FormField>

              <FormField label="최소 섭취 칼로리(kcal)" help="하루 동안 섭취할 최소 열량입니다.">
                <FormControl v-model="form.minimum_kcal" :icon-left="mdiAccount" help="TargetKcal" placeholder="숫자로만 입력"
                  type="number" />
              </FormField>

              <BaseDivider />

              <div class=" w-full flex flex-row justify-center">
                <BaseButton @click="submit" class="w-3/12" type="submit" color="info" label="저장" />
              </div>
            </CardBox>
          </div>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script>
import axios from 'axios';

export default {


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