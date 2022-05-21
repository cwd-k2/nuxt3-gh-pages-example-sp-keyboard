<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ target: string }>();
defineEmits<{
  (e: "input", value: string): void;
}>();

const active = ref<boolean>(false);

const convert = {
  あ: "ぁ",
  ぁ: "あ",
  い: "ぃ",
  ぃ: "ゐ",
  ゐ: "い",
  う: "ゔ",
  ゔ: "ぅ",
  ぅ: "う",
  え: "ぇ",
  ぇ: "ゑ",
  ゑ: "え",
  お: "ぉ",
  ぉ: "お",
  か: "が",
  が: "か",
  き: "ぎ",
  ぎ: "き",
  く: "ぐ",
  ぐ: "く",
  け: "げ",
  げ: "け",
  こ: "ご",
  ご: "こ",
  さ: "ざ",
  ざ: "さ",
  し: "じ",
  じ: "し",
  す: "ず",
  ず: "す",
  せ: "ぜ",
  ぜ: "せ",
  そ: "ぞ",
  ぞ: "そ",
  た: "だ",
  だ: "た",
  ち: "ぢ",
  ぢ: "ち",
  つ: "っ",
  っ: "づ",
  づ: "つ",
  て: "で",
  で: "て",
  と: "ど",
  ど: "と",
  は: "ば",
  ば: "ぱ",
  ぱ: "は",
  ひ: "び",
  び: "ぴ",
  ぴ: "ひ",
  ふ: "ぶ",
  ぶ: "ぷ",
  ぷ: "ふ",
  へ: "べ",
  べ: "ぺ",
  ぺ: "へ",
  ほ: "ぼ",
  ぼ: "ぽ",
  ぽ: "ほ",
  や: "ゃ",
  ゃ: "や",
  ゆ: "ゅ",
  ゅ: "ゆ",
  よ: "ょ",
  ょ: "よ",
  わ: "ゎ",
  ゎ: "わ",
};
</script>

<template>
  <div>
    <p
      class="sp-modifier-key"
      :class="{ active }"
      @touchstart="
        e => {
          active = true;
        }
      "
      @touchmove="
        e => {
          e.preventDefault(); // スクロール防止
        }
      "
      @touchend="
        () => {
          active = false;
          if (convert[props.target]) {
            $emit('input', convert[props.target]);
          }
        }
      "
    >
      <b>{{ convert[props.target] || "" }}</b>
    </p>
  </div>
</template>

<style scoped>
.sp-modifier-key {
  margin: 5px;
  width: auto;
  height: 60px;
  background-color: mediumslateblue;
  color: white;
  border-radius: 5%;
  text-align: center;
  line-height: 60px;
}
.active {
  background-color: indigo;
}
</style>
