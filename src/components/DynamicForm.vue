<template>
  <el-form ref="formRef" :model="formData" :rules="rules" :label-width="labelWidth" class="demo-ruleForm">
    <el-form-item v-for="item in formItem" :key="item.key" :label="item.label" :prop="item.key">
      <el-input v-if="item.type === 'TEXT'" v-model="formData[item.key]" :disabled="item.disabled"></el-input>
      <el-input v-if="item.type === 'TEXTAREA'" type="textarea" v-model="formData[item.key]" :disabled="item.disabled"></el-input>
      <el-radio-group v-if="item.type === 'RADIO'" v-model="formData[item.key]" :disabled="item.disabled">
        <el-radio v-for="it in item.option" :label="it.label" :value="it.value" :key="it.value"></el-radio>
      </el-radio-group>
      <el-select v-if="item.type === 'SELECT'" v-model="formData[item.key]" placeholder="请选择" @change="item.change">
        <el-option
          v-for="item in item.options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input-number
        v-if="item.type === 'NUM'"
        v-model="formData[item.key]"
        :min="1"
        :max="9999"
        :disabled="item.disabled"
      ></el-input-number>
      <el-date-picker
        v-if="item.type === 'DATE'"
        v-model="formData[item.key]"
        type="date"
        placeholder="选择日期"
        :disabled="item.disabled">
      </el-date-picker>
      <el-time-picker
        v-if="item.type === 'TIME'"
        v-model="formData[item.key]"
        is-range
        arrow-control
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        placeholder="选择时间范围"
        >
        <!-- value-format="HH:mm:ss" -->
      </el-time-picker>
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
