<template>
  <el-dialog :title="titleInfo" :visible.sync="dialogVisible" width="30%">
    <DynamicForm ref="dynamicFormRef" :form-data="form" :form-item="formItem()" :rules="rules" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelHandler">取 消</el-button>
      <el-button type="primary" @click="confirmHandler">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import DynamicForm from '@/components/DynamicForm.vue'
import { addWarehouse, editWarehouse } from '@/api/service'

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
        warehouseCode: '',
        warehouseName: '',
        warehouseAddress: ''
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
      warehouseName: [{ required: true, message: '请输入仓库名称', trigger: 'blur' }],
      warehouseCode: [{ required: true, message: '请输入仓库编号', trigger: 'blur' }],
      warehouseAddress: [{ required: true, message: '请输入仓库地址', trigger: 'blur' }]
    }
  },
  methods: {
    formItem () {
      return [
        {
          type: 'TEXT',
          label: '仓库名称',
          key: 'warehouseName'
        },
        {
          type: 'TEXT',
          label: '仓库编号',
          key: 'warehouseCode',
          disabled: this.operFlag !== 'add'
        },
        {
          type: 'TEXTAREA',
          label: '仓库地址',
          key: 'warehouseAddress'
        }
      ]
    },
    cancelHandler() {
      this.dialogVisible = false
    },
    confirmHandler  () {
      this.$refs.dynamicFormRef.$refs.formRef.validate(valid => {
        if (!valid) return
        if (this.operFlag === 'add') {
          this.apiHandler(addWarehouse, this.form)
          return
        }
        const params = {
          id: this.form.id,
          warehouseName: this.form.warehouseName,
          warehouseAddress: this.form.warehouseAddress
        }
        this.apiHandler(editWarehouse, params)
      })
    },
    async apiHandler(handler, params) {
      const { data } = await handler(params)
      if (!data.success) {
        this.$message.error(data.message)
        return
      }
      this.$message.success(data.message)
      this.cancelHandler()
      this.$emit('addSuccess')
    }
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
