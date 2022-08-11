<template>
  <div class="page-main">
    <MyTitle title="入库管理" />
    <div class="page-content">
      <SearchForm :form-item="formItem" @onSearch="onSearch" @updataFormFata="updataFormFata" />
      <BaseTable :columns="columns()" :table-data="tableData" @loadData="onSearch" :total="total" />
    </div>
    <add-dialog :form-data="formData" :add-dialog-visible.sync="addDialogVisible" :oper-flag="operFlag" />
    <view-dialog :form-data="formData" :view-dialog-visible.sync="viewDialogVisible" />
  </div>
</template>
<script>
import MyTitle from '@/components/MyTitle'
import SearchForm from '@/components/SearchForm'
import BaseTable from '@/components/BaseTable'
import AddDialog from './AddDialog'
import ViewDialog from './ViewDialog'
import { getStockoutOrder } from '@/api/service'
import dayjs from 'dayjs'

export default {
  name: 'WhManage',
  components: { MyTitle, SearchForm, BaseTable, AddDialog, ViewDialog },
  data() {
    return {
      searchForm: {
        keyWord: '',
        date: ''
      },
      formItem: [
        {
          type: 'TEXT',
          key: 'keyWord',
          label: '搜索内容'
        },
        {
          type: 'DATE',
          key: 'date',
          label: '时间间隔'
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
      queryInfo: {
        page: 1,
        rows: 10
      },
      formData: {
        warehouseCode: '',
        stockoutUserName: '',
        stockoutTelephone: '',
        stockoutCardNo: '',
        stockoutPacking: '',
        stockoutNum: '',
        stockOrderTime: '',
        stockoutOrderNo: '',
        remark: ''
      },
      addDialogVisible: false,
      operFlag: 'add',
      viewDialogVisible: false
    }
  },
  created() {
    this.onSearch()
  },
  methods: {
    columns() {
      return [
        { label: '姓名', key: 'stockoutUserName' },
        { label: '入库时间', key: 'stockOrderTime' },
        { label: '入库手机号', key: 'stockoutTelephone' },
        { label: '仓库编码', key: 'warehouseCode' },
        { label: '车牌号', key: 'stockoutCardNo' },
        { label: '包装种类', key: 'stockoutPacking' },
        { label: '正确的件数', key: 'stockoutNum' },
        { label: '进仓编号', key: 'stockoutOrderNo' },
        {
          label: '操作',
          key: 'operate',
          fixed: 'right',
          width: '200',
          operList: [
            // {
            //   title: '编辑',
            //   handler: this.editHandler
            // },
            {
              title: '详情',
              handler: this.viewHandler
            }
          ]
        }
      ]
    },
    addHandler() {
      this.operFlag = 'add'
      this.addDialogVisible = true
      this.formData = {}
    },
    async onSearch(queryInfo) {
      const params = queryInfo || {
        page: 1,
        rows: 10
      }
      // TODO 调用查询接口
      const { data } = await getStockoutOrder({ ...params, ...this.searchForm })
      if (!data.success) {
        this.$message.error(data.message)
        return
      }
      this.tableData =
        data.rows?.map(_ => {
          return {
            ..._,
            stockOrderTime: dayjs(_.stockOrderTime).format('YYYY-MM-DD HH:mm:ss')
          }
        }) || []
      this.total = data.total || 0
    },
    updataFormFata(data) {
      this.searchForm = { ...data }
    },
    // editHandler(idx, row) {
    //   this.operFlag = 'edit'
    //   this.addDialogVisible = true
    //   this.formData = row
    // },
    viewHandler(idx, row) {
      this.formData = row
      this.viewDialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.base-table {
  flex: 1;
}
</style>
