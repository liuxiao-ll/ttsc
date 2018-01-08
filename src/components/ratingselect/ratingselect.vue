<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="select(2,$event)" class="block positive" :class="{'active':selectType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active':selectType === 0}">{{desc.positive}}<span class="count">{{positive.length}}</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{'active':selectType === 1}">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
    </div>
    <div class="swith" :class="{'on':onlyContent}" @click="toggleContent">
      <span class="icon-check_circle"></span>
      <span class="text">只看内容的评价</span>
    </div>
  </div>
</template>

<script>
  // 正面
  const Positive = 0
  // 负面
  const Negative = 1
  // 所有
  const all = 2
  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return []
        }
      },
      selectType: {
        type: Number,
        default: all
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    methods: {
      select(type, event) {
        if (!event._constructed) {
          return
        }
        this.$emit('ratingtype', type)
      },
      toggleContent(event) {
        if (!event._constructed) {
          return
        }
        this.$emit('toggle')
      }
    },
    computed: {
      positive() {
        return this.ratings.filter((rating) => {
          return rating.ratetypeName === Positive
        })
      },
      negative() {
        return this.ratings.filter((rating) => {
          return rating.ratetypeName === Negative
        })
      }
    }
  }
</script>

<style scoped>
  .rating-type{
    padding:18px 0;
    margin:0 18px;
    border-bottom:1px solid rgba(7,17,27, 0.2);
    font-size: 0
  }
  .block{
    display: inline-block;
    padding: 8px 12px;
    margin-right:8px;
    font-size: 12px;
    border-radius: 2px;
    color:rgb(77,85,93);
    line-height: 16px;
  }
  .count{
    font-size: 8px;
    margin-left:2px;
  }
  .active{
    color:#FFF;
  }
  .positive{
    background: rgba(0,160,220,0.2);
  }
  .negative{
    background: rgba(77,85,93,0.5)
  }
  .positive.active{
    background: rgb(0,160,220)
  }
  .negative.active{
    background: rgb(77,85,93)
  }
  .swith{
    padding:12px 18px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7,17,27, 0.1);
    color:rgb(147,153,159);
    font-size: 0;
  }
  .icon-check_circle{
    font-size: 24px;
    margin-right: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .swith .text{
    font-size: 12px;
  }
  .swith.on .icon-check_circle{
    color: #00c850;
  }
  .bottom{
    width:100%;
    height: 50px;
  }
</style>