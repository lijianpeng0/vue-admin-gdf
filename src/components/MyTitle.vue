<template>
  <div class="container">
    {{ title }}
  </div>
</template>
<script>
export default {
  name: 'MyTitle',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {}
  },
  created () { },
  methods: {}
}
</script>

<style lang='less' scoped>
.container {
  height: 60px;
  line-height: 60px;
  border: 1px solid #E6E6E6;
  padding-left: 50px;
  font-weight: 500;
  font-size: 24px;
}
</style>
