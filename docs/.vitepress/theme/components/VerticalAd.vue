<template>
  <div v-if="show" class="wwads-cn wwads-vertical" data-id="296" style="margin-bottom: 20px;"></div>
</template>
<script>
export default {
  data() {
    return {
      show: false
    }
  },
  mounted() {
    this.show = navigator.language.indexOf('zh') > -1
  }
}
</script>
