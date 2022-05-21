<script setup lang="ts">
import { ref } from "vue";
const buf = ref<string>("");

const emit = defineEmits<{
  (e: "confirm", value: string): void;
  (e: "buf-change", value: string): void;
  (e: "backspace"): void;
  (e: "clear"): void;
}>();

const col1 = [
  ["あ", "い", "う", "え", "お"],
  ["た", "ち", "つ", "て", "と"],
  ["ま", "み", "む", "め", "も"],
];
const col2 = [
  ["か", "き", "く", "け", "こ"],
  ["な", "に", "ぬ", "ね", "の"],
  ["や", "（", "ゆ", "）", "よ"],
  ["わ", "を", "ん", "ー", "〜"],
];
const col3 = [
  ["さ", "し", "す", "せ", "そ"],
  ["は", "ひ", "ふ", "へ", "ほ"],
  ["ら", "り", "る", "れ", "ろ"],
  ["、", "。", "？", "！", "…"],
];

function onInput(c: string) {
  emit("confirm", buf.value);
  buf.value = c;
  emit("buf-change", buf.value);
}
</script>

<template>
  <div>
    <div class="uk-margin uk-text-center uk-child-width-1-2" uk-grid>
      <div>
        <button
          class="uk-button uk-button-default uk-width-expand"
          @click="
            () => {
              if (buf.length > 0) {
                buf = '';
                $emit('buf-change', '');
              } else {
                $emit('backspace');
              }
            }
          "
        >
          BS
        </button>
      </div>
      <div>
        <button
          class="uk-button uk-button-default uk-margin uk-width-expand"
          @click="
            () => {
              buf = '';
              $emit('buf-change', '');
              $emit('clear');
            }
          "
        >
          Clear
        </button>
      </div>
    </div>
    <!---->
    <div style="height: 320px">
      <div class="uk-margin uk-child-width-1-3 uk-grid-collapse" uk-grid>
        <!-- col1 -->
        <div class="uk-child-width-1-1 uk-grid-collapse" uk-grid>
          <div v-for="chars in col1" :key="chars[0]">
            <sp-key :chars="chars" @input="onInput" />
          </div>
          <div>
            <sp-modifier-key
              :target="buf"
              @input="
                c => {
                  buf = c;
                  $emit('buf-change', buf);
                }
              "
            />
          </div>
        </div>
        <!-- col2 -->
        <div class="uk-child-width-1-1 uk-grid-collapse" uk-grid>
          <div v-for="chars in col2" :key="chars[0]">
            <sp-key :chars="chars" @input="onInput" />
          </div>
        </div>
        <!-- col3 -->
        <div class="uk-child-width-1-1 uk-grid-collapse" uk-grid>
          <div v-for="chars in col3" :key="chars[0]">
            <sp-key :chars="chars" @input="onInput" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
