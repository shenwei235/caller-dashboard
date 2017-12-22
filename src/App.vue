<template>
  <div id="app" :class="currentPageClass">
    <router-view v-if="readyRender"></router-view>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      readyRender: false
    };
  },
  computed: {
    ...mapGetters(["currentPageClass"])
  },
  mounted() {
    var self = this;
    var loadingInstance = self.$loading();
    // todo 用户验证
    window.setTimeout(function() {
      loadingInstance.close();
      self.readyRender = true;
    }, 500);
  },
  methods: {
    ...mapActions(["setCurrentUser"])
  }
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
  min-height: 100%;
  position: relative;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

input,
textarea,
button {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.el-breadcrumb__item__inner:hover {
  color: rgb(72, 106, 98);
  cursor: text;
}
@import "assets/less/common";
</style>
