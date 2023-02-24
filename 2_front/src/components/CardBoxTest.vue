<script setup>
import { mdiCog, mdiReload, mdiTransferUp } from "@mdi/js";
import CardBox from "@/components/CardBox.vue";
import NumberDynamic from "@/components/NumberDynamic.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import PillTagTrend from "@/components/PillTagTrend.vue";
import BaseButton from "@/components/BaseButton.vue";
import { computed, ref } from "vue";
import { useMainStore } from "@/stores/main";
import { mdiEye, mdiTrashCan, mdiBookEdit } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModalCustom.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import TableSam2 from "@/components/TableSam2.vue";


import { main_url, port } from "../config";

defineProps({
  number: {
    type: Number,
    default: 0,
  },
  icon: {
    type: String,
    default: null,
  },
  prefix: {
    type: String,
    default: null,
  },
  suffix: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: null,
  },
  trend: {
    type: String,
    default: null,
  },
  trendType: {
    type: String,
    default: null,
  },
});

var current_data;

var emit_function_del = function (idx) {
  current_data = idx;
  console.log("여기", idx["food_name"]);
  document.getElementById("recommended_meal").value = idx["food_name"];
};

var emit_function_add = async function () {
  //여기가 음식 등록하는 곳
  var recom_food = document.getElementById("recommended_meal").value;
  var recom_amount = document.getElementById("recommended_meal_amount").value;
  if (recom_amount === '' || recom_amount < 0) {
    alert("음식 양(g)을 다시한 번 확인해주시기 바랍니다.");
    return
  }
  if (confirm("등록하시겠습니까?") == false) {
    return;
  }
  console.log("id = ", user_id);



  var url = main_url + ":" + port + "/api/insertFood";
  var frm = new FormData();

  frm.append("user_id", user_id);
  frm.append("food_name", recom_food);
  frm.append("date", now);
  frm.append("gram", recom_amount);

  try {
    var response = await axios.post(url, frm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    console.log("response >> ", response);
  } catch (err) {
    console.log("Error >>", err);
  }


  if (response['data'] == "0") {
    alert("찾는 음식이 존재하지 않습니다.");
    return;
  } else {
    alert("등록이 완료되었습니다.");
    location.reload();
  }
};

const isModalAdd = ref(false);
</script>

<template>
  <div class="scroll">
    <CardBoxModal v-model="isModalAdd" title="식사 직접 입력">
      <FormField label="음식이름">
        <input type="text" style="width: 100%" id="recommended_meal" disabled />
      </FormField>

      <FormField label="음식을 얼마나 드셨나요?">
        <FormControl type="number" id="recommended_meal_amount" placeholder="음식 양 추가" />
      </FormField>

      <div>
        <BaseButton class="mx-2" label="추가" color="info"
          @click="
            emit_function_add();
          isModalAdd = false;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        " />
        <BaseButton class="mx-2" label="취소" color="info" outline @click="isModalAdd = false" />
      </div>
    </CardBoxModal>
    <div v-for="i in food_set" :key="i">
      <CardBox
        class=" shadow-2xl ma transition ease-in-out hover:-translate-y-1 hover:scale-104 hover:bg-amber-100 duration-300 dark:hover:bg-slate-600"
        @click="
          emit_function_del(i);
        isModalAdd = true;">
        <BaseLevel v-if="trend" class="mb-3" mobile>
          <PillTagTrend :trend="trend" :trend-type="trendType" small />
        </BaseLevel>
        <BaseLevel mobile>
          <div>
            <h1 class="text_length text-3xl leading-tight text-rose-400 dark:text-[#eff9cc] font-semibold">
              {{ i.food_name }}
            </h1>
            <div class="jb-division-line"></div>
            <h6 class="leading-tight font-semibold">
              <ul>
                <br />
                <li class="text-slate-700 dark:text-slate-50">
                  탄수화물 : {{ i.carbo }}g
                </li>
                <li class="text-slate-500 dark:text-slate-300">
                  단백질 : {{ i.protein }}g
                </li>
                <li class="text-slate-700 dark:text-slate-50">
                  지방 : {{ i.fat }}g
                </li>
                <li class="text-slate-500 dark:text-slate-300">
                  칼로리 : {{ i.kcal }}kcal
                </li>
                <li class="text-slate-700 dark:text-slate-50">
                  무게 : {{ i.gram }}g
                </li>
                <br />
              </ul>
            </h6>
          </div>
        </BaseLevel>

      </CardBox>
    </div>
  </div>
</template>

<script>
var user_id;
var food_set = [];
function Today() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

let now = Today();



const insert_food_set = function (food_name, carbo, protein, fat, kcal, gram) {
  food_set.push(
    //이 부분에 원하는 정보 다 넣어주면 됨
    {
      food_name: food_name,
      carbo: Math.round(carbo * gram),
      protein: Math.round(protein * gram),
      fat: Math.round(fat * gram),
      kcal: Math.round(kcal * gram),
      gram: Math.round(gram),
    }
  );
};

// 삽입할거 user_id, gender, age 
async function get_recommend_food() {

  // 식단 추천 음식들을 '받아올' 함수 -> recommend_food_list에 음식들을 넣어줘야함
  try {
    var response = await axios.get("http://3.112.204.166:30004/api/reco", {
      params: {
        user_id: 'test1',
        gender: 'm',
        age: '23',
      },
    });

  } catch (err) {


  }
  console.log("정신나감", response);
  await insert_recommend_food(response.data['result']); // await 안쓰면 중간에 끝남
}
import axios from "axios";

// 식단추천받은 음식들을 이 곳에 넣어줄 것임




//이 부분 나중에 데이터 정보 갖고와서 for문 돌리면됨
const insert_recommend_food = async (food_list) => {
  var gram = 300; // 인위적으로 300g이라고 가정
  for (let i = 0; i < food_list.length; i++) {
    var frm = new FormData();

    frm.append("food", food_list[i]);

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

      console.log("여기요", response2.data["kcal"]);
      insert_food_set(
        food_list[i],
        response2.data["carbo"],
        response2.data["protein"],
        response2.data["fat"],
        response2.data["kcal"],
        gram
      );
    } catch (err) {
      console.log("Error >>", err);
    }
  }
};
get_recommend_food()
var to_get_user_id;
var to_get_gender;
var to_get_age;
var temp_id;
export default {
  beforeMount() {
    var url = main_url + ":" + port + "/api/session";
    axios
      .get(url, { withCredentials: true })
      .then(function (response) {
        // 성공 핸들링

        temp_id = response["data"][user_id];

        console.log("response['data']", temp_id)
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
        console.log("거의다옴", response.data[0].user_id);
        var user_name = response.data[0].user_name;
        user_id = response.data[0].user_id;
        var to_get_user_id = response.data[0].user_name;
        var to_get_gender = response.data[0].gender;
        var to_get_age = response.data[0].age;
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

<style scoped>
li {
  padding: 0.1rem;
}

.ma {
  width: 250px;
  margin: 0.4rem 0.4rem 1.2rem 0.4rem;
}

.jb-division-line {
  border-top: 1px solid #d4d0d0;
  margin: 10px 0px;
}

.scroll {
  grid-template-columns: repeat(20, 1fr);
  white-space: nowrap;
  overflow-x: scroll;
}

.scroll::-webkit-scrollbar {
  width: 10px;
}

.scroll::-webkit-scrollbar-thumb {
  background-color: rgb(192, 198, 209);
  border-radius: 10px;
}

.scroll::-webkit-scrollbar-track {
  background-color: rgb(225, 232, 253);
  border-radius: 10px;
  box-shadow: inset 0px 0px 5px white;
}

.text_length {
  width: 200px;
  height: 50px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
}
</style>