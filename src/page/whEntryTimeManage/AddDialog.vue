<template>
  <el-dialog :title="titleInfo" :visible.sync="dialogVisible" width="700px">
    <DynamicForm ref="dynamicFormRef" :form-data="form" :form-item="formItem()" :rules="rules" label-width="120px" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelHandler">取 消</el-button>
      <el-button type="primary" @click="confirmHandler">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import DynamicForm from '@/components/DynamicForm.vue'
import { addStockoutOrderTime, editStockoutOrderTime, getWarehouse } from '@/api/service'

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
        warehouseId: '',
        warehouseName: '',
        storageNum: '',
        storageDate: '',
        // storageTime: ['08:00:00', '18:00:00'],
        storageTime: [new Date(), new Date()],
        storageBeginTime: '',
        storageEndTime: '',
        warehouseAddress: ''
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
      warehouseId: [{ required: true, message: '请选择仓库', trigger: 'blur' }],
      storageNum: [{ required: true, message: '请输入可入库数量', trigger: 'blur' }],
      storageDate: [{ required: true, message: '请选择入库日期', trigger: 'blur' }],
      storageTime: [{ required: true, message: '请选择入库时间', trigger: 'blur' }],
      warehouseAddress: [{ required: true, message: '请输入入库地址', trigger: 'blur' }]
    }
    this.getWarehouse()
  },
  methods: {
    formItem() {
      return [
        {
          type: 'SELECT',
          label: '仓库',
          key: 'warehouseId',
          options: this.whList,
          change: this.whChangeHandler
        },
        {
          type: 'NUM',
          label: '可入库数量',
          key: 'storageNum'
        },
        {
          type: 'DATE',
          label: '入库日期',
          key: 'storageDate'
        },
        {
          type: 'TIME',
          label: '入库时间',
          key: 'storageTime'
        },
        {
          type: 'TEXT',
          label: '入库地址',
          key: 'warehouseAddress'
        }
      ]
    },
    whChangeHandler(value) {
      this.form.warehouseName = this.whList.find(it => it.value === value).label || ''
    },
    cancelHandler() {
      this.dialogVisible = false
    },
    confirmHandler() {
      this.$refs.dynamicFormRef.$refs.formRef.validate(valid => {
        if (!valid) return

        this.apiHandler(this.operFlag === 'add' ? addStockoutOrderTime : editStockoutOrderTime)
      })
    },
    async apiHandler(handler) {
      const params = {
        warehouseId: this.form.warehouseId,
        warehouseName: this.form.warehouseName,
        storageNum: this.form.storageNum,
        storageDate: this.form.storageDate,
        warehouseAddress: this.form.warehouseAddress,
        storageBeginTime: this.form.storageTime[0],
        storageEndTime: this.form.storageTime[1]
        // storageDateStr: '123'
      }
      const { data } = await handler(params)
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
          value: item.id,
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
