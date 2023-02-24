<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "@/stores/main";
import { mdiEye, mdiTrashCan, mdiBookEdit, mdiConeOff } from "@mdi/js";
// import CardBoxModal from "@/components/CardBoxModal.vue";
import CardBoxModal from "@/components/CardBoxModalCustom.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import AutoComplete from "@/components/AutoComplete.vue";
import { main_url, port } from "../config";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import axios from "axios";

const props = defineProps({
  checkable: Boolean,
  lineData: Array,
  perday_nutrient: Object,
  today_sum: Object
});
var user_id;

function Today() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

let now = Today(); // '오늘날짜'로시간 바꿔야됨 -> 나중엔 빈칸


var calculate_flag = 0;       // 식사계산기 이용여부 알리는 flag
const get_gram_per_food = async (foods, ratios, kcal) => {
  console.log("다찍어보자씹라", foods, ratios, kcal);
  for (var i = 0; i < foods.length; i++) {

    if (foods[i] == '' || ratios[i] == '') {


      while (mealCalcData.value.length > 0) {
        calc_del();
        console.log("길이", mealCalcData.value.length);
      }
      calculate_flag = 0;
      alert("음식명이나 비율을 다시한 번 확인해주시기 바랍니다.");
      return;
    }
    ratios[i] = parseInt(ratios[i]);

  }
  if (kcal == '') {
    calculate_flag = 0;

    alert("할당할 칼로리를 입력하지 않으셨습니다.");
    return;
  } else {
    var per_kcals = [];
    for (let i = 0; i < foods.length; i++) {
      var frm = new FormData();
      frm.append("food", foods[i]);

      try {
        var response2 = await axios.post(
          main_url + ":" + port + "/api/getFoodKcal",
          frm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        per_kcals.push(response2.data["kcal"]);
      } catch (err) {
        console.log("Error >>", err);
      }
    }

    const ratio_sum = ratios.reduce(function add(sum, currValue) {
      return sum + currValue;
    }, 0);
    const result = [];
    for (var i = 0; i < foods.length; i++) {
      var foodweight = (kcal * ratios[i]) / (ratio_sum * per_kcals[i]);
      foodweight = parseInt(foodweight);
      console.log("gram", foodweight);
      result.push([foods[i], foodweight]);
      mealCalcData.value[i]['allocated_gram'] = foodweight;
    }



    var message = "-------------------------\n계산 결과\n-------------------------\n";

    for (var i = 0; i < result.length; i++) {
      console.log("제발돼라", result[i]);
      message += result[i][0] + " : " + result[i][1] + "g";
      message += '\n';
    }
    if (foods.length == 0) {
      calculate_flag = 0
      alert("아무런 음식도 입력하지 않으셨습니다.");
      return;
    } else {
      // message += "\n위와같이 음식을 드신다면 원하시는 (" + kcal + "kcal)만큼의 열량을 소비하실 수 있습니다.";
      // alert(message);
    }
    calculate_flag = 1;
    alert("계산이 완료되었습니다.\n아래의 전체 등록하기 버튼을 눌러주세요!");
    return "success"; //버그 없이 계산 끝났다는 신호
  }
};


const mainStore = useMainStore();
const isModalActive = ref(false);
const isModalDangerActive = ref(false);
const isModalAdd = ref(false);
const isModalUpload = ref(false);
const isModalCalc = ref(false);
const perPage = ref(5);
const currentPage = ref(0);
const checkedRows = ref([]);
const itemsPaginated = computed(() =>
  props.lineData.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);
const numPages = computed(() =>
  Math.round((props.lineData.length + 2) / perPage.value)
);
const currentPageHuman = computed(() => currentPage.value + 1);
const pagesList = computed(() => {
  const pagesList = [];
  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }
  return pagesList;
});
const remove = (arr, cb) => {
  const newArr = [];
  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item);
    }
  });
  return newArr;
};
const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client);
  } else {
    checkedRows.value = remove(
      checkedRows.value,
      (row) => row.id === client.id
    );
  }
};
const emit = defineEmits(["push_data", "pop_data", "img_data"]);
var emit_function_add = function () {

  if (selected_food === undefined || document.getElementById('mealamount').value === '' || document.getElementById('mealamount').value < 0) {
    alert("음식명 혹은 음식양(g)이 올바르게 기입되었는지 확인해주세요");
    return
  } else {
    if (confirm("등록하시겠습니까?") == true) {


      var data = {
        date: now,
        // meal_type: document.getElementById("mealtype").value,
        meal_type: selected_food,
        meal_amount: document.getElementById("mealamount").value,
        meal_cal: "",
        meal_carbo: "",
        meal_protein: "",
        meal_fat: "",

      };
      emit("push_data", data);


    } else {
      return;
    }
  }


};
var emit_function_del = function (idx) {
  var del_idx = idx;
  console.log("Delete_emit>>", idx);
  emit("pop_data", del_idx);
  alert("삭제가 완료되었습니다.");
};

