<script setup>
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="greenBlue">
      <CardBox :class="cardClass">
        <div class="space-y-3">
          <h1 class="text-2xl" style="text-align: center">눈 깜짝할 사이</h1>
          <LoadingSpinner style="text-align: center" />

          <p style="text-align: center">Loading...</p>
        </div>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>

<script>
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default {
  components: { LoadingSpinner },
};
</script>
