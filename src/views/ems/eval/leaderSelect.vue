<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right; margin-top:35px"
          type="primary"
          @click="handleSearchList()"
          size="small"
        >
          查询搜索
        </el-button>
        <el-button
          style="float: right; margin-right: 15px; margin-top:35px"
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
        <!-- <el-table-column label="课程编号" align="center">
          <template slot-scope="scope">{{ scope.row.num }}</template>
        </el-table-column> -->
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
            <el-row>
              <el-button
                size="mini"
                type="text"
                @click="markAnaly(scope.$index, scope.row)"
                >
                分数统计分析
              </el-button>
              <el-button size="mini"
                         type="text"
                         @click="teachingEvaluation(scope.$index, scope.row)"
                         >
                         课程评教情况
              </el-button>
            </el-row>
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

  </div>
</template>
<script>
import { updateAdmin, getRoleByAdmin, allocRole } from '@/api/login'
import { fetchAllSemesterList,allSemesterList } from '@/api/semester'
import { formatDate } from '@/utils/date'
import { getClassList } from '@/api/class'
import { getDeptList } from '@/api/dept'
import { getAllCount } from '@/api/anal'
import { leaderSelect,createAdmin,deleteAdmin,updateCourse } from '@/api/course'
import { setSupport, getSupport, setCookie, getCookie } from '@/utils/support'

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: null
}
const defaultAdmin = {
  id: null,
  name: null,
  num: null,
  semesterId:null
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
      courseUserCount:null,
      no:null,
    }
  },
  created() {
    this.no = getCookie("no")
    this.getList()
    this.getAllSemesterList()
    // this.getCourseUserCount()
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
    teachingEvaluation(index,row){
        // this.$router.push({path:'/ems/mixChart',query:{courseId:row.id}})
        this.$router.push({path:'/ems/vChart',query:{courseId:row.id}})
    },
    markAnaly(index,row){
        this.$router.push({path:'/ems/markAnaly',query:{courseId:row.id}})
    },
    getList() {
      this.listLoading = true
      leaderSelect(this.no).then(response => {
        this.listLoading = false
        this.list = response.data
        this.total = response.data.total
      })
    },
    // getCourseUserCount(index,row){
    //   getAllCount(row.id).then(response => {
    //       this.courseUserCount = response.data
    //       console.log(response.data)
    //   })
    // },
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

