<script setup>
import { mdiCog } from "@mdi/js";
import CardBox from "@/components/CardBox.vue";
import NumberDynamic from "@/components/NumberDynamic.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import PillTagTrend from "@/components/PillTagTrend.vue";
import BaseButton from "@/components/BaseButton.vue";

defineProps({
  number1: {
    type: Number,
    default: 0,
  },
  number2: {
    type: Number,
    default: 0,
  },
  number3: {
    type: Number,
    default: null,
  },
  icon: {
    type: String,
    default: null,
  },
  prefix: {
    type: String,
    default: null,
  },
  suffix1: {
    type: String,
    default: null,
  },
  label1: {
    type: String,
    default: null,
  },
  suffix2: {
    type: String,
    default: null,
  },
  label2: {
    type: String,
    default: null,
  },
  suffix3: {
    type: String,
    default: null,
  },
  label3: {
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
</script>

<template>
  <CardBox class="shadow-md">
    <BaseLevel v-if="trend" class="mb-3" mobile>
      <PillTagTrend :trend="trend" :trend-type="trendType" small />
      <!-- <BaseButton
                        :icon="mdiCog"
                        icon-w="w-4"
                        icon-h="h-4"
                        color="lightDark"
                        small
                      /> -->
    </BaseLevel>
    <BaseLevel mobile>
      <div>
        <ul>
          <li>
            <h3 class="text-base leading-tight text-gray-500 dark:text-slate-400">
              {{ label1 }}
            </h3>
            <h1 class="text-2xl leading-tight font-semibold change">
              <NumberDynamic :value="number1" :prefix="prefix" :suffix="suffix1" />
            </h1>

          </li>
          <li>
            <h3 class="text-base leading-tight text-gray-500 dark:text-slate-400">
              {{ label2 }}
            </h3>
            <h1 class="text-2xl leading-tight font-semibold change">
              <NumberDynamic :value="number2" :prefix="prefix" :suffix="suffix2" />
            </h1>

          </li>
          <li>
            <h3 class="text-base leading-tight text-gray-500 dark:text-slate-400">
              {{ label3 }}
            </h3>
            <h1 class="text-2xl leading-tight font-semibold change">
              <NumberDynamic :value="number3" :prefix="prefix" :suffix="suffix3" />
            </h1>

          </li>
        </ul>
      </div>
      <BaseIcon v-if="icon" :path="icon" size="48" w="" h="h-16" :class="color" />
    </BaseLevel>
  </CardBox>
</template>
<style>
li {
  padding-bottom: 0.4rem;
}

.change {
  padding-right: 10px;
}
</style>
