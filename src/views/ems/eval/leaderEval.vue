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
        <el-table-column label="院系" align="center">
          <template slot-scope="scope">{{ scope.row.deptName }}</template>
        </el-table-column>
        <el-table-column label="学期" align="center">
          <template slot-scope="scope">{{ scope.row.semesterName }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.eval">
              <el-button
                size="mini"
                type="text"
                @click="handleEval(scope.$index, scope.row)"
                disabled
              >
                开始评教
              </el-button>
            </div>
            <div v-else>
              <el-button
                size="mini"
                type="text"
                @click="handleEval(scope.$index, scope.row)"
              >
                开始评教
              </el-button>
            </div>
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
            <el-radio-group v-model="radios[scope.$index]">
              <el-radio :label="0">非常满意</el-radio>
              <el-radio :label="1">满意</el-radio>
              <el-radio :label="2">一般</el-radio>
              <el-radio :label="3">不满意</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer" style="margin-right: 30px">
        <el-button type="primary" @click="handleDialogConfirm()"
          >提 交</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchLeaderList, evalItem, commitEval } from '@/api/eval'
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
      radios: [],
      commitIndex: null,
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
      fetchLeaderList(this.no).then(res => {
        this.listLoading = false
        this.evalList = res.data

      })
    },
    handleEval(index, row) {
      console.log("开始评教 id: " + index)
      console.log(row)
      this.dialogVisible = true
      this.commitIndex = index
      this.getEvalItem(row)
    },
    getEvalItem(row) {
      evalItem(row).then(res => {
        this.evalItemList = res.data
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        done()
        this.radios = []
      }).catch(_ => { })
    },
    handleDialogConfirm() {
      let radios = this.radios
      let flag = false
      this.$confirm('是否提交评教结果?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        if (radios.length === 10) {
          for (let i = 0; i < radios.length; i++) {
            if (typeof (radios[i]) == "undefined") {
              flag = true
              break
            }
          }

          if (flag) {
            this.$message.error('还有未选的选项')
          } else {
            // 交互代码
            // 组合发送对象
            let evalItemList = this.evalItemList
            let weightList = []
            for (let i = 0; i < evalItemList.length; i++) {
              weightList.push(evalItemList[i].weight)
            }
            console.log(weightList)

            let index = this.commitIndex
            let params = new URLSearchParams()
            params.append('radios', this.radios)
            params.append('weights', weightList)
            params.append('userId', this.evalList[index].userId)
            params.append('roleId', this.evalList[index].roleId)
            params.append('targetId', this.evalList[index].targetId)
            params.append('courseId', this.evalList[index].courseId)
            commitEval(params).then(res => {
              // 提交后，隐藏开始评教按钮
              // this.disableList[index] = false
              this.$message({
                type: 'success',
                message: '提交成功'
              })
              this.dialogVisible = false
              this.radios = []
            })
          }

        } else {
          this.$message.error('还有未选的选项')
        }
      }).catch(() => {
        console.log('取消')
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
