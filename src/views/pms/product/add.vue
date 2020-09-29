<template> 
  <!-- <product-detail :is-edit='false'></product-detail> -->
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>用户列表</span>
      <el-button
        size="mini"
        type="primary"
        class="btn-add"
        @click="handleAdd()"
        style="margin-left: 20px"
        >导入用户</el-button
      >
      <el-button
        size="mini"
        class="btn-add"
        type="second"
        @click="handleAdd()"
        style="margin-left: 20px"
        >添加用户</el-button
      >
    </el-card>
  </div>
</template>
<script>
  import ProductDetail from './components/ProductDetail'
  export default {
    name: 'addProduct',
    components: { ProductDetail }
  }
</script>
<style>
</style>
