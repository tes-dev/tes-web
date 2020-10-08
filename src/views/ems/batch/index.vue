<template>
  <div class="app-container" style="width: 80%; margin: 50px auto">
    <el-row
      v-for="(semester, index) in semesterList"
      :key="index"
      :gutter="6"
      type="flex"
      justify="space-around"
      style="margin-top: 20px"
    >
      <el-col :span="10" v-for="item in semester" :key="item.id">
        <el-card shadow="hover">
          <div class="card-container">
            {{ item.name }}
            <el-switch
              v-model="value"
              :active-value="1"
              :inactive-value="0"
              active-text="开启"
              inactive-text="未开启"
              @change="handleStatusChange()"
            ></el-switch>
            <el-button type="text" @click="handleSetting()"
              >设置评教指标</el-button
            >
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible">
      <h1>dialog</h1>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList } from '@/api/batch'
export default {
  name: "anal",
  data() {
    return {
      semesterList: null,
      value: true,
      dialogVisible: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      fetchList().then(res => {
        // 将一维数组转换为二维数组
        this.change2Array(res.data)
      })
    },
    change2Array(arr) {
      let baseArray = arr
      let len = baseArray.length
      let n = 2
      let lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1)
      let res = []
      for (let i = 0; i < lineNum; i++) {
        let temp = baseArray.slice(i * n, i * n + n)
        res.push(temp)
      }
      this.semesterList = res
    },
    handleStatusChange() {
      this.$confirm('是否要修改该状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let value = this.value
        this.value = !value
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        })
        this.getList()
      })
    },
    handleSetting() {
      this.dialogVisible = true
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
</style>
