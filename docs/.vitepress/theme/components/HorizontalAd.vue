<template>
  <div v-if="show" class="wwads-cn wwads-horizontal" data-id="296"></div>
</template>
<script>
export default {
  data() {
    return {
      show: false
    }
  },
  mounted() {
    this.show = navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i)
  }
}
</script>
