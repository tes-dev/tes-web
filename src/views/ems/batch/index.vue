<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>批次列表</span>
      <el-button
        size="mini"
        class="btn-add"
        type="second"
        @click="handleAdd()"
        style="margin-left: 20px"
        >增加学年</el-button
      >
    </el-card>
    <div class="table-container">
      <el-table
        ref="adminTable"
        :data="semesterList"
        style="width: 100%"
        v-loading="listLoading"
        border
        fit
      >
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="学年名称" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
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
              @click="handleEval(scope.$index, scope.row)"
            >
              编辑批次评教
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
    <el-dialog title="新增学年" :visible.sync="dialogVisible" width="40%">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="学年信息" name="first">
          <el-form
            :model="semester"
            ref="adminForm"
            label-width="100px"
            size="small"
          >
            <el-form-item label="学年名称：" style="margin-top: 10px">
              <el-input v-model="semester.name" style="width: 250px"></el-input>
            </el-form-item>
            <el-form-item label="是否启用：">
              <el-radio-group v-model="semester.status">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="学生评教" name="second">
          <el-table
            :data="indexData"
            style="width: 100%"
            :header-cell-class-name="cellclass"
            @selection-change="handleSelectionChange1"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="指标信息" width="500px">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column label="指标权重">
              <template slot-scope="scope">
                {{ scope.row.weight }}
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="教师同行评教" name="third">
          <el-table
            :data="indexData"
            style="width: 100%"
            :header-cell-class-name="cellclass"
            @selection-change="handleSelectionChange2"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="指标信息" width="500px">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column label="指标权重">
              <template slot-scope="scope">
                {{ scope.row.weight }}
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="领导评教" name="fourth">
          <el-table
            :data="indexData"
            style="width: 100%"
            :header-cell-class-name="cellclass"
            @selection-change="handleSelectionChange3"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="指标信息" width="500px">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column label="指标权重">
              <template slot-scope="scope">
                {{ scope.row.weight }}
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="设置评教表"
      :visible.sync="dialogEvalVisible"
      width="40%"
      @close="closeDialog()"
    >
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="学年信息" name="first">
          <el-form
            :model="semester"
            ref="adminForm"
            label-width="100px"
            size="small"
          >
            <el-form-item label="学年名称：" style="margin-top: 10px">
              <el-input v-model="semester.name" style="width: 250px"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="学生评教" name="second">
          <el-table
            :data="indexData"
            style="width: 100%"
            :header-cell-class-name="cellclass"
            @selection-change="handleSelectionChange1"
            ref="multipleTable1"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="指标信息" width="500px">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column label="指标权重">
              <template slot-scope="scope">
                {{ scope.row.weight }}
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="教师同行评教" name="third">
          <el-table
            :data="indexData"
            style="width: 100%"
            :header-cell-class-name="cellclass"
            @selection-change="handleSelectionChange2"
            ref="multipleTable2"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="指标信息" width="500px">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column label="指标权重">
              <template slot-scope="scope">
                {{ scope.row.weight }}
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="领导评教" name="fourth">
          <el-table
            :data="indexData"
            style="width: 100%"
            :header-cell-class-name="cellclass"
            @selection-change="handleSelectionChange3"
            ref="multipleTable3"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="指标信息" width="500px">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column label="指标权重">
              <template slot-scope="scope">
                {{ scope.row.weight }}
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEvalVisible = false" size="small"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="handleUpdateDialogConfirm()"
          size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, save, deleteById, update, deleteEval } from '@/api/batch'
import { getEvalControlList, updateStatus, getEvalList } from '@/api/eval'
import { getAllIndexList } from '@/api/anal'

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null
}

const defaultSemester = {
  name: null,
  status: 0
}

