<template>
  <ve-pie :data="chartData"></ve-pie>
</template>

<script>
import {getCount,evaluatedCount} from '@/api/anal';
import VePie from 'v-charts/lib/pie.common'

export default {
  components: { VePie },
  data () {
    return {
      // evaluated:null,
      // noEvaluationCount:null,
      chartData:{}
      // chartData: {
      //   columns: ['人数','访问用户'],
      //   rows: [
      //     {'人数': '已评教人数','访问用户':1},
      //     {'人数': '未评教人数','访问用户':2},
      //   ]
      // },
    }
  },
  created() {
      this.courseId = this.$route.query.courseId;
      getCount(this.courseId).then(response => {
        this.chartData = response.data
        // console.log(response.data);
      })
  },
  methods: {

  }
}
</script>
