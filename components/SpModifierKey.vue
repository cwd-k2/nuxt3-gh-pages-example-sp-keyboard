<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ target: string }>();
defineEmits<{
  (e: "input", value: string): void;
}>();

const active = ref<boolean>(false);

const convert = new Map();
convert.set("あ", "ぁ");
convert.set("ぁ", "あ");
convert.set("い", "ぃ");
convert.set("ぃ", "ゐ");
convert.set("ゐ", "い");
convert.set("う", "ゔ");
convert.set("ゔ", "ぅ");
convert.set("ぅ", "う");
convert.set("え", "ぇ");
convert.set("ぇ", "ゑ");
convert.set("ゑ", "え");
convert.set("お", "ぉ");
convert.set("ぉ", "お");
convert.set("か", "が");
convert.set("が", "か");
convert.set("き", "ぎ");
convert.set("ぎ", "き");
convert.set("く", "ぐ");
convert.set("ぐ", "く");
convert.set("け", "げ");
convert.set("げ", "け");
convert.set("こ", "ご");
convert.set("ご", "こ");
convert.set("さ", "ざ");
convert.set("ざ", "さ");
convert.set("し", "じ");
convert.set("じ", "し");
convert.set("す", "ず");
convert.set("ず", "す");
convert.set("せ", "ぜ");
convert.set("ぜ", "せ");
convert.set("そ", "ぞ");
convert.set("ぞ", "そ");
convert.set("た", "だ");
convert.set("だ", "た");
convert.set("ち", "ぢ");
convert.set("ぢ", "ち");
convert.set("つ", "っ");
convert.set("っ", "づ");
convert.set("づ", "つ");
convert.set("て", "で");
convert.set("で", "て");
convert.set("と", "ど");
convert.set("ど", "と");
convert.set("は", "ば");
convert.set("ば", "ぱ");
convert.set("ぱ", "は");
convert.set("ひ", "び");
convert.set("び", "ぴ");
convert.set("ぴ", "ひ");
convert.set("ふ", "ぶ");
convert.set("ぶ", "ぷ");
convert.set("ぷ", "ふ");
convert.set("へ", "べ");
convert.set("べ", "ぺ");
convert.set("ぺ", "へ");
convert.set("ほ", "ぼ");
convert.set("ぼ", "ぽ");
convert.set("ぽ", "ほ");
convert.set("や", "ゃ");
convert.set("ゃ", "や");
convert.set("ゆ", "ゅ");
convert.set("ゅ", "ゆ");
convert.set("よ", "ょ");
convert.set("ょ", "よ");
convert.set("わ", "ゎ");
convert.set("ゎ", "わ");
</script>

<template>
  <div>
    <p
      class="sp-key sp-modifier-key"
      :class="{ 'sp-key-active': active, 'sp-modifier-key-active': active }"
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
          if (convert.get(props.target)) {
            $emit('input', convert.get(props.target));
          }
        }
      "
    >
      <b>{{ convert.get(props.target) || "" }}</b>
    </p>
  </div>
</template>
