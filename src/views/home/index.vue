<template>
  <div class="app-container">
    <div class="un-handle-layout">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card class="box-card">
            <div class="el-icon-user"></div>
            <div class="text">
              <ul>
                <li><span class="textSpan">学生总数</span></li>
                <li><span class="textSpan2" v-text="countStudent+'人'"></span></li>
              </ul>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card">
            <div class="el-icon-s-custom"></div>
            <div>
              <ul>
                <li><span class="textSpan">教师总数</span></li>
                <li><span class="textSpan2" v-text="countTeacher+'人'"></span></li>
              </ul>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card">
            <div class="el-icon-s-promotion"></div>
            <div>
              <ul>
                <li><span class="textSpan">班级总数</span></li>
                <li><span class="textSpan2" v-text="countClass+'班'"></span></li>
              </ul>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card">
            <div class="el-icon-school"></div>
            <div>
              <ul>
                <li><span class="textSpan">学院总数</span></li>
                <li><span class="textSpan2" v-text="countDepartment+'院'"></span></li>
              </ul>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="overview-layout">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">商品总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value"
                  >100</el-col
                >
                <el-col :span="6" class="color-danger overview-item-value"
                  >400</el-col
                >
                <el-col :span="6" class="color-danger overview-item-value"
                  >50</el-col
                >
                <el-col :span="6" class="color-danger overview-item-value"
                  >500</el-col
                >
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">已下架</el-col>
                <el-col :span="6" class="overview-item-title">已上架</el-col>
                <el-col :span="6" class="overview-item-title">库存紧张</el-col>
                <el-col :span="6" class="overview-item-title">全部商品</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">用户总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value"
                  >100</el-col
                >
                <el-col :span="6" class="color-danger overview-item-value"
                  >200</el-col
                >
                <el-col :span="6" class="color-danger overview-item-value"
                  >1000</el-col
                >
                <el-col :span="6" class="color-danger overview-item-value"
                  >5000</el-col
                >
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">今日新增</el-col>
                <el-col :span="6" class="overview-item-title">昨日新增</el-col>
                <el-col :span="6" class="overview-item-title">本月新增</el-col>
                <el-col :span="6" class="overview-item-title">会员总数</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="statistics-layout">
      <div class="layout-title">订单统计</div>
      <el-row>
        <el-col :span="4">
          <div style="padding: 20px">
            <div>
              <div style="color: #909399; font-size: 14px">本月订单总数</div>
              <div style="color: #606266; font-size: 24px; padding: 10px 0">
                10000
              </div>
              <div>
                <span class="color-success" style="font-size: 14px">+10%</span>
                <span style="color: #c0c4cc; font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px">
              <div style="color: #909399; font-size: 14px">本周订单总数</div>
              <div style="color: #606266; font-size: 24px; padding: 10px 0">
                1000
              </div>
              <div>
                <span class="color-danger" style="font-size: 14px">-10%</span>
                <span style="color: #c0c4cc; font-size: 14px">同比上周</span>
              </div>
            </div>
            <div style="margin-top: 20px">
              <div style="color: #909399; font-size: 14px">本月销售总额</div>
              <div style="color: #606266; font-size: 24px; padding: 10px 0">
                100000
              </div>
              <div>
                <span class="color-success" style="font-size: 14px">+10%</span>
                <span style="color: #c0c4cc; font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px">
              <div style="color: #909399; font-size: 14px">本周销售总额</div>
              <div style="color: #606266; font-size: 24px; padding: 10px 0">
                50000
              </div>
              <div>
                <span class="color-danger" style="font-size: 14px">-10%</span>
                <span style="color: #c0c4cc; font-size: 14px">同比上周</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <div style="padding: 10px; border-left: 1px solid #dcdfe6">
            <el-date-picker
              style="float: right; z-index: 1"
              size="small"
              v-model="orderCountDate"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="handleDateChange"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
            <div>
              <ve-line
                :data="chartData"
                :legend-visible="false"
                :loading="loading"
                :data-empty="dataEmpty"
                :settings="chartSettings"
              ></ve-line>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { str2Date } from '@/utils/date'
