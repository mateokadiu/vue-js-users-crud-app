<template>
  <div @change="onChange" class="fake">{{ currPos }}</div>
</template>

<script>
import { useGeolocation } from "@/useGeolocation";
import { computed } from "@vue/runtime-core";

export default {
  data() {
    return {
      location: false,
    };
  },

  updated() {
    this.onUpdate();
  },

  setup() {
    const { coords } = useGeolocation();

    const currPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude,
    }));

    return { currPos };
  },
  methods: {
    onUpdate() {
      setTimeout(() => {
        this.$emit("updated", this.currPos);
      }, 500);
    },
  },
};
</script>

<style>
.fake {
  color: transparent;
}
</style>
