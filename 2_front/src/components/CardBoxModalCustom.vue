<script setup>
import { computed } from "vue";
import { mdiClose } from "@mdi/js";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import CardBox from "@/components/CardBox.vue";
import OverlayLayer from "@/components/OverlayLayer.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  button: {
    type: String,
    default: "info",
  },
  buttonLabel: {
    type: String,
    default: "Done",
  },
  hasCancel: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
});

const emit = defineEmits(["update:modelValue", "cancel", "confirm"]);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const confirmCancel = (mode) => {
  value.value = false;
  emit(mode);
};

const confirm = () => confirmCancel("confirm");

const cancel = () => confirmCancel("cancel");

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && value.value) {
    cancel();
  }
});
</script>

<template>
  <OverlayLayer v-show="value" @overlay-click="cancel">
    <CardBox v-show="value" class="shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 xl:w-4/12 z-50 scroll" is-modal>
      <CardBoxComponentTitle :title="title">
        <BaseButton v-if="hasCancel" :icon="mdiClose" color="whiteDark" small rounded-full @click.prevent="cancel" />
      </CardBoxComponentTitle>

      <div class="space-y-3">
        <slot />
      </div>

      <!-- <template #footer>
              <BaseButtons>
                <BaseButton :label="buttonLabel" :color="button" @click="confirm" />
                <BaseButton v-if="hasCancel" label="Cancel" :color="button" outline @click="cancel" />
              </BaseButtons>
            </template> -->
    </CardBox>
  </OverlayLayer>
</template>

<style scoped>
.scroll {
  grid-template-columns: repeat(20, 1fr);
  /* white-space: nowrap; */
  /* overflow-y: scroll*/
  overflow: auto;
}

.scroll::-webkit-scrollbar {
  width: 15px;
  height: 15px;
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
</style>