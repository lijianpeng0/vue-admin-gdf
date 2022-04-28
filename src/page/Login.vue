<template>
  <div class="login_container">
    <div class="login_box">
      <div class="login-img"></div>
      <div class="login-content">
        <p><span>登录</span></p>
        <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"
              placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="orgNo">
            <el-input v-model="loginForm.orgNo" prefix-icon="iconfont icon-3702mima" placeholder="请输入公司机构号"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn_item">
          <el-button type="primary" @click="login">登录</el-button>
          <!-- <el-button type="info" @click="resetForm">重置</el-button> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        orgNo: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () { },
  methods: {
    // 重置表单
    resetForm () {
      console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    // 登录
    login () {
      // 表单预校验
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return this.$message.warning('请输入用户信息!')

        const { data: res } = await this.$http.post('login', this.loginForm)
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: url('../assets/login-bg.png') no-repeat;
  background-size: cover;

  .login_box {
    display: flex;
    width: 60%;
    height: 70%;
    background-color: #fff;

    .login-img {
      width: 50%;
      background: url('../assets/login.png') no-repeat;
      background-size: cover;

    }

    .login-content {
      display: flex;
      height: 100%;
      width: 50%;
      padding: 0% 8%;
      box-sizing: border-box;
      flex-direction: column;

      p {
        display: flex;
        align-items: center;
        flex: 3;

        span {
          position: relative;
          font-size: 2vw;
          font-weight: normal;

          &::after {
            position: absolute;
            bottom: -15px;
            left: 0;
            height: 8px;
            width: 4vw;
            content: ' ';
            background-color: #668bff;
            overflow: hidden;
            border-radius: 5px;
          }
        }

      }

      .el-form {
        flex: 4;
        height: 100%;
        width: 100%;
        flex-direction: column;

        /deep/.el-form-item {
          height: 3vw;

          .el-form-item__content {
            height: 3vw;
          }

          .el-input {
            padding-left: 2vw;
            background-color: #ecedf3;
            border-radius: 2vw;
            overflow: hidden;
            box-sizing: border-box;
          }

          .el-input__inner {
            height: 3vw;
            line-height: 3vw;
            font-size: 1vw;
            font-weight: normal;
            border: 0;
            padding-left: 1vw;
            background-color: #ecedf3;

          }

          .el-input__icon {
            font-size: 1vw;
            margin-left: 20px;
          }

          .el-form-item__error {
            left: 40px;
          }
        }

      }

      .btn_item {
        flex: 3;

        .el-button {
          height: 3vw;
          line-height: 3vw;
          width: 100%;
          padding: 0;
          font-size: 1vw;
          border-radius: 1.5vw;
          background-color: #6d88ff;
        }
      }
    }

  }
}
</style>
