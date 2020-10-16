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
            <div class="text">
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
            <div class="text">
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
            <div class="text">
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
          <div class="out-border" id="notice">
            <div class="layout-title" style="position: relative">
              通知公告
              <a
                href="#"
                target="_blank"
                style="position: absolute; right: 10px"
                >更多+</a
              >
            </div>
            <ul>
              <li>
                <span>2020-10-09</span
                ><a
                  href="#"
                  target="_blank"
                  title="重庆工程学院2019-2020年度教师评价已开始"
                  >重庆工程学院2019-2020年度教师评价已开始</a
                >
              </li>
              <li>
                <span>2020-09-13</span
                ><a href="#" target="_blank" title="重庆工程学院2019-2020年度教师评价已开始"
                  >重庆工程学院2019-2020年度教师评价已开始</a
                >
              </li>
              <li>
                <span>2020-09-13</span
                ><a
                  href="#"
                  target="_blank"
                  title="重庆工程学院2019-2020年度教师评价已开始"
                  >重庆工程学院2019-2020年度教师评价已开始</a
                >
              </li>
              <li>
                <span>2020-08-20</span
                ><a
                  href="#"
                  target="_blank"
                  title="重庆工程学院2019-2020年度教师评价已开始"
                  >重庆工程学院2019-2020年度教师评价已开始</a
                >
              </li>
              <li>
                <span>2020-08-13</span
                ><a
                  href="#"
                  target="_blank"
                  title="重庆工程学院2019-2020年度教师评价已开始 "
                  >重庆工程学院2019-2020年度教师评价已开始</a
                >
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="statistics-layout">
      <div class="layout-title">班级学生情况展示</div>
      <el-row>
        <el-col :span="20">
          <div style="padding: 10px; border-left: 1px solid #dcdfe6">
            <div>
              <ve-histogram :data="chartVeData" :extend="extend"></ve-histogram>
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
import { classCount,classCountUserAll,classCountUser,getAllClassList } from '@/api/class'

export default {
  name: 'home',
  data() {
    this.extend = {
      series: {
        barWidth:30
      }
    }
    return {
      countStudent: 0,
      countTeacher: 0,
      countClass: 0,
      countDepartment: 0,
      classCount: 0,
      classUserNum: 0,
      classUserNumComplete: 0,
      classList: '',
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
      img_home_yesterday_amount,
      chartVeData: {}
    }
  },
  created() {
    this.initOrderCountDate()
    this.getCount()
    this.getCountClass()
  },
  methods: {
    initOrderCountDate() {
      let start = new Date()
      start.setFullYear(2018)
      start.setMonth(10)
      start.setDate(1)
      const end = new Date()
      end.setTime(start.getTime() + 1000 * 60 * 60 * 24 * 7)
      this.orderCountDate = [start, end]
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
      }),
      classCount().then(Response =>{
        this.classCount = Response.data;
      }),
      getAllClassList().then(Response =>{
        this.classList = Response.data;
      })
    },
    getCountClass(){
      classCountUserAll().then(Response =>{
        this.chartVeData = Response.data;
      }),
      classCountUser(this.chartVeData.classno).then(Response =>{
        this.classUserNumComplete = Response.data;
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
.box-card:hover .el-icon-user{
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
.box-card:hover .el-icon-s-custom{
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
.box-card:hover .el-icon-s-promotion{
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
.box-card:hover .el-icon-school{
  background-color:rgb(52,191,163);
  color: #fff;
}
.text ul li:last-child{
  margin-top: 10px;
}
.textSpan{
  color: rgb(140,140,140);
  font-size: 15px;
}
.textSpan2{
  font-size: 20px;
}
#notice ul li {
  /* width: 376px; */
  height: 32px;
  text-align: left;
  position: relative;
}
#notice ul li span {
  float: right;
  font: 13px/32px "微软雅黑";
  color: #a5a5a5;
  position: absolute;
  right: 10px;
}
#notice ul li a {
  color: #272727;
  font: 13px/32px "微软雅黑";
  overflow: hidden;
  display: block;
  width: 400px;
  height: 32px;
}
#notice ul li a:hover{
  color: rgb(255, 108, 10);
}
</style>