//칼로리 계산 돌릴 목록
const mealCalcData = ref(null);
mealCalcData.value = [

];



//칼로리 계산 추가하는 식
var calc_add = function () {
  console.log("추가한음식 :", selected_food);
  console.log("추가한비율 :", document.getElementById("mealratio").value);
  if (selected_food === undefined || document.getElementById("mealratio").value == "" || document.getElementById("mealratio").value <= 0) {
    alert("음식명과 비율을 다시한번 확인해주시기바랍니다.");
  } else {

    var mealcalc_data = {
      name: selected_food,
      ratio: document.getElementById("mealratio").value
    };
    // console.log("추가 전 목록>>", mealCalcData.value)
    // console.log("신규추가 정보>>", mealcalc_data)
    mealCalcData.value.unshift(mealcalc_data)
    // console.log("추가 후 목록>>", mealCalcData.value)
    document.getElementById("mealratio").value = null;
  }

};
var calc_del = function () {
  // console.log("삭제 전 목록>>", mealCalcData.value)
  mealCalcData.value.shift()
  // console.log("삭제 후 목록>>", mealCalcData.value)
};
var calc_delrow = function (idx) {
  var delrow = mealCalcData.value[idx]
  mealCalcData.value.splice(idx, 1)
  console.log("특정 음식 삭제>>", idx + "번째", delrow)
  calculate_flag = 0;
}

function calculate_food_ratio() {
  var to_calculate_food_list = [];
  var to_calculate_ratio_list = [];
  for (let i = 0; i < mealCalcData.value.length; i++) {
    var food_name = mealCalcData.value[i]['name'];
    var ratio = mealCalcData.value[i]['ratio'];
    to_calculate_food_list.push(food_name);
    to_calculate_ratio_list.push(ratio);
  }
  var alloc_kcal = document.getElementById("alloc_kcal").value;



  var result = get_gram_per_food(to_calculate_food_list, to_calculate_ratio_list, alloc_kcal).then((result) => {
    console.log("result", result);
  })
  // if (result == "success") {
  //   calculate_flag = 1;
  // }
  console.log("플래그1", calculate_flag);


}
function destroy() {

  while (ai_return_Data.value.length > 0) {
    ai_return_Data.value.shift()
  }
}
String.prototype.format = function () {
  var formatted = this;
  for (var arg in arguments) {
    formatted = formatted.replace("{" + arg + "}", arguments[arg]);
  }
  return formatted;
};
function gram_upload(idx, food_name) {

  var a = (prompt(food_name + "의 양(g)을 입력해주세요 (양의정수만 입력가능)"));
  if (a === null) {
    return;
  }
  console.log("버그계산", a);
  var b = parseInt(a);
  console.log(typeof (a));
  console.log((a - b) != 0);
  while (((a - b) != 0) || b <= 0) {
    var a = (prompt(food_name + "의 양(g)을 입력해주세요 (양의정수만 입력가능)"));
    var b = parseInt(a);
    if (a === null) {
      return;
    }
  }
  // while (Number.isInteger(a) === false) {
  //   a = prompt(food_name + "의 양(g)을 입력해주세요");
  //   console.log(a);
  // }

  for (var i = 0; i < ai_return_Data.value.length; i++) {
    if (ai_return_Data.value[i]['index'] == idx) {
      ai_return_Data.value[i]['gram'] = a;
    }
  }

}

