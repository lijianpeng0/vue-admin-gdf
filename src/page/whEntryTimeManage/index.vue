<template>
  <div class="page-main">
    <MyTitle title="入库时间管理" />
    <div class="page-content">
      <SearchForm
        :form-item="formItem"
        @addHandler="addHandler"
        @onSearch="onSearch"
        @updataFormFata="updataFormFata"
      />
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
import { getStockoutOrderTime } from '@/api/service'
import dayjs from 'dayjs'

export default {
  name: 'whEntryTimeManage',
  components: { MyTitle, SearchForm, BaseTable, AddDialog, ViewDialog },
  data() {
    return {
      searchForm: {
        keyWord: '',
        timeInterval: ''
      },
      formItem: [
        {
          type: 'TEXT',
          key: 'keyWord',
          label: '搜索内容'
        },
        {
          type: 'DATE',
          key: 'timeInterval',
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
        pageNo: 1,
        pageSize: 10
      },
      formData: {
        warehouseId: '',
        warehouseName: '',
        storageNum: '',
        storageDate: '',
        storageTime: [new Date(), new Date()],
        storageBeginTime: '',
        storageEndTime: '',
        warehouseAddress: ''
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
        { label: '仓库名称', key: 'warehouseName' },
        { label: '可入库数量', key: 'storageNum' },
        { label: '入库日期', key: 'storageDateStr' },
        { label: '入库开始时间', key: 'storageBeginTimestr' },
        { label: '入库结束时间', key: 'storageEndTimestr' },
        { label: '地址', key: 'warehouseAddress' },
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
              title: '详情',
              handler: this.viewHandler
            }
          ]
        }
      ]
    },
    addHandler() {
      this.operFlag = 'add'
      this.formData = {}
      this.addDialogVisible = true
    },
    async onSearch(queryInfo) {
      const params = queryInfo || {
        page: 1,
        rows: 10
      }

      // 调用查询接口
      const { data } = (await getStockoutOrderTime({ ...params, ...this.searchForm })) || {}
      if (!data?.success) {
        this.$message.error(data?.message)
        return
      }
      this.tableData =
        data.rows.map(_ => {
          return {
            ..._,
            storageDateStr: dayjs(_.storageDateStr).format('YYYY-MM-DD'),
            storageBeginTimestr: dayjs(_.storageBeginTime).format('HH:mm:ss'),
            storageEndTimestr: dayjs(_.storageEndTime).format('HH:mm:ss')
          }
        }) || []
      this.total = data.total || 0
      // this.$message.success(data.message)
    },
    updataFormFata(data) {
      this.searchForm = { ...data }
    },
    editHandler(idx, row) {
      this.operFlag = 'edit'
      this.formData = row
      this.addDialogVisible = true
    },
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
