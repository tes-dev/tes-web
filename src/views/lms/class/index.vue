<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right;margin-top:35px"
          type="primary"
          @click="handleSearchList()"
          size="small"
        >
          查询搜索
        </el-button>
        <el-button
          style="float: right; margin-right: 15px;margin-top:35px"
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
              placeholder="班级名称"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button class="btn-add" @click="handleAddClass()" size="mini">
        添加班级
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
        <el-table-column label="班级名称" align="center" >
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="班级代码"  align="center">
          <template slot-scope="scope">{{ scope.row.no }}</template>
        </el-table-column>
        
        <el-table-column label="学院" width="200" align="center">
          <template slot-scope="scope">
            <!-- {{ scope.row.deptNo }} -->
            <div v-if="scope.row.deptNo == '01101'">计算机与物联网学院</div>
            <div v-else-if="scope.row.deptNo == '01102'">软件学院</div>
            <div v-else-if="scope.row.deptNo == '01103'">电子信息学院</div>
            <div v-else-if="scope.row.deptNo == '01104'">土木工程学院</div>
            <div v-else-if="scope.row.deptNo == '01105'">数字艺术学院</div>
            <div v-else-if="scope.row.deptNo == '01106'">管理学院</div>
            <div v-else-if="scope.row.deptNo == '01107'">大数据与人工智能学院</div>
            <div v-else-if="scope.row.deptNo == '02101'">通识学院</div>
            <div v-else-if="scope.row.deptNo == '009'">第九学院2</div>
            <div v-else-if="scope.row.deptNo == '01109'">软件与计算机学院</div>
            <div v-else>未知</div>
          </template>
        </el-table-column>

        <!-- <el-table-column label="是否显示" width="200" align="center">
        <el-table-column label="所属院系" width="250" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleShowStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.showStatus"
            >
            </el-switch>
          </template>
        </el-table-column> -->

        <el-table-column label="操作" width="245" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleUpdate(scope.$index, scope.row)"
              >编辑班级
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.$index, scope.row)"
              >删除班级
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
        <el-form-item label="院系：">
          <!-- <el-input v-model="tesclass.deptNo" style="width: 250px"></el-input> -->
          <el-select v-model="tesclass.deptNo" placeholder="请选择" style="width: 250px">
            <el-option
             v-for="item in deptnoArr"
             :key="item.id"
             :label="item.name"
             :value="item.no"></el-option>
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
import { fetchList, deleteClass, updateClass, createClass } from '@/api/class'
import { AllDeptList } from '@/api/dept'
const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null
}
const defaultTesclass = {
  id: null,
  name: null,
  no: null,
  deptNo: null
}
export default {
  name: "classManagementList",
  data() {
    return {
      deptnoArr:[],
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
    this.getAllDepartList()
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
      this.dialogVisible = true;
      this.isEdit = true;
      this.tesclass = Object.assign({},row);
      this.tesclass.deptNo = this.tesclass.deptNo + ""
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
    },
    getAllDepartList(){
      AllDeptList().then(response => { 
        this.deptnoArr = response.data
      })
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery)
    },
    handleSearchList() {
      this.listQuery.pageNum = 1
      this.getList()
    }
  
  }
}
</script>

<style scoped>
</style>