async function insert_food_ai(idx, food_name, gram) {

  if (gram <= 0) {
    alert("등록하기 전, 해당 음식의 양(g)을 입력해주세요");
    return
  }
  if (confirm("해당 음식을 등록하시겠습니까?") == true) {

    try {
      var response = await axios.get(main_url + ":" + port + "/api/profile", {
        withCredentials: true,
      });


      user_id = response.data[0]["user_id"];

    } catch (err) {
      console.log("Error >>", err);
    }

    var url = main_url + ":" + port + "/api/insertFood";
    var frm = new FormData();
    console.log("아씨발", user_id);
    frm.append("user_id", response.data[0]["user_id"]);
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

    } catch (err) {
      console.log("Error >>", err);
    }
    console.log("씨발 마지막", response);
    if (response['data'] == "0") {
      alert("찾는 음식이 존재하지 않습니다.");
      return;
    } else {


      //===등록 이후 실행되어야 하는 부분 start=== //
      for (var i = 0; i < ai_return_Data.value.length; i++) {
        if (ai_return_Data.value[i]['index'] == idx) {
          console.log("idxidx", idx);
          await ai_return_Data.value.splice(i, 1);
        }
      }

      alert("등록이 완료되었습니다.");
      console.log("남은 음식 개수", ai_return_Data.value.length);

    }
    //===등록 이후 실행되어야 하는 부분 end=== //
  } else {

    return
  }





  console.log("insert_food_ai", idx, food_name, gram);
}



var test = async function () {

  if (calculate_flag == 0) {
    alert("초록색 계산버튼을 먼저 눌러주세요!");
  } else {
    if (confirm("해당 음식을 등록하시겠습니까?") == true) {
      console.log("등록하러가기");
      try {
        var response = await axios.get(main_url + ":" + port + "/api/profile", {
          withCredentials: true,
        });

        user_id = response.data[0]["user_id"];
        lineData.value = [];
      } catch (err) {
        console.log("Error >>", err);
      }


      for (var i = 0; i < mealCalcData.value.length; i++) {
        var food_name = mealCalcData.value[i]['name'];
        var gram = mealCalcData.value[i]['allocated_gram'];
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

        } catch (err) {
          console.log("Error >>", err);
        }
        console.log("씨발 마지막", response);
        if (response['data'] == "0") {
          alert(food_name + " 데이터에 존재하지 않습니다.");
          return;
        }
      }



      var cnt = mealCalcData.value.length;

      //===등록 이후 실행되어야 하는 부분 start=== //
      while (mealCalcData.value.length > 0) {
        calc_del();
        console.log("길이", mealCalcData.value.length);
      }

      alert(cnt + "개의 음식이 등록되었습니다.");
      calculate_flag = 0;
      location.reload();
      //===등록 이후 실행되어야 하는 부분 end=== //
    } else {
      calculate_flag = 0;
      return
    }


  }
}
function temp2(idx) {
  if (confirm("삭제하시겠습니까?") == true) {
    emit_function_del(idx);
  } else {
    return;
  }
}
function cancel() {

  location.reload();
  alert("취소되었습니다.");
}
function reset() {
  var temp = ai_return_Data.value.length;
  location.reload();
  alert(first_food_count - temp + "개의 음식이 적용되었습니다.");
}
const componentClass = computed(() => {
  const base = [
    "inline-flex",
    "justify-center",
    "items-center",
    "whitespace-nowrap",
    "focus:outline-none",
    "transition-colors",
    "focus:ring",
    "duration-150",
    "border",
    props.disabled ? "cursor-not-allowed" : "cursor-pointer",
    props.roundedFull ? "rounded-full" : "rounded",
    getButtonColor(props.color, props.outline, !props.disabled, props.active),
  ];

  if (!props.label && props.icon) {
    base.push("p-1");
  } else if (props.small) {
    base.push("text-sm", props.roundedFull ? "px-3 py-1" : "p-1");
  } else {
    base.push("py-2", props.roundedFull ? "px-6" : "px-3");
  }

  if (props.disabled) {
    base.push(props.outline ? "opacity-50" : "opacity-70");
  }

  return base;
});
</script>
<style>
.test_btn1 {
  margin-right: -4px;
}

