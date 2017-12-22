<template>
  <div id="dashboard">
    <el-row>
      <el-col :span="3">
        <main-sidebar :menu="mainRoutes"></main-sidebar>
      </el-col>
      <el-col :span="3">
        <secondary-sidebar :menu="secondaryRoutes"></secondary-sidebar>
      </el-col>
      <el-col :span="18">
        <div class="grid-content bg-blue-light">
          <router-view></router-view> 
        </div>
      </el-col>
    </el-row>   
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { routesArr } from '@/router';   
export default {
  data() {
    return {
      mainRoutes: [],
      secondaryRoutes: [],
    }
  },
  watch: {
    '$route' (to, from) {
      this.mainRoutes = [];
      this.secondaryRoutes = [];
      this.initSidebars(); 
    }
  },   
  methods: {       
    ...mapActions(["setPageClass"]),
    initSidebars() {
      let self = this, parent_name;
      if(self.$route && self.$route.meta && self.$route.meta.parent_name) {
        parent_name = self.$route.meta.parent_name;
      }
      if(routesArr && routesArr.length) {
        routesArr.map(function(item) {
          if(item.name === 'dashboard') {
            if(item.children && item.children.length) {
              item.children.map(function(c, inx) {
                self.mainRoutes.push({
                  path: (c.meta && c.meta.start_path ? c.meta.start_path : ''),
                  title: c.title,
                  icon: (c.meta && c.meta.icon ? c.meta.icon : ''),
                  index: inx + '',
                  active: parent_name == c.name
                });
                if(parent_name == c.name) {
                  if(c.children && c.children.length) {
                    c.children.map(function(b, i) {
                      self.secondaryRoutes.push({
                        path: (b.meta && b.meta.full_path ? b.meta.full_path : ''),
                        title: b.title,
                        icon: (b.meta && b.meta.icon ? b.meta.icon : ''),
                        index: i + '',
                        active: b.name == self.$route.name
                      });
                    });
                  }
                }
              });
            }
          }
        })
      }   
    },
  },     
  created () {      
    this.setPageClass('dashboard-wrap');     
  },
  mounted() {    
    this.initSidebars();   
  },
  components: {
    'main-sidebar': require('@/components/common/main_sidebar.vue'),
    'secondary-sidebar': require('@/components/common/secondary_sidebar.vue'),
  }   
};
</script>