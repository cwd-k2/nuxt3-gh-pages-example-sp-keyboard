<script setup lang="ts">
import { ref } from "vue";

type Direction = "up" | "down" | "left" | "right" | "none";

const props = defineProps<{ chars: string[] }>();
defineEmits<{
  (e: "input", value: string): void;
}>();

const x0 = ref<number>(0);
const y0 = ref<number>(0);
const x1 = ref<number>(0);
const y1 = ref<number>(0);

const active = ref<boolean>(false);

const flickDirection = computed<Direction>(() => {
  const dx = x1.value - x0.value;
  const dy = y0.value - y1.value; // document 上では y 軸鉛直下向きが正

  const a = (Math.atan2(dy, dx) * 180) / Math.PI;
  const d = Math.sqrt(dx * dx + dy * dy);

  if (d < 20) {
    return "none";
  } else if (135 <= a || a <= -135) {
    return "left";
  } else if (45 <= a) {
    return "up";
  } else if (-45 <= a) {
    return "right";
  } else {
    return "down";
  }
});

const display = computed<string>(() => {
  switch (flickDirection.value) {
    case "left":
      return props.chars[1];
    case "up":
      return props.chars[2];
    case "right":
      return props.chars[3];
    case "down":
      return props.chars[4];
    default:
      return props.chars[0];
  }
});
</script>

<template>
  <div>
    <p
      class="sp-key"
      :class="{
        active,
        'to-left': flickDirection === 'left',
        'to-up': flickDirection === 'up',
        'to-right': flickDirection === 'right',
        'to-down': flickDirection === 'down',
      }"
      @touchstart="
        e => {
          active = true;
          x0 = x1 = e.touches[0].pageX;
          y0 = y1 = e.touches[0].pageY;
        }
      "
      @touchmove="
        e => {
          e.preventDefault(); // スクロール防止
          x1 = e.touches[0].pageX;
          y1 = e.touches[0].pageY;
        }
      "
      @touchend="
        () => {
          $emit('input', display);

          x0 = x1 = 0;
          y0 = y1 = 0;
          active = false;
        }
      "
    >
      <b>{{ display }}</b>
    </p>
  </div>
</template>

<style scoped>
.sp-key {
  margin: 5px;
  width: auto;
  height: 60px;
  background-color: cornflowerblue;
  color: white;
  border-radius: 5%;
  text-align: center;
  line-height: 60px;
}
.active {
  background-color: blue;
}
.to-left {
  transform: translate(-2px, 0);
}
.to-up {
  transform: translate(0, -2px);
}
.to-right {
  transform: translate(2px, 0);
}
.to-down {
  transform: translate(0, 2px);
}
</style>
