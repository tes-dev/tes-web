<template>
  <div class="app-container">
    <div class="table-container">
      <el-table
        ref="evalTable"
        :data="evalList"
        style="width: 100%"
        v-loading="listLoading"
        border
      >
        <el-table-column label="编号" width="100" align="center" class="type">
          <!-- <template slot-scope="scope">{{ scope.row.id }}</template> -->
        </el-table-column>
        <el-table-column label="课程id" align="center">
          <template slot-scope="scope">{{ scope.row.courseId }}</template>
        </el-table-column>
        <el-table-column label="课程名" align="center">
          <template slot-scope="scope">{{ scope.row.courseName }}</template>
        </el-table-column>
        <el-table-column label="教师" align="center">
          <template slot-scope="scope">{{ scope.row.targetName }}</template>
        </el-table-column>
        <el-table-column label="班级" align="center">
          <template slot-scope="scope">{{ scope.row.classNo }}</template>
        </el-table-column>
        <el-table-column label="院系" align="center">
          <template slot-scope="scope">{{ scope.row.deptName }}</template>
        </el-table-column>
        <el-table-column label="学期" align="center">
          <template slot-scope="scope">{{ scope.row.semesterName }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleEval(scope.$index, scope.current - row)"
            >
              开始评教
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
        :current-page.sync="page.pageNum"
        :page-size="page.pageSize"
        :page-sizes="[5, 10, 15]"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { fetchList } from '@/api/eval'

export default {
  name: "eval",
  data() {
    return {
      listLoading: false,
      evalList: null,
      page: {
        pageNum: 1,
        pageSize: 5,
      },
      total: null,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList().then(res => {
        this.listLoading = false
        this.evalList = res.data.list
        this.total = res.data.total
      })
    },
    handleSizeChange(val) {
      this.page.pageNum = 1
      this.page.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.page.pageNum = val
      this.getList()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