export default {
  name: "anal",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      semester: Object.assign({}, defaultSemester),
      semesterList: null,
      dialogVisible: false,
      dialogEvalVisible: false,
      listLoading: false,
      total: null,
      activeName: 'first',
      indexData: null,
      studentCheckIds: [],
      teacherCheckIds: [],
      leaderCheckIds: [],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      // 获取学期列表
      fetchList(this.listQuery).then(res => {
        this.listLoading = false
        this.semesterList = res.data.list
        this.total = res.data.total
      })
      // 获取所有指标
      getAllIndexList().then(res => {
        this.indexData = res.data
      })

    },
    handleStatusChange(index, row) {
      this.$confirm('是否要修改该状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        updateStatus(row.id, { status: row.status }).then(res => {
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        })
        this.getList()
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
    handleAdd() {
      this.dialogVisible = true
    },
    handleDialogConfirm() {
      let params = new URLSearchParams()
      params.append('studentCheckIds', this.studentCheckIds)
      params.append('teacherCheckIds', this.teacherCheckIds)
      params.append('leaderCheckIds', this.leaderCheckIds)
      params.append('name', this.semester.name)
      params.append('status', this.semester.status)
      save(params).then(res => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.dialogVisible = false
        this.getList()
      })
    },
    handleUpdateDialogConfirm() {
      let params = new URLSearchParams()
      params.append('studentCheckIds', this.studentCheckIds)
      params.append('teacherCheckIds', this.teacherCheckIds)
      params.append('leaderCheckIds', this.leaderCheckIds)
      params.append('name', this.semester.name)
      params.append('id', this.semester.id)
      update(params).then(res => {
        this.$message({
          message: '更新成功',
          type: 'success'
        })
        this.dialogEvalVisible = false
        this.getList()
      })
    },
    handleDelete(index, row) {

      getEvalList(row.id).then(res => {
        this.studentCheckIds = res.data.student
        this.teacherCheckIds = res.data.teacher
        this.leaderCheckIds = res.data.leader
      })
      this.$confirm('是否要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new URLSearchParams()
        params.append('studentCheckIds', this.studentCheckIds)
        params.append('teacherCheckIds', this.teacherCheckIds)
        params.append('leaderCheckIds', this.leaderCheckIds)
        params.append('id', this.semester.id)
        deleteEval(params).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getList()
        })
      })
    },
    handleEval(index, row) {
      this.dialogEvalVisible = true

      this.semester = row
      getEvalList(row.id).then(res => {
        this.studentCheckIds = res.data.student
        this.teacherCheckIds = res.data.teacher
        this.leaderCheckIds = res.data.leader
        // 学生复选框回显
        this.studentCheckIds.forEach((item) => {
          this.$nextTick(function () {
            this.$refs.multipleTable1.toggleRowSelection(this.indexData[item - 1])
          })
        })
        // 教师
        this.teacherCheckIds.forEach((item) => {
          this.$nextTick(function () {
            this.$refs.multipleTable2.toggleRowSelection(this.indexData[item - 1])
          })
        })
        // 领导
        this.leaderCheckIds.forEach((item) => {
          this.$nextTick(function () {
            this.$refs.multipleTable3.toggleRowSelection(this.indexData[item - 1])
          })
        })

      })
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    cellclass(row) {
      if (row.columnIndex === 0) {
        return 'DisabledSelection'
      }
    },
    handleSelectionChange1(val) {
      if (val != null) {
        // console.log("change1", val)
        this.studentCheckIds = val.map(obj => obj.id)
      }

    },
    handleSelectionChange2(val) {
      if (val != null) {
        // console.log("change2", val)
        this.teacherCheckIds = val.map(obj => obj.id)
      }
    },
    handleSelectionChange3(val) {
      if (val != null) {
        // console.log("change3", val)
        this.leaderCheckIds = val.map(obj => obj.id)
      }
    },
    closeDialog() {
      this.activeName = 'first'
      this.studentCheckIds = []
      this.teacherCheckIds = []
      this.leaderCheckIds = []
      // 清空选中清空
      this.$nextTick(() => {
        this.$refs.multipleTable1.clearSelection()
        this.$refs.multipleTable2.clearSelection()
        this.$refs.multipleTable3.clearSelection()
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.card-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-table /deep/.DisabledSelection .cell .el-checkbox__inner {
  display: none;
  position: relative;
}
.el-table /deep/.DisabledSelection .cell:before {
  content: "选择";
  position: absolute;
  right: 11px;
}
</style>
