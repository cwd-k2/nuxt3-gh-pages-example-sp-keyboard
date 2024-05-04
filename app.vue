<script setup lang="ts">
import { ref } from "vue";
const confirmed = ref<string>("");
const editing = ref<string>("");
</script>

<template>
  <div>
    <div class="uk-padding">
      <h3>タッチキーボード</h3>
      <div style="border: solid 2px #ccc">
        <p>
          {{ confirmed }}<span style="background-color: bisque; color: grey">{{ editing }}</span>
        </p>
      </div>
    </div>

    <div
      style="
        position: fixed;
        bottom: 0;
        width: 94%;
        z-index: 1;
        padding: 25px 3% 0;
        border-top: solid 1px #eee;
        background-color: #fff;
      "
    >
      <sp-keyboard
        @confirm="(c: string) => (confirmed += c)"
        @buf-change="(c: string) => (editing = c)"
        @backspace="(c: string) => (confirmed = confirmed.slice(0, -1))"
        @clear="(c: string) => (confirmed = '')"
      />
    </div>
  </div>
</template>
