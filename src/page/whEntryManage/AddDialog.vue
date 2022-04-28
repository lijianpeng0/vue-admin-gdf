<template>
  <el-dialog :title="titleInfo" :visible.sync="dialogVisible" width="30%">
    <DynamicForm ref="dynamicFormRef" :form-data="form" :form-item="formItem()" :rules="rules" label-width="120px" />
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
        theme: '',
        scanContent: '',
        isGetBack: '',
        qualityRequirements: '',
        singleScan: '',
        physicalScanner: '',
        importance: '',
        isRead: ''
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
      theme: [{ required: true, message: '请输入主题', trigger: 'blur' }],
      scanContent: [{ required: true, message: '请输入扫描内容', trigger: 'blur' }],
      isGetBack: [{ required: true, message: '请选择', trigger: 'blur' }],
      qualityRequirements: [{ required: true, message: '请选择', trigger: 'blur' }],
      singleScan: [{ required: true, message: '请选择', trigger: 'blur' }]
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
          label: '主题',
          key: 'theme'
        },
        {
          type: 'TEXTAREA',
          label: '扫描内容',
          key: 'scanContent'
        },
        {
          type: 'RADIO',
          label: '需求取回',
          key: 'isGetBack',
          option: [
            {
              label: '是',
              value: '1'
            },
            {
              label: '否',
              value: '0'
            }
          ]
        },
        {
          type: 'RADIO',
          label: '质量要求',
          key: 'qualityRequirements',
          option: [
            {
              label: '普通质量',
              value: '0'
            },
            {
              label: '高质量',
              value: '1'
            },
            {
              label: '超精细',
              value: '2'
            }
          ]
        },
        {
          type: 'RADIO',
          label: '刺绣单独扫描',
          key: 'singleScan',
          option: [
            {
              label: '需要',
              value: '1'
            },
            {
              label: '不需要',
              value: '0'
            }
          ]
        },
        {
          type: 'TEXT',
          label: '实际扫描人',
          key: 'physicalScanner'
        },
        {
          type: 'TEXT',
          label: '重要度',
          key: 'importance'
        },
        {
          type: 'CHECK',
          key: 'isRead'
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
