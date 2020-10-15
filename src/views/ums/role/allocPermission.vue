<template>
  <el-card class="form-container" shadow="never">
    <el-tree
      :data="permissionTreeList"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps">
    </el-tree>
    <div style="margin-top: 20px" align="center">
      <el-button type="primary" @click="handleSave()">分配权限</el-button>
      <el-button @click="handleClear()">清空权限</el-button>
    </div>

  </el-card>
</template>

<script>
  import {allocPermission,listPermissionByRole,} from '@/api/role';
  import {fetchTreeList,} from '@/api/permission';

  export default {
    name: "allocPermission",
    data() {
      return {
        permissionTreeList: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        roleId: null,
        
      };
    },
    created() {
      this.roleId = this.$route.query.roleId;
      this.treeList();
      this.getRolePermission(this.roleId);
    },
    methods:{
      treeList() {
        fetchTreeList().then(response => {
          this.permissionTreeList = response.data;
        });
      },
      getRolePermission(roleId){
        listPermissionByRole(roleId).then(response=>{
          let permissionList = response.data;
          let checkedPermissionIds=[];
          if(permissionList!=null&&permissionList.length>0){
            for(let i=0;i<permissionList.length;i++){
              console.info("111");
              let per = permissionList[i];
              console.log(per)
              // if(menu.parentId!==0){
                checkedPermissionIds.push(per.id);
                console.info(per.id);
              // }
            }
          }
          this.$refs.tree.setCheckedKeys(checkedPermissionIds);
        });
      },
      handleClear() {
        this.$refs.tree.setCheckedKeys([]);
      },
      handleSave() {
        let checkedNodes = this.$refs.tree.getCheckedNodes();
        let checkedPermissionIds=new Set();
        if(checkedNodes!=null&&checkedNodes.length>0){
          for(let i=0;i<checkedNodes.length;i++){
            let checkedNode = checkedNodes[i];
            checkedPermissionIds.add(checkedNode.id);
          }
        }
        this.$confirm('是否分配菜单？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          let params = new URLSearchParams();
          params.append("roleId",this.roleId);
          params.append("permissionIds",Array.from(checkedPermissionIds));
          // this.menuIds = Array.from(checkedMenuIds);
          allocPermission(params).then(response => {
            this.$message({
              message: '分配成功',
              type: 'success',
              duration: 1000
            });
            this.$router.back();
          })
        })
      }
    
    }
    
  }
</script>

<style scoped>
  .table-layout {
    padding: 20px;
    border-left: 1px solid #DCDFE6;
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
  }

  .top-line {
    border-top: 1px solid #DCDFE6;
  }
</style>