.test_btn2 {
  margin-left: -3px;
}

.btn_group button {
  border: 1px solid skyblue;
  background-color: rgba(0, 0, 0, 0);
  color: skyblue;
  padding: 5px;
}
</style>

<template>
  <div>

    <CardBoxModal v-model="isModalAdd" title="식사 직접 입력">
      <AutoComplete v-on:update-meal="handleMealSelected" />
      <br>
      <FormField label="음식을 얼마나 드셨나요?">
        <FormControl type="number" id="mealamount" placeholder="음식 양 추가" />
      </FormField>

      <div>
        <BaseButton class="mx-2" label="추가" color="info" @click="emit_function_add(); isModalAdd = false" />
        <BaseButton class="mx-2" label="취소" color="info" outline @click="isModalAdd = false" />
      </div>
    </CardBoxModal>

    <CardBoxModal v-model="isModalUpload" title="식사 이미지 업로드">

      <FormField label="이미지 업로드" help="음식등록을 하신 후, 적용하기를 눌러주세요">
        <!-- <FormFilePicker label="파일 추가" @click="test" /> -->
        <div v-if="images" class="w-full h-full flex items-center">
          <img :src="images" alt="image">
        </div>
        <div v-else class="w-full h-full flex items-center justify-center cursor-pointer hover:bg-pink-100"
          @click="clickInputTag()">
          <input ref="image" id="input" type="file" name="image" accept="image/*" multiple="multiple" class="hidden"
            @change="uploadImage()">
          <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <!-- 바운딩 박스 -->

        <!-- <img src="" class="uploadImage"> -->
        <div v-if="!loading_img">
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
        <canvas id="myCanvas" width="350" height="350">

        </canvas>
        <div v-if="loading_img">
          <table class="table-fixed">
            <thead>
              <tr class=" font-bold text-blue-400">
                <td style="width:57px; ">번호</td>
                <td style="width:150px; ">음식명</td>
                <td style="width:80px; ">gram</td>
                <td style="width:80px; ">입력(g)</td>
                <td style="width:80px; ">등록</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for=" each in ai_return_Data" :key="each.id">
                <td data-label="번호">{{ each.index }}</td>
                <td data-label="음식명">{{ each.name }}</td>
                <td data-label="그램">{{ each.gram }}g</td>

                <td data-label="그램입력">
                  <BaseButton color="info" label="입력" style="padding:5px" @click="gram_upload(each.index, each.name); " />
                </td>
                <td data-label="음식 등록">
                  <BaseButton color="info" label="등록" style="padding:5px"
                    @click="insert_food_ai(each.index, each.name, each.gram); " />
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <BaseButton class="m-2" label="적용하기" color="info" @click="reset()" />
            <BaseButton class="m-2" label="취소" color="danger" @click="cancel()" />
          </div>
        </div>
      </FormField>

    </CardBoxModal>
    <CardBoxModal v-model="isModalCalc" title="식사 계산기">
      <CardBox>
        <AutoComplete v-on:update-meal="handleMealSelected" />
        <FormField label="비율 선택">
          <FormControl type="number" id="mealratio" placeholder="숫자를 입력하세요" />
        </FormField>
        <BaseButton class="mx-2" label="추가" color="info" @click="calc_add()" />
        <BaseButton class="mx-2" label="취소" color="danger" @click="isModalCalc = false" />
      </CardBox>
      <CardBox class="please sc2">
        <p><b>식사 계산기 음식 목록</b></p>
        <div id="ratio-table">
          <span>
            <table id="tabledata" border="1" cellpadding="2">
              <thead>
                <tr class="font-bold text-blue-400">

                  <td class="table_">음식</td>
                  <td class="table_">비율</td>
                  <td class="table_">계산양(g)</td>
                  <td>삭제</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for=" each, idx in mealCalcData" :key="each.id">
                  <td data-label="음식">{{ each.name }}</td>
                  <td data-label="비율" class="table_">{{ each.ratio }}</td>
                  <td data-label="계산양(g)" class="table_">{{ each.allocated_gram }}g</td>
                  <td class="before:hidden lg:w-1 whitespace-nowrap">
                    <BaseButtons type="justify-start lg:justify-end" no-wrap>
                      <BaseButton color="danger" :icon="mdiTrashCan" small @click="calc_delrow(idx)" />
                    </BaseButtons>
                  </td>
                </tr>
              </tbody>
            </table>
          </span>
        </div>
      </CardBox>
      <CardBox>
        <FormField label="할당할 kcal를 설정해주세요">
          <FormControl type="number" id="alloc_kcal" placeholder="숫자를 입력하세요" />
        </FormField>
        <div>
          <!-- <BaseButton class="mx-2" label="취소" color="info" outline @click="isModalCalc = false" /> -->
          <!-- <BaseButton class="mx-2" label="삭제" color="info" @click="calc_del()" /> -->
          <BaseButton class="mx-2" label="계산" color="success" @click="calculate_food_ratio()" />
        </div>
      </CardBox>
      <br />
      <div style="text-align: center">
        <BaseButton class="mx-2" label="전체 등록하기" color="info" @click="test(); " />
      </div>
    </CardBoxModal>
    <div class="w-full flex-col justify-left">
      <BaseButton class="sm:w-2/12 md:w-2/12 lg:w-2/12 xl:w-2/12 m-2" label="식사 추가" type="submit" color="actlike"
        @click="isModalAdd = true" />
      <BaseButton class="sm:w-3/12 md:w-3/12 lg:w-2/12 xl:w-2/12 m-2" label="이미지로 자동 분류" type="submit" color="actlike"
        @click="isModalUpload = true" />
      <BaseButton class="sm:w-2/12 md:w-2/12 lg:w-2/12 xl:w-2/12 m-2" label="식사 계산" type="submit" color="actlike"
        @click="isModalCalc = true" />
    </div>
    <div v-if="checkedRows.length" class="p-3 bg-gray-100/50 dark:bg-slate-800">
      <span v-for="checkedRow in checkedRows" :key="checkedRow.id"
        class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700">
        {{ checkedRow.date }}
      </span>
    </div>
    <table class="table-fixed">
      <thead>
        <tr>
          <th style="width:150px; "></th>
          <!-- <th>Date</th> -->
          <th style="width:200px; ">음식 이름</th>
          <th style="width:90px; ">식사량</th>
          <th style="width:130px; ">칼로리</th>
          <th style="width:120px; ">탄수화물</th>
          <th style="width:120px; ">단백질</th>
          <th style="width:120px; ">지방</th>
          <th style="width:50px; "></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(client, idx) in itemsPaginated" :key="client.id">
          <td>{{ String(client.date).slice(0, 15) }}</td>
          <td data-label="음식 이름" class="font-semibold">{{ client.meal_type }}</td>
          <td data-label="식사량">{{ client.meal_amount }}g</td>
          <td data-label="칼로리">{{ client.meal_cal }}kcal ({{ Math.round((client.meal_cal / props.today_sum['today_cal']) *
            100) }}%)
          </td>
          <td data-label="탄수화물">{{ client.meal_carbo }}g ({{ Math.round((client.meal_carbo /
            props.perday_nutrient['carbo']) * 100)
          }}%)</td>
          <td data-label="단백질">{{ client.meal_protein }}g ({{ Math.round((client.meal_protein /
            props.perday_nutrient['protein']) *
            100) }}%)</td>
          <td data-label="지방">{{ client.meal_fat }}g ({{ Math.round((client.meal_fat / props.perday_nutrient['fat']) *
            100) }}%)</td>
          <td class="before:hidden lg:w-1 whitespace-nowrap">
            <BaseButtons type="justify-start lg:justify-end" no-wrap>
              <!-- <BaseButton color="info" :icon="mdiBookEdit" small @click="isModalEdit = true" /> -->
              <BaseButton color="danger" :icon="mdiTrashCan" small @click="temp2(idx)" />
            </BaseButtons>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
      <BaseLevel>
        <BaseButtons>
          <BaseButton v-for="page in pagesList" :key="page" :active="page === currentPage" :label="page + 1"
            :color="page === currentPage ? 'lightDark' : 'whiteDark'" small @click="currentPage = page" />
        </BaseButtons>
        <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
      </BaseLevel>
    </div>
  </div>
