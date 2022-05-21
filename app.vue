<script setup lang="ts">
import { ref } from "vue";
const confirmed = ref<string>("");
const editing = ref<string>("");
</script>

<template>
  <div class="uk-padding uk-margin">
    <div class="uk-margin">
      <p>
        {{ confirmed }}<span style="background-color: bisque; color: grey">{{ editing }}</span>
      </p>
    </div>

    <div>
      <sp-keyboard
        @confirm="c => (confirmed += c)"
        @buf-change="c => (editing = c)"
        @backspace="c => (confirmed = confirmed.slice(0, -1))"
        @clear="c => (confirmed = '')"
      />
    </div>
  </div>
</template>
