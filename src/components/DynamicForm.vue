<template>
  <el-form ref="formRef" :model="formData" :rules="rules" :label-width="labelWidth" class="demo-ruleForm">
    <el-form-item v-for="item in formItem" :key="item.key" :label="item.label" :prop="item.key">
      <el-input v-if="item.type === 'TEXT'" v-model="formData[item.key]"></el-input>
      <el-input v-if="item.type === 'TEXTAREA'" type="textarea" v-model="formData[item.key]"></el-input>
      <el-radio-group v-if="item.type === 'RADIO'" v-model="formData[item.key]">
        <el-radio v-for="it in item.option" :label="it.label" :value="it.value" :key="it.value"></el-radio>
      </el-radio-group>
      <el-checkbox v-if="item.type === 'CHECK'" v-model="formData[item.key]">已阅读 <el-link type="primary">扫描须知
        </el-link>
      </el-checkbox>

      <span v-if="item.type === 'VIEW'">{{ formData[item.key] }}</span>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'DynamicForm',
  props: {
    formData: {
      type: Object,
      required: true
    },
    formItem: {
      type: Array,
      required: true
    },
    rules: {
      type: Object
    },
    labelWidth: {
      type: String,
      default: '100px'
    }
  },
  data () {
    return {
    }
  },
  watch: {

  },
  created () { },
  methods: {
    resetAll () {
      this.$refs.formRef.resetFields()
    }
  }
}
</script>

<style lang='less' scoped>
</style>
