<script setup lang="ts">
import { ref } from "vue";
const buf = ref<string>("");
const candidate = ref<string | null>(null);

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
  candidate.value = null;
  emit("buf-change", buf.value);
}

function onCandidate(c: string) {
  candidate.value = c;
}
</script>

<template>
  <div>
    <div v-if="candidate" class="candidate">
      {{ candidate }}
    </div>

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
    <div>
      <div class="uk-margin uk-child-width-1-3 uk-grid-collapse" uk-grid>
        <!-- col1 -->
        <div class="uk-child-width-1-1 uk-grid-collapse" uk-grid>
          <div v-for="chars in col1" :key="chars[0]">
            <sp-key :chars="chars" @input="onInput" @candidate="onCandidate" />
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
            <sp-key :chars="chars" @input="onInput" @candidate="onCandidate" />
          </div>
        </div>
        <!-- col3 -->
        <div class="uk-child-width-1-1 uk-grid-collapse" uk-grid>
          <div v-for="chars in col3" :key="chars[0]">
            <sp-key :chars="chars" @input="onInput" @candidate="onCandidate" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.sp-key {
  margin: 2px;
  width: auto;
  height: 60px;
  border-radius: 4px;
  text-align: center;
  line-height: 60px;
  background-color: cornflowerblue;
  color: white;
}
.sp-key-active {
  background-color: blue;
}
.sp-modifier-key {
  background-color: mediumslateblue;
}
.sp-modifier-key-active {
  background-color: indigo;
}
.candidate {
  position: fixed;
  background-color: blue;
  text-align: center;
  line-height: 50px;
  color: white;
  height: 50px;
  width: 50px;
  border-radius: 100%;
  bottom: 350px;
  left: calc(50vw - 25px);
  z-index: 5;
}
</style>
