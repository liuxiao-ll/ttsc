<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
        <div class="tab-item">
          <router-link :to="{path:'/goods'}">商品</router-link>  
        </div>
        <div class="tab-item">
          <router-link :to="{path:'/ratings'}">评论</router-link>  
        </div>
        <div class="tab-item">
          <router-link :to="{path:'/seller'}">商家</router-link>  
        </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { urlParse } from './common/js/util'
import header from './components/header/header.vue'
export default{
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse()
          return queryParam.id
        })()
      }
    }
  },
  components: {
    vHeader: header
  },
  created() {
    this.$http.get('/good').then((res) => {
      res = res.body
      if (res.status === '00') {
        this.seller = {'type': 0}
        this.$router.push('/register')
      }
      if (res.status === '0') {
        this.seller = Object.assign({}, this.seller, res.result.seller)
      }
    })
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
