<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button class="btn-add" @click="handleAddClass()" size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="productCateTable"
        style="width: 100%"
        :data="list"
        v-loading="listLoading"
        border
      >
        <el-table-column label="编号" width="200" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="班级名称" align="center" width="200">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="班级代码" width="200" align="center">
          <template slot-scope="scope">{{ scope.row.no }}</template>
        </el-table-column>

        <el-table-column label="是否显示" width="200" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleShowStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.showStatus"
            >
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)"
              >编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
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
        :page-size="listQuery.pageSize"
        :page-sizes="[5, 10, 15]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
      >
      </el-pagination>
    </div>

    <el-dialog
      :title="isEdit ? '编辑班级' : '添加班级'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form
        :model="tesclass"
        ref="tesclassForm"
        label-width="150px"
        size="small"
      >
        <el-form-item label="班级名称：">
          <el-input v-model="tesclass.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="班级编号：">
          <el-input v-model="tesclass.no" style="width: 250px"></el-input>
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
import { fetchList, deleteClass, updateShowStatus, updateNavStatus, createClass } from '@/api/class'
const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null
}
const defaultTesclass = {
  id: null,
  name: null,
  no: null
}
export default {
  name: "classManagementList",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      tesclass: Object.assign({}, defaultTesclass),
      isEdit: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleAddClass() {
      this.dialogVisible = true
      this.isEdit = false
      this.tesclass = Object.assign({}, defaultTesclass)
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.list
        this.total = response.data.total
      })
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
    handleShowStatusChange(index, row) {
      let data = new URLSearchParams()
      let ids = []
      ids.push(row.id)
      data.append('ids', ids)
      data.append('showStatus', row.showStatus)
      updateShowStatus(data).then(response => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        })
      })
    },

    handleDialogConfirm() {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.isEdit) {
          updateClass(this.tesclass.id, this.tesclass).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            })
            this.dialogVisible = false
            this.getList()
          })
        } else {
          createClass(this.tesclass).then(response => {
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

    handleUpdate(index, row) {
      this.$router.push({ path: '/pms/updateProductCate', query: { id: row.id } })
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除该班级', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteClass(row.id).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          })
          this.getList()
        })
      })
    }
  },
  filters: {
    levelFilter(value) {
      if (value === 0) {
        return '一级'
      } else if (value === 1) {
        return '二级'
      }
    },
    disableNextLevel(value) {
      if (value === 0) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style scoped>
</style>
