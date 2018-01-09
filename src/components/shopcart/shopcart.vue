<template>
  <div>
  <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <span class="icon-shopping_cart" :class="{'highlights':totalCount>0}"></span>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price border-1px">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payclass">
            {{payDesc}}
          </div>
        </div>
      </div>
      <div class="ball-wrapper">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listshow">
          <div class="list-header">
            <div class="list-title">购物车</div>
            <span class="list-empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li v-for="food in selectFoods" class="list-food">
                <span class="list-name">{{food.name}}</span>
                <div class="list-price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listshow" @click="hidelist"></div>
    </transition>
  </div>
</template>

<script>
  import cartcontrol from '../cartcontrol/cartcontrol'
  import BScroll from 'better-scroll'
  export default{
    components: {
      cartcontrol,
      BScroll
    },
    props: {
      selectFoods: {
        type: Array
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBall: [],
        fold: true
      }
    },
    computed: {
      listshow() {
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      },
      totalPrice() {
        let total = 0
        if (this.selectFoods.length) {
          this.selectFoods.forEach(function(food) {
            total += food.price * food.count
          })
        }
        return total
      },
      totalCount() {
        let count = 0
        if (this.selectFoods.length) {
          this.selectFoods.forEach((food) => {
            count += food.count
          })
        }
        return count
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差${diff}元起送`
        } else {
          return `去结算`
        }
      },
      payclass() {
        if (this.totalPrice < this.minPrice) {
          return `not-en`
        } else {
          return `pay_green`
        }
      }
    },
    methods: {
      toggleList() {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      pay() {
        if (this.total < this.minPrice) {
          return
        }
        this.$emit('pay')
      },
      hidelist() {
        this.fold = true
      },
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBall.push(ball)
            return
          }
        }
      },
      beforeDrop(el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 32)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      dropping(el) {
      /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
      },
      afterDrop(el) {
        let ball = this.dropBall.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      }
    }
  }
</script>

<style scoped>
  .list-mask{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    background: rgba(7,17,27,0.7);
    filter:blur(10px);
  }
  .fade-enter-active{
    transition: all .1s linear;
    background: rgba(7, 17, 27, 0)
  }
  .fade-leave-active {
    transition: all .1s linear;
    background: rgba(7, 17, 27, 0)
  }
  .fade-enter,.fade-leave-active{
    opacity: 0;
  }
  .shopcart-list{
    position: absolute;
    top:0;
    left:0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0)
  }
  .list-header{
    height:40px;
    line-height: 40px;
    padding: 0 18px;
    background: #f3f5f7;
    border-bottom:1px solid rgba(7,17,27,0.1) 
  }
  .list-title{
    font-size: 17px;
    color:rgb(7,17,27);
    float:left;
  }
  .list-content{
    padding:0 18px;
    max-height:217px;
    background: #fff;
    overflow:hidden;
  }
  .list-food{
    position: relative;
    padding:12px 0;
    box-sizing: border-box;
    border-bottom:1px solid rgba(7,17,27,0.1);
  }
  .list-name{
    line-height: 24px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }
  .list-price{
    position: absolute;
    right: 90px;
    bottom: 12px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(240, 20, 20);
  }
  .cartcontrol-wrapper{
    position: absolute;
    right: 0;
    bottom:11px;
  }
  .list-empty{
    float: right;
    font-size: 12px;
    color:rgb(0,160,220)
  }
  .fold-enter-active{
    transition: all .5s linear;
  }
  .fold-leave-active {
    transition: all .5s linear;
  }
  .fold-enter,.fold-leave-active{
    transform: translate3d(0, 0, 0)
  }
  .ball{
    position: fixed;
    left:32px;
    bottom: 22px;
    z-index: 200;
    transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
  }
  .ball .inner{
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: rgb(0, 160, 220);
    transition: all 0.4s linear
  }
  .shopcart{
    position: fixed;
    left:0;
    bottom:0;
    z-index: 50;
    width:100%;
    height:48px;
  }
  .shopcart .content{
    display: flex;
    background: #141d27;
    font-size: 0;
    margin-left:0;
  }
  .shopcart .content .content-left{
    flex:1;
  }
  .shopcart .content .content-left .logo-wrapper{
    display: inline-block;
    position: relative;
    top:-10px;
    margin:0 12px;
    padding:6px;
    width: 56px;
    height: 56px;
    vertical-align: top;
    border-radius: 50%;
    box-sizing: border-box;
    background: #141d27;
  }
  .shopcart .content .content-left .logo-wrapper .num{
    position: absolute;
    top:0;
    right: 0;
    width:24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    font-size: 9px;
    font-weight: 700;
    color:#fff;
    background: rgb(240,20,20);
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4 )
  }
  .shopcart .content .content-left .logo-wrapper .logo{
    width:100%;
    height: 100%;
    border-radius: 50%;
    background: #2b343c;
    text-align: center;
  }
  .shopcart .content .content-left .logo-wrapper .highlight{
    background: rgb(0,160,220)
  }
  .shopcart .content .content-left .logo-wrapper .icon-shopping_cart{
    font-size:24px;
    color:#80858a;
    line-height: 44px;
  }
  .shopcart .content .content-left .logo-wrapper .highlights{
    color:#fff
  }
  .shopcart .content .content-left .price{
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin-top: 12px;
    box-sizing: border-box;
    padding-right: 12px;
    border-right:1px solid rgba(255, 255, 255, 0.1);
    font-size: 16px;
    font-weight: 700;
    color:rgba(255, 255, 255, 0.4);
  }
  .shopcart .content .content-left .desc{
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin:12px 0 0 12px;
    font-size: 12px;
    color:rgba(255, 255, 255, 0.4);
    font-weight: 500;
  }
  .shopcart .content .content-right{
    flex: 0 0 105px;
    width:105px;
  }
  .shopcart .content .content-right .pay{
    line-height: 48px;
    height: 48px;
    text-align: center;
    font-size: 14px;
    color:rgba(255, 255, 255, 0.4);
    font-weight: 700;
    background: #2b333b;
  }
  .shopcart .content .content-right .pay_green{
    background: #00b43c;
    color:#fff
  }
  .shopcart .content .content-right .not-en{
    background: #2b333b
  }
</style>