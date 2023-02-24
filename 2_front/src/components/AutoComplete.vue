<script>
import countries from '../assets/mealdb.json'
import CardBox from "@/components/CardBox.vue";
import { ref, computed } from 'vue'
export default {
  methods: {
    emitMeal(sel) {
      this.$emit('update-meal', sel)
      console.log('EMIT 식사명 성공>>', sel)
    }
  },
  setup() {
    //modal: 클릭 시 없어지도록
    let modal = ref(false);
    //searchTerm: 사용자 입력값
    let searchTerm = ref(null);
    //한글입력 지연 방지
    function upInput(e) {
      searchTerm.value = e.target.value
    }
    //초기값: null
    const searchCountries = computed(() => {
      //입력값 null 또는 modal=false시 자동완성 창 없앰
      if (searchTerm.value === '' || !modal.value) {
        return []
      }
      let matches = 0
      //추천 음식 필터링
      return countries.filter(country => {
        if (country.name.includes(searchTerm.value) && matches < 10) {
          matches++
          return country
        }
      })
    });
    const selectCountry = (country) => {
      selectedCountry.value = country; //선택된 값
      searchTerm.value = country; //입력된 값
      modal.value = false;
      // console.log('선택값>> ', selectedCountry.value)
    };
    let selectedCountry = ref(null);
    return {
      countries,
      searchTerm,
      searchCountries,
      selectCountry,
      selectedCountry,
      upInput,
      modal,
    }
  }
};
</script>

<template>
  <div class="max-w-none relative space-y-3 ">

    <label for="search" class="text-gray-900 font-bold">음식명을 입력해주세요</label><br>
    <!-- 클릭 시 창을 띄우고 싶으면: input 태그 안에 @focus="modal = true" 또는 @click=(동일)-->
    <input type="text" id="search" :value="searchTerm" @input="upInput" @focus="modal = true" placeholder="음식명 자동완성..."
      autocomplete="off" class="p-3 mb-0.5 w-full border border-gray-300 rounded">
    <span class="font-semibold; hidden">선택: {{ selectedCountry }}</span><br>

    <ul v-if="searchCountries.length && modal"
      class="w-full rounded bg-white border border-gray-300 px-4 py-2 space-y-1 absolute z-10">
      <li class="px-1 pt-1 pb-2 font-bold border-b border-gray-200">
        {{ searchCountries.length }} of {{ countries.length }} results
      </li>
      <li v-for="country in searchCountries" :key="country.name"
        @click="selectCountry(country.name); emitMeal(country.name)" class="cursor-pointer hover:bg-gray-100 p-1">
        {{ country.name }}
      </li>
    </ul>
    <p v-if="selectedCountry" class="text-lg pt-2 absolute"></p>
  </div>
</template>