<template>
  <div class="cartcontrol">
    <transition name="move">
        <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreaseCart"></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{ food.count }}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count += 1
        }
        this.$emit('on-change', event.target)
      },
      decreaseCart() {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style scoped>
 .move-enter-active{
    transition: all .5s ease;
  }
  .move-leave-active {
    transition: all .5s ease;
  }
  .move-enter,.move-leave-active{
    opacity: 0;
    transform: translateX(30px) rotate(180deg)
  }
  .cartcontrol{
    font-size: 0;
  }
  .cartcontrol .cart-add,.cartcontrol .cart-decrease,.cartcontrol .cart-count{
    font-size: 22px;
    line-height: 24px;
  }
  .cartcontrol .cart-decrease{
    display: inline-block;
    color: rgb(0,160,220)
  }
  .cartcontrol .cart-count{
    display: inline-block;
    vertical-align: top;
    width:12px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color:rgb(147,153,159);
    padding: 0 5px;
  }
  .cartcontrol .cart-add{
    display: inline-block;
    color: rgb(0,160,220);
  }
</style>