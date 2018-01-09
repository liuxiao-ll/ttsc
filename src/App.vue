<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
        <div class="tab-item">
          <router-link :to="{path:'/good'}">商品</router-link>  
        </div>
        <div class="tab-item">
          <router-link :to="{path:'/ratings'}">评论</router-link>  
        </div>
        <div class="tab-item">
          <router-link :to="{path:'/seller'}">商家</router-link>  
        </div>
    </div>
    <keep-alive>
      <router-view :seller="seller" :log="log"></router-view>
    </keep-alive>
    <confirm :text="text" :btnText="btnText" ref="confirm" @confirm="confirm"></confirm>
  </div>
</template>

<script>
import { urlParse } from './common/js/util'
import header from './components/header/header.vue'
import confirm from './base/confirm/confirm.vue'
export default{
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse()
          return queryParam.id
        })()
      },
      text: '请先登录才能进行后续操作！',
      btnText: '确定',
      log: {}
    }
  },
  components: {
    vHeader: header,
    confirm
  },
  created() {
    this.$http.get('/goods').then((res) => {
      res = res.body
      if (res.status === '00') {
        this.seller = {'num': 0, 'path': res.result}
        this.$refs.confirm.show()
      }
      if (res.status === '0') {
        this.seller = Object.assign({}, this.seller, res.result.seller)
        this.$http.get('/goods/checkLogin').then((res) => {
          res = res.data
          if (res.status === '1') {
            this.$router.push('/register')
            this.log = {'num': 0, 'path': res.result}
            this.$refs.confirm.show()
          }
        })
      }
    })
  },
  mounted() {
    this.init()
  },
  methods: {
    confirm() {
      this.$router.push('/register')
      this.$refs.confirm.cancel()
    },
    init() {
      this.$http.get('/goods').then((res) => {
        res = res.body
        if (res.status === '0') {
          this.seller = Object.assign({}, this.seller, res.result.seller)
          this.$http.get('/goods/checkLogin').then((res) => {
            res = res.data
            if (res.status === '1') {
              this.log = {'num': 0, 'path': res.result}
              this.$refs.confirm.show()
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .tab{
    display: flex;
    width:100%;
    height: 40px;
    line-height: 40px;
    position: relative;
  }
  .tab:after{
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top:1px solid rgba(7, 17, 27, 0.1);
    content: ''
  }
  .tab-item{
    flex: 1;
    text-align: center;
    line-height: 40px;
  }
  .tab-item>a{
    display: block;
    font-size: 14px;
    line-height: 20px;
    color:rgb(77,85,93);
    height: 40px;
    line-height: 40px
  }
  .tab-item>a.active{
    color: rgb(240,20,20)
  }
</style>
