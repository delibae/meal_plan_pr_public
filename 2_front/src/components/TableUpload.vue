<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "@/stores/main";
import { mdiEye, mdiHelpBoxOutline, mdiTrashCan } from "@mdi/js";
//dependency: CardboxModalCustom.vue / Difference: delete default done/cancel buttons
import CardBoxModal from "@/components/CardBoxModalCustom.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";

defineProps({
  checkable: Boolean,
});

const mainStore = useMainStore();

const items = ref(null);

items.value = [

    {
        "date": "Dec 1, 2021",
        "meal_type": "토스트",
        "meal_amount": "200",
        "meal_cal": "300",        
    },
    {
        "date": "Dec 1, 2021",
        "meal_type": "토스트",
        "meal_amount": "200",
        "meal_cal": "300",        
    },
    {
        "date": "Dec 1, 2021",
        "meal_type": "토스트",
        "meal_amount": "200",
        "meal_cal": "300",        
    },
    {
        "date": "Dec 1, 2021",
        "meal_type": "토스트",
        "meal_amount": "200",
        "meal_cal": "300",        
    },
    {
        "date": "Dec 1, 2021",
        "meal_type": "토스트",
        "meal_amount": "200",
        "meal_cal": "300",        
    },
    {
        "date": "Dec 1, 2021",
        "meal_type": "토스트",
        "meal_amount": "200",
        "meal_cal": "300",        
    },
    {
        "date": "Dec 1, 2021",
        "meal_type": "토스트",
        "meal_amount": "200",
        "meal_cal": "300",        
    },

]

const isModalActive = ref(false);

const isModalDangerActive = ref(false);

//added
const isModalSearch = ref(false);

const isModalUpload = ref(false);

const perPage = ref(5);

const currentPage = ref(0);

const checkedRows = ref([]);

const itemsPaginated = computed(() =>
  items.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => Math.ceil(items.value.length / perPage.value));

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

</script>

<template>
  <div>

    <CardBoxModal v-model="isModalActive" title="Sample modal">
      <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
      <p>This is sample modal</p>
    </CardBoxModal>

    <CardBoxModal
      v-model="isModalDangerActive"
      title="Please confirm"
      button="danger"
      has-cancel
    >
      <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
      <p>This is sample modal</p>
    </CardBoxModal>

    <CardBoxModal v-model="isModalSearch" title="식사 직접 입력">
      <FormField label="무슨 음식을 드셨나요?">
        <FormControl
            type="text"
            placeholder="식사 추가"
          />
      </FormField>
      <FormField label="음식을 얼마나 드셨나요?">
        <FormControl
            type="number"
            placeholder="음식 양 추가"
          />
      </FormField>
      <div>
        <BaseButton class="mx-2"
          label="추가" color="info" @click="null"/>
        <BaseButton class="mx-2"
          label="취소" color="info" outline @click="isModalSearch=false"/>
      </div>
    </CardBoxModal>

    <CardBoxModal v-model="isModalUpload" title="식사 이미지 업로드">

      <FormField label="이미지 업로드" help="하나의 이미지 파일만 추가 가능">
        <FormFilePicker label="파일 추가" />
      </FormField>

      <div>
        <BaseButton class="mx-2"
          label="추가" color="info" @click="null"/>
        <BaseButton class="mx-2"
          label="취소" color="info" outline @click="isModalUpload=false"/>
      </div>
    </CardBoxModal>

  </div>

  <div v-if="checkedRows.length" class="p-3 bg-gray-100/50 dark:bg-slate-800">
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700"
    >
      {{ checkedRow.date }}
    </span>
  </div>

  <!-- 식사 추가 버튼 -->
  <div class=" w-full flex flex-row justify-left">
    <BaseButton class="sm:3-12 md:w-2/12 lg:w-2/12 xl:w-2/12 m-3"
      label="식사 추가" type="submit" color="info" @click="isModalSearch=true"
      />
    <BaseButton class="sm:3-12 md:w-2/12 lg:w-2/12 xl:w-2/12 m-3"
      label="이미지 추가" type="submit" color="info" @click="isModalUpload=true"
      />
  </div>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th/>
        <!-- <th>Date</th> -->
        <th>Meal type</th>
        <th>Amount</th>
        <th>Calories</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in itemsPaginated" :key="client.id">
        <TableCheckboxCell
          v-if="checkable"
          @checked="checked($event, client)"
        />
        <td class = " font-semibold">
          {{ client.date }}
        </td>

        <td data-label="meal_type">
          {{ client.meal_type }}
        </td>

        <td data-label="meal_amount">
          {{ client.meal_amount }}g
        </td>

        <td data-label="meal_cal">
          {{ client.meal_cal }}kcal
        </td>
        
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="info"
              :icon="mdiEye"
              small
              @click="isModalActive = true"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="isModalDangerActive = true"
            />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>