<template>
  <ve-pie :data="chartData" :settings="chartSettings" :extend="extend" style="margin-top:50px"></ve-pie>
</template>

<script>
import {getCount,evaluatedCount} from '@/api/anal';
import VePie from 'v-charts/lib/pie.common'

export default {
  components: { VePie },
  data () {
    this.chartSettings = {
        radius:150,
        offsetY:240,


    }
    this.extend = {
      color:['rgb(47,69,83)','rgb(97,160,169)']
    }
    return {
      chartData:{}
    }
  },
  created() {
      this.courseId = this.$route.query.courseId;
      getCount(this.courseId).then(response => {
        this.chartData = response.data
      })
  },
  methods: {

  }
}
</script>
