<template>
  <el-dialog title="详情" :visible.sync="dialogVisible" width="30%">
    <DynamicForm ref="dynamicFormRef" :form-data="formData" :form-item="formItem()" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import DynamicForm from '@/components/DynamicForm.vue'

export default {
  name: 'ViewDialog',
  props: {
    formData: {
      type: Object,
      required: true
    },
    viewDialogVisible: {
      type: Boolean,
      required: true
    }

  },
  components: { DynamicForm },
  data () {
    return {

    }
  },
  computed: {
    dialogVisible: {
      get () {
        return this.viewDialogVisible
      },
      set (val) {
        console.log(val)
        this.$emit('update:viewDialogVisible', val)
      }
    }
  },
  watch: {
    viewDialogVisible (nv) {
      if (!nv) {
        this.$refs.dynamicFormRef.resetAll()
      }
    }

  },
  created () {

  },
  methods: {
    formItem () {
      return [
        {
          type: 'VIEW',
          label: '仓库编号：',
          key: 'whNo'
        },
        {
          type: 'VIEW',
          label: '主题：',
          key: 'theme'
        },
        {
          type: 'VIEW',
          label: '扫描内容：',
          key: 'scanContent'
        },
        {
          type: 'VIEW',
          label: '需求取回：',
          key: 'isGetBack'
        },
        {
          type: 'VIEW',
          label: '质量要求：',
          key: 'qualityRequirements'
        },
        {
          type: 'VIEW',
          label: '刺绣单独扫描：',
          key: 'singleScan'
        },
        {
          type: 'VIEW',
          label: '实际扫描人：',
          key: 'physicalScanner'
        },
        {
          type: 'VIEW',
          label: '重要度：',
          key: 'importance'
        }
      ]
    },
    handleClose () { }
  }
}
</script>

<style lang='less' scoped>
/deep/ .el-dialog {
  border-radius: 8px;

  .el-dialog__header {
    border-bottom: 1px solid #e6e6e6;
  }

  .el-dialog__footer {
    border-top: 1px solid #e6e6e6;
  }
}
</style>