import img_home_order from '@/assets/images/home_order.png'
import img_home_today_amount from '@/assets/images/home_today_amount.png'
import img_home_yesterday_amount from '@/assets/images/home_yesterday_amount.png'
import { selectStudent,selectTeacher,selectClass,selectDepartment } from '@/api/home'
const DATA_FROM_BACKEND = {
  columns: ['date', 'orderCount', 'orderAmount'],
  rows: [
    { date: '2018-11-01', orderCount: 10, orderAmount: 1093 },
    { date: '2018-11-02', orderCount: 20, orderAmount: 2230 },
    { date: '2018-11-03', orderCount: 33, orderAmount: 3623 },
    { date: '2018-11-04', orderCount: 50, orderAmount: 6423 },
    { date: '2018-11-05', orderCount: 80, orderAmount: 8492 },
    { date: '2018-11-06', orderCount: 60, orderAmount: 6293 },
    { date: '2018-11-07', orderCount: 20, orderAmount: 2293 },
    { date: '2018-11-08', orderCount: 60, orderAmount: 6293 },
    { date: '2018-11-09', orderCount: 50, orderAmount: 5293 },
    { date: '2018-11-10', orderCount: 30, orderAmount: 3293 },
    { date: '2018-11-11', orderCount: 20, orderAmount: 2293 },
    { date: '2018-11-12', orderCount: 80, orderAmount: 8293 },
    { date: '2018-11-13', orderCount: 100, orderAmount: 10293 },
    { date: '2018-11-14', orderCount: 10, orderAmount: 1293 },
    { date: '2018-11-15', orderCount: 40, orderAmount: 4293 }
  ]
}
export default {
  name: 'home',
  data() {
    return {
      countStudent: 0,
      countTeacher: 0,
      countClass: 0,
      countDepartment: 0,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            let start = new Date()
            start.setFullYear(2018)
            start.setMonth(10)
            start.setDate(1)
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一月',
          onClick(picker) {
            const end = new Date()
            let start = new Date()
            start.setFullYear(2018)
            start.setMonth(10)
            start.setDate(1)
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      orderCountDate: '',
      chartSettings: {
        xAxisType: 'time',
        area: true,
        axisSite: { right: ['orderAmount'] },
        labelMap: { 'orderCount': '订单数量', 'orderAmount': '订单金额' }
      },
      chartData: {
        columns: [],
        rows: []
      },
      loading: false,
      dataEmpty: false,
      img_home_order,
      img_home_today_amount,
      img_home_yesterday_amount
    }
  },
  created() {
    this.initOrderCountDate()
    this.getData()
    this.getCount()
  },
  methods: {
    handleDateChange() {
      this.getData()
    },
    initOrderCountDate() {
      let start = new Date()
      start.setFullYear(2018)
      start.setMonth(10)
      start.setDate(1)
      const end = new Date()
      end.setTime(start.getTime() + 1000 * 60 * 60 * 24 * 7)
      this.orderCountDate = [start, end]
    },
    getData() {
      setTimeout(() => {
        this.chartData = {
          columns: ['date', 'orderCount', 'orderAmount'],
          rows: []
        }
        for (let i = 0; i < DATA_FROM_BACKEND.rows.length; i++) {
          let item = DATA_FROM_BACKEND.rows[i]
          let currDate = str2Date(item.date)
          let start = this.orderCountDate[0]
          let end = this.orderCountDate[1]
          if (currDate.getTime() >= start.getTime() && currDate.getTime() <= end.getTime()) {
            this.chartData.rows.push(item)
          }
        }
        this.dataEmpty = false
        this.loading = false
      }, 1000)
    },
    getCount(){
      selectStudent().then(Response =>{
        this.countStudent = Response.data;
      }),
      selectTeacher().then(Response => {
        this.countTeacher = Response.data;
      }),
      selectClass().then(Response => {
        this.countClass = Response.data;
      }),
      selectDepartment().then(Response => {
        this.countDepartment = Response.data;
      })
    }
  }
  
}
</script>

<style scoped>
ul{
  text-align: center;
}
li{
  list-style: none;
}
.app-container {
  margin-top: 40px;
  margin-left: 120px;
  margin-right: 120px;
}

.address-layout {
}

.total-layout {
  margin-top: 20px;
}

.total-frame {
  border: 1px solid #dcdfe6;
  padding: 20px;
  height: 100px;
}

.total-icon {
  color: #409eff;
  width: 60px;
  height: 60px;
}

.total-title {
  position: relative;
  font-size: 16px;
  color: #909399;
  left: 70px;
  top: -50px;
}

.total-value {
  position: relative;
  font-size: 18px;
  color: #606266;
  left: 70px;
  top: -40px;
}

.un-handle-layout {
  margin-top: 20px;
  border: 1px solid #dcdfe6;
  border: none;
}

.layout-title {
  color: #606266;
  padding: 15px 20px;
  background: #f2f6fc;
  font-weight: bold;
}

.un-handle-content {
  padding: 20px 40px;
}

.un-handle-item {
  border-bottom: 1px solid #ebeef5;
  padding: 10px;
}

.overview-layout {
  margin-top: 20px;
}

.overview-item-value {
  font-size: 24px;
  text-align: center;
}

.overview-item-title {
  margin-top: 10px;
  text-align: center;
}

.out-border {
  border: 1px solid #dcdfe6;
}

.statistics-layout {
  margin-top: 20px;
  border: 1px solid #dcdfe6;
}
.mine-layout {
  position: absolute;
  right: 140px;
  top: 107px;
  width: 250px;
  height: 235px;
}
.address-content {
  padding: 20px;
  font-size: 18px;
}
.box-card div{
  display: inline-block;
}
.box-card div:last-child{
  float: right;
  margin-top: 10px;
}
.el-icon-user{
  width: 70px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  font-size: 50px;
  color:rgb(64,201,198);
  margin-top: 10px;
  border-radius: 5px;
}
.el-icon-user:hover{
  background-color: rgb(64,201,198);
  color: #fff;
}
.el-icon-s-custom{
  width: 70px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  font-size: 50px;
  color:rgb(54,163,247);
  margin-top: 10px;
  border-radius: 5px;
}
.el-icon-s-custom:hover{
  background-color:rgb(54,163,247);
  color: #fff;
}
.el-icon-s-promotion{
  width: 70px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  font-size: 50px;
  color:rgb(244,81,108);
  margin-top: 10px;
  border-radius: 5px;
}
.el-icon-s-promotion:hover{
  background-color:rgb(244,81,108);
  color: #fff;
}
.el-icon-school{
  width: 70px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  font-size: 50px;
  color:rgb(52,191,163);
  margin-top: 10px;
  border-radius: 5px;
}
.el-icon-school:hover{
  background-color:rgb(52,191,163);
  color: #fff;
}
.textSpan{
  color: rgb(140,140,140);
  font-size: 15px;
}
.textSpan2{
  font-size: 20px;
}
</style>
