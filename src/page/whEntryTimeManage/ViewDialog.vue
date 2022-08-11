<template>
  <el-dialog title="详情" :visible.sync="dialogVisible" width="700px">
    <DynamicForm ref="dynamicFormRef" :form-data="whEntryTimeInfo" :form-item="formItem()" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import DynamicForm from '@/components/DynamicForm.vue'
import dayjs from 'dayjs'

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
  data() {
    return {}
  },
  computed: {
    dialogVisible: {
      get() {
        return this.viewDialogVisible
      },
      set(val) {
        this.$emit('update:viewDialogVisible', val)
      }
    },

    whEntryTimeInfo: {
      get() {
        const formData = this.formData
        return {
          ...formData,
          storageDateStr: dayjs(formData.storageDate).format('YYYY-MM-DD'),
          storageTimeStr: `${dayjs(formData.storageBeginTime).format('YYYY-MM-DD HH:mm:ss')}至${dayjs(
            formData.storageEndTime
          ).format('YYYY-MM-DD HH:mm:ss')}`
        }
      }
    }
  },
  watch: {
    viewDialogVisible(nv) {
      if (!nv) {
        this.$refs.dynamicFormRef.resetAll()
      }
    }
  },
  created() {},
  methods: {
    formItem() {
      return [
        {
          type: 'VIEW',
          label: '仓库编号：',
          key: 'warehouseId'
        },
        {
          type: 'VIEW',
          label: '可入库数量：',
          key: 'storageNum'
        },
        {
          type: 'VIEW',
          label: '入库日期：',
          key: 'storageDateStr'
        },
        {
          type: 'VIEW',
          label: '入库时间：',
          key: 'storageTimeStr'
        },
        {
          type: 'VIEW',
          label: '入库地址：',
          key: 'warehouseAddress'
        }
      ]
    },
    handleClose() {}
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
