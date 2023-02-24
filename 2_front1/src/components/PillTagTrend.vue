<script setup>
import { computed } from "vue";
import {
  mdiChevronUp,
  mdiChevronDown,
  mdiAlertCircleOutline,
  mdiDragHorizontalVariant,
  mdiCheckboxBlankCircleOutline,
} from "@mdi/js";
import PillTag from "@/components/PillTag.vue";

const props = defineProps({
  trend: {
    type: String,
    required: true,
  },
  trendType: {
    type: String,
    default: null,
  },
  small: Boolean,
});

const trendStyle = computed(() => {
  if (props.trendType === "up") {
    return {
      icon: mdiChevronUp,
      style: "success",
    };
  }

  if (props.trendType === "down") {
    return {
      icon: mdiChevronDown,
      style: "danger",
    };
  }

  if (props.trendType === "mid") {
    return {
      icon: mdiDragHorizontalVariant,
      style: "warning",
    };
  }

  if (props.trendType === "none") {
    return {
      icon: mdiCheckboxBlankCircleOutline,
      style: "info",
    };
  }

  if (props.trendType === "alert") {
    return {
      icon: mdiAlertCircleOutline,
      style: "warning",
    };
  }
  if (props.trendType === "act") {
    return {
      style: "actlike",
    };
  }

  return {
    style: "info",
  };
});
</script>

<template>
  <PillTag
    :label="trend"
    :color="trendStyle.style"
    :icon="trendStyle.icon"
    :small="small"
  />
</template>
