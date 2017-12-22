<template>
  <div class="form-wrap">
    <el-form :model="form" :rules="rules" ref="loginForm" label-width="80px" class="login-form">
      <h2>用户登录</h2>
      <el-form-item label="用户名" prop="account">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="btn-login" :loading="wait" type="primary" size="large" @click="submitForm('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import core from "../libs/ajax";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        account: "",
        password: ""
      },
      wait: false,
      rules: {
        account: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      var self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          self.wait = true;
          core
            .post("/userLogon/adminLogin", {
              account: self.form.account,
              password: self.form.password
            })
            .done(function(data) {
              setTimeout(function() {
                self.wait = false;
                let res = [data];
                if (res && res.length > 0) {
                  localStorage.setItem("ms_role", res);
                  const PUSHNAME = {
                    productRole: "source_list",
                    operatRole: "organize_structure"
                  };
                  if (res[0] && PUSHNAME[res[0]]) {
                    self.$message("登录成功!");
                    self.$router.push({
                      name: PUSHNAME[res[0]]
                    });
                    self.setRoleInfo(res);
                  } else {
                    self.$message("无权限登录!");
                  }
                } else {
                  self.$message.error("无权限登录!");
                }
              }, 500);
            })
            .fail(function(code, msg) {
              self.wait = false;
              self.$message.error(msg);
            });
        } else {
          return false;
        }
      });
    },
    ...mapActions(["setRoleInfo"])
  }
};
</script>
<style lang="less">
.form-wrap {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}

.login-form {
  width: 420px;
  border: 1px solid #eaeefb;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px 45px 10px 25px;
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
  > h2 {
    text-align: center;
    margin: 0;
    font-size: 20px;
    color: #888;
    padding: 20px 0 30px 0;
  }
  .btn-login {
    display: block;
    width: 100%;
  }
}
</style>
