<template>
  <div>
    <transition name="rotate">
      <div class="register" v-show="changeAction">
        <div class="register-wrapper">
          <div class="logo">
            <div class="logo-bg"></div>
          </div>
          <div class="action">
            <p class="text">账号{{action}}/<span @click="change">点击{{noAction}}</span></p>
          </div>
          <div class="register-input">
            <div class="userName">
              <input type="text" placeholder="账号名" v-model="userName">
            </div>
            <div class="passWord">
              <input type="password" placeholder="密码" v-model="userPwd">
            </div>
            <p v-show="isError" class="error-text">{{errorText}}</p>
          </div>
          <div class="tip">
            <p class="text">
              温馨提示：未注册饿了么帐号的手机号，登录时将自动注册，且代表您已同意<span> 《用户服务协议》</span>
              </p>
          </div>
          <div class="register-button">
            <button class="confirm-register" type="button" v-show="this.log.num === 1" @click="register">{{action}}</button>
            <button class="confirm-register" type="button" v-show="this.log.num === 0" @click="login">{{action}}</button>
          </div>
          <div class="about">
            <div class="text">关于我们</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default{
    props: {
      log: {
        type: Object,
        default: {num: 0}
      }
    },
    data() {
      return {
        userName: '',
        userPwd: '',
        changeAction: true,
        errorText: '',
        isError: false
      }
    },
    computed: {
      action() {
        return this.log.num === 0 ? '登陆' : '注册'
      },
      noAction() {
        return this.log.num === 1 ? '登陆' : '注册'
      }
    },
    methods: {
      register() {
        this.$http.post('users/register', {
          userName: this.userName,
          userPwd: this.userPwd
        }).then((res) => {
          res = res.data
          if (res.status !== '0') {
            this.isError = true
            this.errorText = res.result
          } else {
            this.isError = false
            this.errorText = ''
            this.change()
          }
        })
      },
      change() {
        if (this.log.num === 1) {
          this.log.num = 0
          this.changeAction = false
        } else {
          this.log.num = 1
          this.changeAction = false
        }
        setTimeout(() => {
          this.changeAction = true
        }, 300)
      },
      login() {
        this.$http.post('/users/login', {
          userName: this.userName,
          userPwd: this.userPwd
        }).then((res) => {
          res = res.data
          if (res.status === '0') {
            this.$router.push('/good')
            this.isError = false
            this.errorText = ''
          } else {
            this.isError = true
            this.errorText = res.result
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import '../../common/st/register/register.css'
</style>