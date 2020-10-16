<template>
  <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
</template>

<script>
import {getCount,evaluatedCount} from '@/api/anal';
import VePie from 'v-charts/lib/pie.common'

export default {
  components: { VePie },
  data () {
    this.chartSettings = {
        radius:100,
        offsetY:200
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
