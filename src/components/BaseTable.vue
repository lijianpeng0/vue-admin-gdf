<template>
  <div class="base-table">
    <el-table :data="tableData" fit :height="height" :key="timestamp" stripe>
      <el-table-column v-for="(item, index) in columns" :key="item.key || new Date() + index" :prop="item.key"
        :label="item.label" :fixed="item.fixed" :width="item.width" align="center">
        <template v-slot="scope" v-if="item.operList">
          <el-button v-for="(it, index) in item.operList" :key="index" size="mini" type="text"
            @click="() => { it.handler(scope.$index, scope.row) }">
            {{ it.title }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="queryInfo.page" :page-sizes="[10, 20, 30, 40, 50]" :page-size="queryInfo.rows"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    total: {
      type: [String, Number]
    }
  },
  data () {
    return {
      timestamp: +new Date(),
      queryInfo: {
        page: 1,
        rows: 10
      },
      height: 500
    }
  },
  mounted () {
    this.calcTableHeight()
  },
  methods: {
    handleSizeChange (size) {
      this.queryInfo.rows = size
      this.loadData()
    },
    handleCurrentChange (page) {
      this.queryInfo.page = page
      this.loadData()
    },
    loadData () {
      console.log(this.queryInfo)
      this.$emit('loadData', this.queryInfo)
    },
    calcTableHeight () {
      const baseTableHeight = getComputedStyle(document.querySelector('.base-table')).height
      this.height = parseInt(baseTableHeight) - 50
      this.timestamp = +new Date()
    }
  }
}
</script>
<style lang="less" scoped>
.base-table {
  height: 100%;

  .el-table {
    height: calc(~"100% - 50px");
    margin-bottom: 20px;

    &::before {
      background-color: transparent;
    }
  }

  .el-pagination {
    padding: 0;
    text-align: right;
  }
}
</style>
