<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore" class="star"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore" class="star"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings" @ratingtype="ratingtype" @toggle="toggle"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings"  class="rating-item border-1px" v-show="IsShow(rating.rateType, rating.text)">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import star from '../star/star'
  import split from '../split/split'
  import {formatDate} from '../../common/js/date.js'
  import ratingselect from '../ratingselect/ratingselect'
  import BScroll from 'better-scroll'
  const ALL = 2
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      }
    },
    methods: {
      IsShow(type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return this.selectType === type
        }
      },
      ratingtype(type) {
        this.selectType = type
        this.$nextTick(() => {
          this.BScroll.refresh()
        })
      },
      toggle() {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.BScroll.refresh()
        })
      }
    },
    components: {
      star,
      split,
      ratingselect
    },
    created() {
      this.$http.get('/api/rating').then((res) => {
        res = res.body
        if (res.errno === 0) {
          this.ratings = res.data
          this.$nextTick(() => {
            this.menuScroll = new BScroll(this.$refs.ratings, {
              click: true
            })
          })
        }
      })
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
  .rating-wrapper .rating-item{
    display: flex;
    padding: 18px 0;
    border-bottom:1px solid rgba(7,17,27,0.2);
  }
  .score-wrapper{
    margin-bottom: 8px;
    line-height: 18px;
    font-size: 0;
  }
  .rating-item .avatar{
    flex: 0 0 28px;
    width: 28px;
    margin-right: 12px
  } 
  .rating-item .avatar img{
    border-radius: 50%;
  }
  .rating-item .content{
    position: relative;
    flex: 1
  }
  .rating-item .content .name{
    margin-bottom: 4px;
    line-height: 12px;
    font-size: 10px;
    color: rgb(7, 17, 27)
  }
  .rating-item .content .star-wrapper{
    margin-bottom: 6px;
    font-size: 0
  }
  .rating-item .content .star-wrapper .star{
    display: inline-block;
    margin-right: 6px;
    vertical-align: top
  }
  .rating-item .content .star-wrapper .delivery{
    display: inline-block;
    vertical-align: top;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159)
  }
  .rating-item .content .text{
    margin-bottom: 8px;
    line-height: 18px;
    color: rgb(7, 17, 27);
    font-size: 12px
  }
  .rating-item .content .recommend{
    line-height: 16px;
    font-size: 0      
  }
  .rating-item .content .recommend .icon-thumb_up, .item{
    display: inline-block;
    margin: 0 8px 4px 0;
    font-size: 9px
  }
  .rating-item .content .recommend .icon-thumb_up{
    color: rgb(0, 160, 220)
  }
  .rating-item .content .recommend .item{
    padding: 0 6px;
    border: 1px solid rgba(7, 17, 27, 0.1);
    border-radius: 1px;
    color: rgb(147, 153, 159);
    background: #fff
  }
  .rating-item .content .time{
    position: absolute;
    top: 0;
    right: 0;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159)
  }
  .score-wrapper .title{
    font-size:12px;
    color:rgb(7，17，27);
  }
  .score-wrapper .star{
    display: inline-block;
    margin: 0 12px;
    vertical-align: top;
  }
  .score-wrapper .score{
    display: inline-block;
    line-height: 18px;
    vertical-align: top;
    font-size: 12px;
    color: rgb(255, 153, 0);
  }
  .delivery-wrapper{
    font-size: 0;
  }
  .delivery-wrapper .title{
    line-height: 18px;
    font-size: 12px;
    color: rgb(7, 17, 27);
  }
  .delivery-wrapper .delivery{
    margin-left: 12px;
    font-size: 12px;
    color: rgb(147, 153, 159)
  }
  .ratings{
    position: absolute;
    top:174px;
    left: 0;
    width:100%;
    overflow: hidden;
    bottom:0;
  }
  .overview{
    display: flex;
    padding: 18px 0;
  }
  .overview .overview-left{
    flex: 0 0 137px;
    width:137px;
    border-right:1px solid rgba(7,17,27,0.2);
    text-align:center;
    padding:6px 0;
  }
  @media only screen and (max-width: 320px){
    .overview .overview-left{
    flex: 0 0 120px;
    width:120px;
    }
  }
  .overview .overview-left .score{
    line-height:28px;
    font-size: 24px;
    color:rgb(255,153,0);
    margin-bottom: 6px;
  }
  .overview .overview-left .title{
    line-height: 12px;
    font-size: 12px;
    color:rgb(7,17,27);  
    font-weight: 700;
  }
  .overview .overview-left .rank{
    line-height: 10px;
    font-size: 10PX;
    color:rba(147,153,159);
    margin-top:8px;
  }
  .overview .overview-right{
    flex:1;
    padding-left:24px;
  }
  @media only screen and (max-width: 320px){
    .overview .overview-right{
      padding-left:6px;
    }
  }
</style>