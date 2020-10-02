<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div style="float: left">
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      </div>
      <div>
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="140px"
          style="margin-top: 30px"
        >
          <el-form-item label="输入搜索：">
            <el-input
              v-model="listQuery.keyword"
              class="input-width"
              placeholder="请输入院系名称"
              clearable
              @keyup.enter.native="handleSearchList()"
            ></el-input>
          </el-form-item>
          <el-button
            style="float: right; width: 80px"
            @click="handleResetSearch()"
            size="small"
            type="info"
          >
            重置
          </el-button>
          <el-button
            style="
              float: right;

              margin-right: 10px;
              width: 80px;
            "
            type="primary"
            @click="handleSearchList()"
            size="small"
            icon="el-icon-search"
          >
            搜索
          </el-button>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>学院列表</span>
      <el-button
        size="small"
        class="btn-add"
        @click="handleAdd()"
        style="float: right; width: 80px; margin-bottom: 10px"
        >添加学院</el-button
      >
    </el-card>
    <div class="table-container">
      <!--      :data="list"获取数据列表,slot-scope="scope"是获取数据列表且命名为scope，scope.row当前行的数据-->
      <el-table
        ref="adminTable"
        :data="list"
        style="width: 100%; margin: auto"
        v-loading="listLoading"
        border
      >
        <el-table-column label="序号" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="系号" align="center">
          <template slot-scope="scope">{{ scope.row.no }}</template>
        </el-table-column>
        <el-table-column label="院系" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleUpdate(scope.$index, scope.row)"
              round
              >修改
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              round
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5, 10, 15]"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog
      :title="isEdit ? '修改学院信息' : '添加学院'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form :model="admin" ref="adminForm" label-width="150px" size="small">
        <el-form-item label="系号：">
          <el-input v-model="admin.no" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="学院名称：">
          <el-input v-model="admin.name" style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small"
          >确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { fetchList, updateAdmin, deleteAdmin, createAdmin } from '@/api/dept'

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null
}
const defaultAdmin = {
  id: null,
  no: null,
  name: null
}
export default {
  name: 'adminList',
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      admin: Object.assign({}, defaultAdmin),//修改
      isEdit: false,
      allocDialogVisible: false,
      roleId: null,
      allRoleList: [],
      userId: null,
      classList: [],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery)
    },
    handleSearchList() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    handleAdd() {
      this.dialogVisible = true
      this.isEdit = false
      this.admin = Object.assign({}, defaultAdmin)

    },
    handleDelete(index, row) {
      this.$confirm('是否要删除该学院?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAdmin(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
      })
    },
    handleUpdate(index, row) {
      this.dialogVisible = true
      this.isEdit = true
      this.admin = Object.assign({}, row)
    },
    handleDialogConfirm() {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.isEdit) { //isEdit=true修改学院
          updateAdmin(this.admin.id, this.admin).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            })
            this.dialogVisible = false
            this.getList()
          })
        } else { //isEdit=false添加学院
          createAdmin(this.admin).then(response => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            })
            this.dialogVisible = false
            this.getList()
          })
        }
      })
    },
    handleSelectRole(index, row) {
      this.userId = row.id
      this.allocDialogVisible = true
      this.getRoleListByAdmin(row.id)
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.list //返回的院系列表
        this.total = response.data.total  //有多少条数据
      })

    },

  }
}
</script>

