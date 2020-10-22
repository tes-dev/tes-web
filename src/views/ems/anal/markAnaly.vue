<template>
<div>
  <div v-if="this.rows.length != 0">
      <ve-histogram :data="chartData" :settings="chartSettings" :extend="extend" style="width:500px;margin-left:500px;margin-top:50px"></ve-histogram>
  </div>
  <div v-if="this.rows.length == 0" style="margin-left:750px;margin-top:200px;font-size:20px">
    暂无数据
  </div>
</div>
</template>
<script>
import {getAllMark} from '@/api/anal';
import VeHistogram from 'v-charts/lib/histogram.common'
import { setSupport, getSupport, setCookie, getCookie } from '@/utils/support'

export default {
  components: { VeHistogram },

  data () {
    this.extend = {
        series: {
          barWidth: 30,
          label: { show: true, position: "top" }
        },
        grid : {
          top:100

        }
        // color:['rgb(97,160,169)'],
    }
    this.chartSettings = {

    }
    return {
      chartData:{},
      rows:null,
      no:null
    }
  },
  created() {
      this.courseId = this.$route.query.courseId;
      this.no = getCookie("no");
      console.log(this.no+"this.no")
      let params = new URLSearchParams()
            params.append('courseId', this.courseId)
            params.append('no', this.no)
      getAllMark(params).then(response => {
        this.chartData = response.data
        this.rows = response.data.rows
        console.log(this.rows+"rows")

      })
  },
  methods: {

  }
}
</script>