</template>

<script>
const loading_img = ref(null);
loading_img.value = true;
var idx = 1;
var selected_food;
var first_food_count;
//음식사진 올린 후 return받을 목록
const ai_return_Data = ref(null);
ai_return_Data.value = [
];
export default {
  components: {
    AutoComplete
  },
  data: () => ({
    images: ''
  }),
  methods: {
    handleMealSelected(meal) {
      console.log("GET 식사명 성공>> ", meal)
      selected_food = meal;
      //음식 이름을 autocomplete에서 tablesam2로 가져오는지 확인
    },
    uploadImage: async function () {
      let form = new FormData()
      let image = this.$refs['image'].files[0]

      form.append('image', image);

      loading_img.value = false;

      const file = URL.createObjectURL(image);
      // document.querySelector(".uploadImage").src = file;


      let canvas = document.querySelector("#myCanvas");

      let context = canvas.getContext("2d");



      const kimImg = new Image();
      //이미지 로딩을 시작한다.
      kimImg.src = file;
      //로딩이 완료되면 실행할 함수 등록

      var colors = ['green', 'red', 'blue', 'brown', 'yellow', 'black', 'purple']

      var response = await axios.post('http://3.112.204.166:30003/v1/object-detection/yolov5s', form, {
        header: { 'Content-Type': 'multipart/form-data' }
      }
      )

      context.drawImage(kimImg, 0, 0, 350, 350);

      {
        console.log("가로", kimImg.width);
        console.log("세로", kimImg.height);
      }
      var into = 0;
      //  원하는 사이즈 / 원본
      if (response.data.length == 0) {
        alert("아무런 음식도 인식하지 못하였습니다. 보다 선명하게 찍어주세요");
        loading_img.value = true;
        return;
      }
      for (let i = 0; i < response.data.length; i++) {

        var xmin = response.data[i]['xmin']
        var xmax = response.data[i]['xmax']
        var ymin = response.data[i]['ymin']
        var ymax = response.data[i]['ymax']
        console.log("xmin", response.data[i]['xmin'])
        console.log("ymin", response.data[i]['ymin'])
        console.log("xmax", response.data[i]['xmax'])
        console.log("ymax", response.data[i]['ymax'])
        if (into == 7) {
          into = 0;
        }
        context.strokeStyle = colors[into];
        into += 1;
        context.strokeRect(response.data[i]['xmin'] * (350 / kimImg.width), response.data[i]['ymin'] * (350 / kimImg.height), (response.data[i]['xmax'] - response.data[i]['xmin']) * (350 / kimImg.width), (response.data[i]['ymax'] - response.data[i]['ymin']) * (350 / kimImg.height))

      }




      for (let i = 0; i < response.data.length; i++) {

        ai_return_Data.value.push({ 'name': response.data[i]['name'], 'index': idx, 'gram': 0 });

        idx += 1;
      }

      first_food_count = ai_return_Data.value.length;
      loading_img.value = true;
    },
    clickInputTag: function () {
      this.$refs['image'].click()
    }
  }
}
</script>
<style >
th {
  border-bottom: 1.2px solid rgb(139, 134, 134);
  text-align: center;
}

thead {
  border-bottom: 1.2px solid rgb(139, 134, 134);
}

td {
  text-align: center;
}

.table_ {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
}
</style>