<template>
  <el-dialog :title="titleInfo" :visible.sync="dialogVisible" width="30%">
    <DynamicForm ref="dynamicFormRef" :form-data="form" :form-item="formItem()" :rules="rules" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import DynamicForm from '@/components/DynamicForm.vue'

export default {
  name: 'AddDialog',
  props: {
    formData: {
      type: Object,
      required: true
    },
    addDialogVisible: {
      type: Boolean,
      required: true
    },
    operFlag: {
      type: String,
      required: true
    }
  },
  components: { DynamicForm },
  data () {
    return {
      form: {
        whNo: '',
        whName: '',
        whAddress: ''
      }
    }
  },
  computed: {
    dialogVisible: {
      get () {
        return this.addDialogVisible
      },
      set (val) {
        console.log(val)
        this.$emit('update:addDialogVisible', val)
      }
    },
    titleInfo () {
      if (this.operFlag === 'add') return '新增'
      return '修改'
    }
  },
  watch: {
    addDialogVisible (nv) {
      if (!nv) {
        this.$refs.dynamicFormRef.resetAll()
      }
    },
    formData: {
      handler (nv) {
        if (Object.values(nv).length) {
          const obj = { ...this.form, ...nv }
          this.$set(this, 'form', obj)
        }
      },
      deep: true,
      immediate: true
    }
  },
  created () {
    this.rules = {
      whNo: [{ required: true, message: '请输入仓库编号', trigger: 'blur' }],
      whName: [{ required: true, message: '请输入仓库名称', trigger: 'blur' }],
      whAddress: [{ required: true, message: '请输入仓库地址', trigger: 'blur' }]
    }
  },
  methods: {
    formItem () {
      return [
        {
          type: 'TEXT',
          label: '仓库编号',
          key: 'whNo'
        },
        {
          type: 'TEXT',
          label: '仓库名称',
          key: 'whName'
        },
        {
          type: 'TEXTAREA',
          label: '仓库地址',
          key: 'whAddress'
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
