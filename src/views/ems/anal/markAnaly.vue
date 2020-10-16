<template>
<div>
  <div v-if="this.rows.length != 0">
      <ve-histogram :data="chartData" :settings="chartSettings" :extend="extend" style="width:500px;margin-left:500px"></ve-histogram>
  </div>
  <div v-if="this.rows.length == 0" style="margin-left:750px;margin-top:200px;font-size:20px">
    暂无数据
  </div>
</div>
</template>
<script>
import {getAllMark} from '@/api/anal';
import VeHistogram from 'v-charts/lib/histogram.common'

export default {
  components: { VeHistogram },

  data () {
    this.extend = {
        series: {
          barWidth: 30,
          label: { show: true, position: "top" }
        }
    }
    this.chartSettings = {
        // radius:100,
        // offsetY:200
        // max:[100,100]
    }
    return {
      chartData:{},
      rows:null
    }
  },
  created() {
      this.courseId = this.$route.query.courseId;
      getAllMark(this.courseId).then(response => {
        this.chartData = response.data
        this.rows = response.data.rows
        console.log(this.rows+"rows")

      })
  },
  methods: {

  }
}
</script>
