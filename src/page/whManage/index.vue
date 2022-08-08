<template>
  <div class="page-main">
    <MyTitle title="仓库管理" />
    <div class="page-content">
      <SearchForm :form-item="formItem" @addHandler="addHandler" @onSearch="onSearch"
        @updataFormFata="updataFormFata" />
      <BaseTable :columns="columns()" :table-data="tableData" @loadData="onSearch" :total="total" />
    </div>
    <add-dialog :form-data="formData" :add-dialog-visible.sync="addDialogVisible" :oper-flag="operFlag" @addSuccess="onSearch" />
    <view-dialog :form-data="formData" :view-dialog-visible.sync="viewDialogVisible" />
  </div>
</template>
<script>
import MyTitle from '@/components/MyTitle'
import SearchForm from '@/components/SearchForm'
import BaseTable from '@/components/BaseTable'
import AddDialog from './AddDialog'
import ViewDialog from './ViewDialog'
import { getWarehouse, deleteWarehouse } from '@/api/service'

export default {
  name: 'WhManage',
  components: { MyTitle, SearchForm, BaseTable, AddDialog, ViewDialog },
  data () {
    return {
      searchForm: {
        warehouseName: ''
      },
      formItem: [
        {
          type: 'TEXT',
          key: 'warehouseName',
          label: '仓库名称'
        }
      ],
      tableData: [
        // { name: '章三', text: '新增', time: '1', address: '2' },
        // { name: '里斯', text: '删除', time: '1', address: '2' },
        // { name: '网舞', text: '跳转', time: '1', address: '2' },
        // { name: '章三', text: '新增', time: '1', address: '2' },
        // { name: '里斯', text: '删除', time: '1', address: '2' },
        // { name: '网舞', text: '跳转', time: '1', address: '2' }
      ],
      total: 0,
      formData: {
        warehouseCode: '',
        warehouseName: '',
        warehouseAddress: ''
      },
      addDialogVisible: false,
      operFlag: 'add',
      viewDialogVisible: false
    }
  },
  created () {
    this.onSearch()
    console.log(this.$route)
  },
  methods: {
    columns () {
      return [
        { label: '仓库名称', key: 'warehouseName' },
        { label: '仓库编码', key: 'warehouseCode' },
        { label: '仓库地址', key: 'warehouseAddress' },
        {
          label: '操作',
          key: 'operate',
          fixed: 'right',
          width: '200',
          operList: [
            {
              title: '编辑',
              handler: this.editHandler

            },
            {
              title: '删除',
              handler: this.deleteHandler
            }
          ]
        }
      ]
    },
    addHandler () {
      this.operFlag = 'add'
      this.addDialogVisible = true
    },
    async onSearch (queryInfo) {
      const params = queryInfo || {
        page: 1,
        rows: 10
      }
      // TODO 调用查询接口
      const { data } = await getWarehouse({ ...params, ...this.searchForm })
      if (!data.success) {
        this.$message.error(data.message)
        return
      }
      this.total = data.total
      this.tableData = data.rows
      // this.$message.success(data.message)
    },
    updataFormFata (data) {
      this.searchForm = { ...data }
    },
    editHandler (idx, row) {
      console.log(idx, row)
      this.operFlag = 'edit'
      this.formData = row
      this.addDialogVisible = true
    },
    deleteHandler (idx, row) {
      console.log(idx, row)
      this.$confirm('确认删除改仓库吗？', '删除确认', {
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        .then(async () => {
          const { data } = await deleteWarehouse({ id: row.id })
          if (!data.success) {
            this.$message.error(data.message)
            return
          }
          this.$message.success(data.message)
          this.onSearch()
        })
    }
  }
}
</script>

<style lang='less' scoped>
.base-table {
  flex: 1;
}
</style>
