<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" >
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}</span>
            <span class="rating">好评率{{food.rating}}</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food" @on-change="addFood"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count === 0" @click="addFirst">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info"  v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect @ratingtype="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-for="rating in food.ratings" class="rating-item border-1px" v-show="needShow(rating.rateType,rating.text)">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" alt="" class="avatar" width="12">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价。</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import {formatDate} from '../../common/js/date.js'
  import cartcontrol from '../cartcontrol/cartcontrol'
  import split from '../split/split'
  import ratingselect from '../ratingselect/ratingselect'

  // 正面
  // const positive = 0
  // // 负面
  // const negative = 1
  // 所有
  const all = 2

  export default {
    props: {
      food: {
        type: Object
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    },
    data() {
      return {
        showFlag: false,
        selectType: all,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      show() {
        this.showFlag = true
        this.selectType = all
        this.onlyContent = false
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide() {
        this.showFlag = false
      },
      addFirst(event) {
        if (!event._constructed) {
          return
        }
        this.$emit('on-change', event.target)
        Vue.set(this.food, 'count', 1)
      },
      addFood(target) {
        this.$emit('on-change', target)
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === all) {
          return true
        } else {
          return type === this.selectType
        }
      },
      selectRating(type) {
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    }
  }
</script>

<style scoped>
  .rating-wrapper{
    padding:0 18px;
  }
  .rating-wrapper .no-rating{
    padding:16px 0;
    font-size: 12px;
    color:rgb(147,153,159);
  }
  .rating-wrapper .rating-item{
    position: relative;
    padding:0 16px;
    border-bottom:1px solid rgba(7, 17, 27, 0.1);
  }
  .rating-wrapper .rating-item .user{
    position: absolute;
    right:0;
    top:16px;
    font-size: 0;
    line-height: 12px;
  }
  .rating-wrapper .rating-item .user .name{
    margin-right:16px;
    display: inline-block;
    vertical-align: top;
    font-size: 10px;
    color:rgb(147,153,159);
  }
  .rating-wrapper .rating-item .user .avatar{
    border-radius: 50%;
  }
  .rating-wrapper .rating-item .time{
    line-height: 12px;
    font-size: 10px;
    color: rgb(147,153,159);
    margin-top:6px;
  }
  .rating-wrapper .rating-item .text{
    line-height: 16px;
    font-size:12px;
    color:rgb(7,17,27);
    padding-bottom:4px;
  }
  .icon-thumb_up,.icon-thumb_down{
    line-height: 16px;
    margin-right: 4px;
    font-size: 12px;
  }
  .icon-thumb_up{
    color:rgb(0,160,220);
  }
  .icon-thumb_down{
    color:rgb(147,153,159)
  } 
  .rating{
    padding-top:18px;
  }
  .rating .title{
    line-height: 14px;
    margin-left: 18px;
    font-size: 14px;
    color:rgb(7,17，27);
  }
  .info{
    padding:18px;
  }
  .info .title{
    line-height: 14px;
    margin-bottom: 6px;
    font-size: 14px;
    color:rgb(7，17，27);
    font-weight: 700;
  }
  .info .text{
    line-height: 24px;
    padding:0 8px;
    font-size: 12px;
    color: rgb(77,85,61)
  }
  .fade-enter-active{
    transition: all .5s ease;
  }
  .fade-leave-active {
    transition: all .5s ease;
  }
  .fade-enter,.fade-leave-active{
    opacity: 0;
  }
  .cartcontrol-wrapper{
    position: absolute;
    right:18px;
    bottom:18px;
  }
  .buy{
    position: absolute;
    right:18px;
    bottom:18px;
    z-index:10;
    line-height: 24px;
    padding:0 12px;
    box-sizing: border-box;
    font-size:10px;
    border-radius: 12px;
    color:#fff;
    background: rgb(0,160,220);
  }
  .content{
    padding:18px;
    position: relative;
  }
  .content .title{
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 8px;
    font-weight: 700;
    color:rgb(7,17,27)
  }
  .content .detail{
    margin-bottom: 18px;
    line-height: 10px;
    font-size:0;
  }
  .detail .sell-count,.detail .rating{
    font-size: 10px;
    color:rgb(147,153,159);
    height: 10px;
  }
  .detail .sell-count{
    margin-right:12px;
  }
  .price{
    font-weight: 700;
    line-height: 24px;     
  }
  .price .now{
    margin-right: 18px;
    font-size: 14px;
    color: rgb(240,20,20);     
  }
  .food-content{
    position: relative;
  }
  .price .old{
    text-decoration: underline;
    font-size: 10px;
    color:rgb(147,153,159);
    text-decoration: none; 
  }
  .image-header{
    position: relative;
    width:100%;
    height:0;
    padding-top:100%;
  }
  .image-header img{
    position: absolute;
    width:100%;
    height: 100%;
    top:0;
    left:0;
  }
  .back{
    position: absolute;
    top:10px;
    left:0;
  }
  .back i{
    font-size:20px;
    padding:10px;
    color:#fff;
  }
  .food{
    position: fixed;
    left:0;
    top:0;
    bottom: 48px;
    z-index:30;
    width:100%;
    background: #ffffff;
  }
  .move-enter-active{
    transition: all .5s ease;
  }
  .move-leave-active {
    transition: all .5s ease;
  }
  .move-enter,.move-leave-active{
    transform: translateX(100%)
  }
</style>