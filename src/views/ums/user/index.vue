<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          type="primary"
          @click="handleSearchList()"
          size="small"
        >
          查询搜索
        </el-button>
        <el-button
          style="float: right; margin-right: 15px"
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
              placeholder="学号/姓名"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>用户列表</span>
      <!-- <el-upload
        action="/user/upload"
        name="excelFile"
        :show-file-list="false"
        :on-success="handleSuccess"
        :before-upload="before - upload"
      >
        <el-button size="mini" type="primary">上传文件</el-button>
      </el-upload> -->
      <el-button
        size="mini"
        type="primary"
        class="btn-add"
        @click="handleImport()"
        style="margin-left: 20px"
        >导入用户</el-button
      >
      <el-button
        size="mini"
        class="btn-add"
        type="second"
        @click="handleAdd()"
        style="margin-left: 20px"
        >添加用户</el-button
      >
    </el-card>
    <div class="table-container">
      <el-table
        ref="adminTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        border
      >
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="学号" align="center">
          <template slot-scope="scope">{{ scope.row.no }}</template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">
            {{ scope.row.gender == 0 ? "男" : "女" }}</template
          >
        </el-table-column>
        <el-table-column label="角色" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.roleId == 1">管理员</div>
            <div v-else-if="scope.row.roleId == 2">领导</div>
            <div v-else-if="scope.row.roleId == 3">教师</div>
            <div v-else>学生</div>
          </template>
        </el-table-column>
        <el-table-column label="班级" align="center">
          <template slot-scope="scope">{{ scope.row.classNo }}</template>
        </el-table-column>
        <el-table-column label="院系" align="center">
          <template slot-scope="scope">{{ scope.row.deptNo }}</template>
        </el-table-column>
        <el-table-column label="是否启用" width="140" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleSelectRole(scope.$index, scope.row)"
              >分配角色
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleUpdate(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.$index, scope.row)"
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
      :title="isEdit ? '编辑用户' : '添加用户'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form :model="admin" ref="adminForm" label-width="150px" size="small">
        <el-form-item label="学号：">
          <el-input v-model="admin.no" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="admin.username" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio v-model="admin.gender" label="0">男</el-radio>
          <el-radio v-model="admin.gender" label="1">女</el-radio>
        </el-form-item>
        <el-form-item label="班级：">
          <el-select
            v-model="admin.classNo"
            placeholder="请选择"
            size="small"
            style="width: 250px"
          >
            <el-option
              v-for="item in classList"
              :key="item.id"
              :label="item.no"
              :value="item.no"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="院系：">
          <el-select
            v-model="admin.deptNo"
            placeholder="请选择"
            size="small"
            style="width: 250px"
          >
            <el-option
              v-for="item in deptList"
              :key="item.id"
              :label="item.name"
              :value="item.no"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色：">
          <el-select
            v-model="admin.roleId"
            placeholder="请选择"
            size="small"
            style="width: 250px"
          >
            <el-option
              v-for="item in allRoleList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input
            v-model="admin.password"
            type="password"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="admin.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="分配角色" :visible.sync="allocDialogVisible" width="30%">
      <el-select
        v-model="roleId"
        placeholder="请选择"
        size="small"
        style="width: 80%"
      >
        <el-option
          v-for="item in allRoleList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allocDialogVisible = false" size="small"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="handleAllocDialogConfirm()"
          size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="导入用户"
      :visible.sync="dialogImportVisible"
      width="450px"
    >
      <el-button type="primary" style="margin-left: 20px">
        <a href="https://maxwell-oss.oss-cn-shenzhen.aliyuncs.com/template.xlsx"
          >下载模板文件</a
        >
      </el-button>
      <div class="app-container">
        <!-- <upload-excel-component
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
        /> -->

        <el-upload
          class="upload-demo"
          drag
          action="123"
          name="excelFile"
          :http-request="uploadExcel"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传xls/xlxs文件，且不超过1MB
          </div>
        </el-upload>

        <!-- <el-table
          :data="tableData"
          border
          highlight-current-row
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column
            v-for="item of tableHeader"
            :key="item"
            :prop="item"
            :label="item"
          />
        </el-table> -->
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { fetchList, createAdmin, updateAdmin, updateStatus, deleteAdmin, getRoleByAdmin, allocRole, upload } from '@/api/login'
import { fetchAllRoleList } from '@/api/role'
import { formatDate } from '@/utils/date'
import { getAllClassList } from '@/api/class'
import { getAllDeptList } from '@/api/dept'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { getToken } from '@/utils/auth'

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null
}
const defaultAdmin = {
  id: null,
  no: null,
  username: null,
  password: null,
  gender: null,
  roleId: null,
  classNo: null,
  deptNo: null,
  status: 1,

}
export default {
  name: 'adminList',
  components: { UploadExcelComponent },
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
      allRoleList: [],
      userId: null,
      classList: [],
      deptList: [],
      dialogImportVisible: false,
      tableData: [],
      tableHeader: []
    }
  },
  created() {
    this.getList()
    this.getAllRoleList()
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
      // 获取班级与学院数据
      getAllClassList().then(res => {
        this.classList = res.data
      })
      getAllDeptList().then(res => {
        this.deptList = res.data
      })
    },
    handleImport() {
      this.dialogImportVisible = true
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
      this.$confirm('是否要删除该用户?', '提示', {
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
      getAllClassList().then(res => {
        this.classList = res.data
      })
      getAllDeptList().then(res => {
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
          updateAdmin(this.admin.id, this.admin).then(response => {
            this.$message({
              message: '修改成功！',
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
    getAllRoleList() {
      fetchAllRoleList().then(response => {
        this.allRoleList = response.data
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
    },

    uploadExcel(param) {
      console.log(param)
      let fileFormData = new FormData()
      fileFormData.append('excelFile', param.file)
      upload(fileFormData).then(res => {
        this.$message({
          message: res.data,
          type: 'success'
        })
      })
      this.getList()
    },

    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })

      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    }
  }
}
</script>

