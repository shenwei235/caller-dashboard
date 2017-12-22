<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo logo-width">
        {{sysName}}
      </el-col>
      <el-col :span="10">

      </el-col>
      <el-col :span="4" class="userinfo">
      <el-dropdown trigger="hover">
      <span class="el-dropdown-link userinfo-inner">管理员</span>
      <el-dropdown-menu slot="dropdown">
      <!-- <el-dropdown-item>我的消息</el-dropdown-item>
      <el-dropdown-item>设置</el-dropdown-item> -->
       <!-- <el-dropdown-item>设置</el-dropdown-item> -->
       <el-dropdown-item  @click.native="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside class='menu-expanded'>
        <!--导航菜单-->
            <el-menu :default-active="$route.name" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" unique-opened  v-show="!collapsed">
            <template v-for="(item,index) in $router.options.routes[0].children" v-if="!item.hidden && item.meta.role.indexOf(roleInfo[0]) > -1">
            <el-submenu :index="index+''" v-if="item.leaf">
            <template slot="title">
            <i :class="item.iconCls"></i>{{item.title}}</template>
             <div v-for="child in item.children" :key="child.name">
                 <el-menu-item :index="child.path" :key="child.name" v-if="!child.hidden && !child.children && child.meta.role.indexOf(roleInfo[0]) > -1">{{child.title}}</el-menu-item>
                <el-submenu :index="child.path" :key="child.name" v-if="!child.hidden && child.children && child.children.length>0 && child.meta.role.indexOf(roleInfo[0]) > -1">
              <template slot="title">{{child.title}}</template>
              <el-menu-item v-for="list in child.children" :key="list.name" :index="list.name" v-if="!list.hidden && list.meta.role.indexOf(roleInfo[0]) > -1">{{list.title}}</el-menu-item>
              </el-submenu>
             </div>
            </el-submenu>
            <!-- <el-menu-item v-if="item.leaf&&item.children.length>0" v-for="item.children" :index="item.children[0].path">
            <i :class="item.iconCls"></i>{{item.children[0].title}}</el-menu-item> -->
            <template v-if="!item.leaf&& !item.level&&item.meta.role.indexOf(roleInfo[0]) > -1">
            <el-menu-item :index="item.path" :key="item.name" v-if="!item.hidden">{{item.title}}</el-menu-item>
            </template>
            <template v-if="item.level&&item.children.length>0&&item.meta.role.indexOf(roleInfo[0]) > -1">
            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">
            <i :class="item.iconCls"></i>{{child.title}}
            </el-menu-item>
            </template>
            </template>
        </el-menu>
        <!--导航菜单-折叠后-->
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">{{routeNames[$route.name]}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{ routeNames[item.name] }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      sysName: "权限管理系统",
      collapsed: false,
      sysUserName: "",
      sysUserAvatar: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      routeNames: {}
    };
  },
  computed: {
    ...mapGetters(["roleInfo"])
  },
  created() {
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleopen() {
      // console.log('handleopen');
    },
    handleclose() {
      // console.log('handleclose');
    },
    init() {
      let routeNames = {};
      let routeFun = arr => {
        for (let i = 0; i < arr.length; i++) {
          routeNames[arr[i]["name"]] = arr[i]["title"];
          if (arr[i]["children"] && arr[i]["children"].length > 0) {
            routeFun(arr[i]["children"]);
          }
        }
      };
      routeFun(this.$router.options.routes);
      this.routeNames = routeNames;
    },
    handleselect: function(a, b, c) {
      this.$router.push({name: a});
    },
    // 退出登录
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        // type: 'warning'
      })
        .then(() => {
          localStorage.removeItem("ms_role");
          _this.$router.push("/login");
        })
        .catch(() => {});
    },
    // 折叠导航栏
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style scoped lang="less">
// @import '~scss_vars';
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: #13ce66;
    color: #fff;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }
    .logo {
      //width:230px;
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3); // border-right-width: 1px;
      // border-right-style: solid;
      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }
      .txt {
        color: #fff;
      }
    }
    .logo-width {
      width: 230px;
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    display: flex; // background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    aside {
      flex: 0 0 230px;
      width: 230px; // position: absolute;
      // top: 0px;
      // bottom: 0px;
      .el-menu {
        height: 100%;
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
    }
    .content-container {
      // background: #f1f2f7;
      flex: 1; // position: absolute;
      // right: 0px;
      // top: 0px;
      // bottom: 0px;
      // left: 230px;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        //margin-bottom: 15px;
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        // background-color: #fff;
        // box-sizing: border-box;
      }
    }
  }
}
.el-breadcrumb__item__inner:hover {
  color: red;
  cursor: pointer;
}
</style>