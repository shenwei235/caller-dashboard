<template>
<div id="main-sidebar">
	<el-menu
    background-color="blue"
    text-color="#fff">
    <el-menu-item :index="item.index" v-for="item in menu" :key="item.path" :class="{'active': item.active}" @click="goToPage(item.path)">
      <i :class="item.icon"></i>
      <span slot="title">{{item.title}}</span>
    </el-menu-item>
  </el-menu>	
</div>
</template>
<script>
export default {
  props: ['menu'],
  methods: {
    goToPage: function(path) {
      if(path) {
        this.$router.push(path);
      }
    }
  }
}
</script>
<style lang="less">
#main-sidebar {
  .el-menu-item.is-active {
    color: #fff !important;
  }
  .el-menu-item.active {
    color: red !important;
  }
}
</style>