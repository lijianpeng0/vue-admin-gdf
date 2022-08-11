<template>
  <el-dialog :title="titleInfo" :visible.sync="dialogVisible" width="30%">
    <DynamicForm ref="dynamicFormRef" :form-data="form" :form-item="formItem()" :rules="rules" label-width="120px" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelHandler">取 消</el-button>
      <el-button type="primary" @click="confirmHandler">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import DynamicForm from '@/components/DynamicForm.vue'
import { addStockoutOrder, editStockoutOrder, getWarehouse } from '@/api/service'

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
  data() {
    return {
      form: {
        warehouseCode: '',
        stockoutUserName: '',
        stockoutTelephone: '',
        stockoutCardNo: '',
        stockoutPacking: '',
        stockoutNum: '',
        stockOrderTime: '',
        remark: ''
      },
      whList: []
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.addDialogVisible
      },
      set(val) {
        this.$emit('update:addDialogVisible', val)
      }
    },
    titleInfo() {
      if (this.operFlag === 'add') return '新增'
      return '修改'
    }
  },
  watch: {
    addDialogVisible(nv) {
      if (!nv) {
        this.$refs.dynamicFormRef.resetAll()
      }
    },
    formData: {
      handler(nv) {
        if (Object.values(nv).length) {
          const obj = { ...this.form, ...nv }
          this.$set(this, 'form', obj)
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.rules = {
      warehouseCode: [{ required: true, message: '请输入仓库编号', trigger: 'blur' }],
      stockoutUserName: [{ required: true, message: '请输入主题', trigger: 'blur' }],
      stockoutTelephone: [{ required: true, message: '请输入扫描内容', trigger: 'blur' }],
      stockoutCardNo: [{ required: true, message: '请选择', trigger: 'blur' }],
      stockoutPacking: [{ required: true, message: '请选择', trigger: 'blur' }],
      stockoutNum: [{ required: true, message: '请选择', trigger: 'blur' }],
      stockOrderTime: [{ required: true, message: '请选择', trigger: 'blur' }]
    }
    this.getWarehouse()
  },
  methods: {
    formItem() {
      return [
        {
          type: 'SELECT',
          label: '仓库',
          key: 'warehouseCode',
          options: this.whList
        },
        {
          type: 'TEXT',
          label: '姓名',
          key: 'stockoutUserName'
        },
        {
          type: 'TEXT',
          label: '入库手机号',
          key: 'stockoutTelephone'
        },
        {
          type: 'TEXT',
          label: '车牌号',
          key: 'stockoutCardNo'
        },
        {
          type: 'TEXT',
          label: '包装种类',
          key: 'stockoutPacking'
        },
        {
          type: 'NUM',
          label: '件数',
          key: 'stockoutNum'
        },
        {
          type: 'DATE',
          label: '入库时间',
          key: 'stockOrderTime'
        },
        {
          type: 'TEXTAREA',
          label: '备注',
          key: 'remark'
        }
      ]
    },
    cancelHandler() {
      this.dialogVisible = false
    },
    confirmHandler() {
      this.$refs.dynamicFormRef.$refs.formRef.validate(valid => {
        if (!valid) return

        this.apiHandler(this.operFlag === 'add' ? addStockoutOrder : editStockoutOrder)
      })
    },
    async apiHandler(handler) {
      const { data } = await handler(this.form)
      if (!data.success) {
        this.$message.error(data.message)
        return
      }
      this.$message.success(data.message)
      this.cancelHandler()
      this.$emit('addSuccess')
    },
    async getWarehouse() {
      const { data } = await getWarehouse({
        page: 1,
        rows: 9999
      })
      if (!data.success) {
        this.$message.error(data.message)
        return
      }
      this.whList = data.rows.map(item => {
        return {
          value: item.warehouseCode,
          label: item.warehouseName
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
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
