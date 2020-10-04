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
        <el-table-column label="编号" width="100" align="center" type="index">
          <!-- <template slot-scope="scope">{{ scope.row.id }}</template> -->
        </el-table-column>
        <!-- <el-table-column label="课程id" align="center">
          <template slot-scope="scope">{{ scope.row.courseId }}</template>
        </el-table-column> -->
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
              @click="handleEval(scope.$index, scope.row)"
            >
              开始评教
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="评教"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
      v-if="dialogVisible"
    >
      <el-table ref="evalItemList" :data="evalItemList" style="">
        <el-table-column label="编号" width="100" align="center" type="index">
          <!-- <template slot-scope="scope">{{ scope.row.id }}</template> -->
        </el-table-column>
        <el-table-column label="指标信息" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="选项" align="center">
          <template slot-scope="scope">
            <el-radio-group v-model="radio">
              <el-radio :label="1">A</el-radio>
              <el-radio :label="2">B</el-radio>
              <el-radio :label="3">C</el-radio>
              <el-radio :label="4">D</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
      </el-table>
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
import { fetchList, evalItem } from '@/api/eval'
import { setSupport, getSupport, setCookie, getCookie } from '@/utils/support'

export default {
  name: "eval",
  data() {
    return {
      listLoading: false,
      evalList: null,
      no: null,
      dialogVisible: false,
      evalItemList: null,
      radio: 1,
    }
  },
  created() {
    this.no = getCookie("no")
    console.log("no: ", this.no)
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.no).then(res => {
        this.listLoading = false
        this.evalList = res.data
      })
    },
    handleEval(index, row) {
      console.log("开始评教 id: " + index)
      console.log(row)
      this.dialogVisible = true
      this.getEvalItem(row)
    },
    getEvalItem(row) {
      evalItem(row).then(res => {
        this.evalItemList = res.data
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？').then(_ => {
        done()
      }).catch(_ => { })
    },
    handleDialogConfirm() {
      console.log("点击提交")
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
