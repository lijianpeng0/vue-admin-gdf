<template>
  <div class="container">
    <el-form ref="formRef" :model="formData" label-width="80" :inline="true">
      <el-form-item v-for="item in formItem" :key="item.key" :label="item.label">
        <el-input v-if="item.type === 'TEXT'" v-model="formData[item.key]" placeholder="请输入你需要搜索的内容"
          suffix-icon="el-icon-search"></el-input>
        <el-date-picker v-else v-model="formData[item.key]" value-format="yyyy-MM-dd" type="daterange"
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="right" v-if="showAdd">
      <i class="el-icon-circle-plus" @click="addHandler"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SearchForm',
  props: {
    formItem: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      formData: {}
    }
  },
  watch: {
    formData: {
      handler (nv) {
        this.$emit('updataFormFata', nv)
      },
      deep: true
    }
  },
  created () {
    this.formItem.forEach(it => {
      this.$set(this.formData, it.key, '')
    })
  },
  computed: {
    showAdd: {
      get () {
        return !!this.$listeners.addHandler
      }
    }
  },
  methods: {
    onSearch () {
      this.$emit('onSearch')
    },
    onReset () {
      this.$refs.formRef.resetFields()
    },
    addHandler () {
      this.$emit('addHandler')
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .right {
    font-size: 30px;
    color: #CCC;

    &:hover {
      color: #409eff;
      transition: all 0.3s;
    }
  }
}

.el-form {
  margin: 16px 0;
  height: 40px;

  .el-form-item {
    margin-right: 20px;
  }
}
</style>
