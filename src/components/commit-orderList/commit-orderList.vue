<template>
  <div class="commit">
    <div class="commit-header" ref="header">
      <i class="icon-arrow_lift icon"></i>
      <div class="text">提交订单</div>
    </div>
    <scroll class="commit-wrapper" :data="selectFoods" :listenScroll="listenScroll" @scroll="scroll">
      <div>
        <div class="commit-index"></div>
        <div class="commit-content clearfix" ref="content">
          <div class="content-first">
            <div class="address" @click="showAddress">
              <P class="address-text">{{address.streetName}} {{address.roomNumber}}</P>
              <p class="address-name">{{address.userName}} {{address.tel}}</p>
              <div class="address-icon">
                <i class="icon-arrow_lift icon"></i>
              </div>
            </div>
            <div class="time">
              立即送出 <span class="text">(大约10:10送达)</span>
            </div>
          </div>
          <div class="content-second" ref="second">
            <div class="restruant">
              <p class="name">西部马华牛肉面 (西安寒光餐厅)</p>
              <div class="bg"></div>
            </div>
            <div class="foodList clearfix">
              <ul>
                <li class="foodList-list">
                  <div class="li-left">
                    <img src="http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114" alt="" width="60" height="60">
                  </div>
                  <div class="li-center">
                    <p class="text">炸鸡饭</p>
                    <p class="count">x1</p>
                  </div>
                  <div class="li-right">
                    <p class="price">￥4.5</p>
                  </div>
                </li>
                <li class="foodList-list">
                  <div class="li-left">
                    <img src="http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114" alt="" width="60" height="60">
                  </div>
                  <div class="li-center">
                    <p class="text">炸鸡饭</p>
                    <p class="count">x1</p>
                  </div>
                  <div class="li-right">
                    <p class="price">￥4.5</p>
                  </div>
                </li>
                <li class="foodList-list">
                  <div class="li-left">
                    <img src="http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114" alt="" width="60" height="60">
                  </div>
                  <div class="li-center">
                    <p class="text">炸鸡饭</p>
                    <p class="count">x1</p>
                  </div>
                  <div class="li-right">
                    <p class="price">￥4.5</p>
                  </div>
                </li>
                <li class="more">
                  <div>
                    <span class="text">展开更多</span>
                    <i class="icon-add_circle icon"></i>
                  </div>
                </li>
              </ul>
            </div>
            <div class="roadPrice">
              <p class="text">包装费</p>
              <p class="price">￥4</p>
            </div>
            <div class="roadPrice bb">
              <p class="text">配送费</p>
              <p class="price">￥5</p>
            </div>
            <div class="totalPrice">
              <p class="text">小计<span style="color:red">￥14.9</span></p>
            </div>
          </div>
          <div class="content-last" ref="last">
            <div class="payType">
              <p class="payType-type">支付方式</p>
              <p class="payType-online">在线支付</p>
            </div>
            <div class="payType">
              <p class="payType-type">支付方式</p>
              <p class="payType-online">在线支付</p>
            </div>
          </div>
        </div>
          <div class="clearFloat"></div>
      </div>
    </scroll>
    <div class="commit-footer">
      <div class="price">合计￥23</div>
      <div class="commit-button">提交订单</div>
    </div>
    <addcartList ref="addressList" @userAddress="userAddress"></addcartList>
  </div>
</template>

<script>
import scroll from '../../base/scroll/scroll.vue'
import addcartList from '../addcartList/addcartList'
export default {
  components: {
    scroll,
    addcartList
  },
  data() {
    return {
      listenScroll: true,
      scrollY,
      secondY: 0,
      isShowAdd: false,
      address: {}
    }
  },
  created() {
    this._initAddress()
  },
  methods: {
    scroll(pos) {
      this.scrollY = pos.y
    },
    showAddress() {
      this.$refs.addressList.show()
    },
    _initAddress() {
      this.$http.get('/users/address').then((res) => {
        res = res.data
        if (res.status === '0') {
          this.address = res.result
        } else {
          console.log(res.result)
        }
      })
    },
    userAddress() {
      this._initAddress()
    }
  },
  mounted() {
    this.secondY = this.$refs.second.clientHeight + 200
  },
  props: {
    selectFoods: {
      type: Array,
      default: []
    }
  },
  watch: {
    scrollY(newY) {
      const HEIGHT = 70
      if (newY < 0) {
        let percent = Math.abs(newY / HEIGHT)
        let blur = Math.min(1 * percent, 1)
        this.$refs.header.style.filter = `blur(${blur}px)`
      } else {
        this.$refs.header.style.filter = `blur(0)`
      }
    },
    secondY(newY) {
      this.$refs.content.style.height = `${newY}px`
    }
  }
}
</script>

<style scoped>
  @import '../../common/st/commit/commit.css'
</style>