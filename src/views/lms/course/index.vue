<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right; margin-top: 35px"
          type="primary"
          @click="handleSearchList()"
          size="small"
        >
          查询搜索
        </el-button>
        <el-button
          style="float: right; margin-right: 15px; margin-top: 35px"
          @click="handleResetSearch()"
          size="small"
        >
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="140px"
        >
          <el-form-item label="输入搜索：">
            <el-input
              v-model="listQuery.keyword"
              class="input-width"
              placeholder="课程"
              clearable
              @keyup.enter.native="handleSearchList()"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>课程列表</span>
      <el-button
        class="btn-add"
        style="margin-left: 20px"
        size="mini"
        type="second"
        @click="handleAdd()"
        >添加课程
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="adminTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        border
      >
        <el-table-column label="课程id" align="center" width="100">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="课程名称" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="课程编号" align="center">
          <template slot-scope="scope">{{ scope.row.num }}</template>
        </el-table-column>
        <el-table-column label="课程学期" align="center">
          <template slot-scope="scope">
            <div v-for="semester in allSemester" :key="semester.id">
              <div v-if="semester.id === scope.row.semesterId">
                {{ semester.name }}
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="240" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleUpdate(scope.$index, scope.row)"
            >
              修改课程
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.$index, scope.row)"
              >删除课程
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
      :title="isEdit ? '修改课程' : '添加课程'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form :model="admin" ref="adminForm" label-width="150px" size="small">
        <el-form-item label="课程名称：">
          <el-input v-model="admin.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="课程编号：">
          <el-input v-model="admin.num" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="课程学期：">
          <el-select
            v-model="admin.semesterId"
            style="width: 250px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in allSemester"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { updateAdmin, getRoleByAdmin, allocRole } from '@/api/login'
import { fetchAllSemesterList, allSemesterList } from '@/api/semester'
import { formatDate } from '@/utils/date'
import { getClassList } from '@/api/class'
import { getDeptList } from '@/api/dept'
import { fetchList, createAdmin, deleteAdmin, updateCourse } from '@/api/course'

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: null
}
const defaultAdmin = {
  id: null,
  name: null,
  num: null,
  semesterId: null
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
      admin: Object.assign({}, defaultAdmin),
      isEdit: false,
      allocDialogVisible: false,
      roleId: null,
      allSemester: [],
      userId: null,
      classList: [],
      deptList: [],
    }
  },
  created() {
    this.getList()
    this.getAllSemesterList()
  },
  filters: {
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A'
      }
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
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
    handleStatusChange(index, row) {
      this.$confirm('是否要修改该状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateStatus(row.id, { status: row.status }).then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        })
        this.getList()
      })
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除该课程?', '提示', {
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
      // 获取班级与学院数据
      getClassList().then(res => {
        this.classList = res.data
      })
      getDeptList().then(res => {
        this.deptList = res.data
      })
    },
    handleDialogConfirm() {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.isEdit) {
          updateCourse(this.admin.id, this.admin).then(response => {
            this.$message({
              message: '修改成功!',
              type: 'success'
            })
            this.dialogVisible = false
            this.getList()
          })
        } else {
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
    handleAllocDialogConfirm() {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new URLSearchParams()
        params.append("userId", this.userId)
        params.append("roleId", this.roleId)
        allocRole(params).then(response => {
          this.$message({
            message: '分配成功！',
            type: 'success'
          })
          this.allocDialogVisible = false
        })
        this.getList()
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
        this.list = response.data.list
        this.total = response.data.total
      })
    },
    getAllSemesterList() {
      allSemesterList().then(response => {
        this.allSemester = response.data
      })
    },
    getRoleListByAdmin(id) {
      getRoleByAdmin(id).then(response => {
        let allocRoleList = response.data
        this.roleId = null
        if (allocRoleList != null) {
          this.roleId = allocRoleList.id
          // for (let i = 0; i < allocRoleList.length; i++) {
          //   console.log(allocRoleList[i].id)
          //   this.roleId.push(allocRoleList[i].id)
          // }
        }
      })
    }
  }
}
</script>

