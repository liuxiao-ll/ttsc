<template>
  <div>
  <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selsectMenu(index,$event)">
            <span class="text border-1px"><icon :iconType="item.type" class="icon" v-show="item.type>0"></icon>{{item.name}}</span>    
          </li>
        </ul>
      </div>
      <div class="foot-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul class="">
              <li @click="selectFood(food, $event)" v-for="food in item.foods" class="food-item border-1px">
                <div class="icon">
                  <img :src="food.icon" alt="" width="57">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span>月售{{ food.sellCount}}份</span>
                    <span>好评率{{food.rating}}</span>
                    <div class="price">
                      <span class="now">￥{{food.price}}</span>
                      <span v-show="food.oldPrice" class="old">${{food.oldPrice}}</span>
                    </div>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food" @on-change="cartAdd"></cartcontrol>   
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :selectFoods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ref="shopcart" @pay="pay"></shopcart>
  </div>
  <food @on-change="cartAdd" :food="selectedfood" ref="food"></food>
  <router-view :selectFoods="selectFoods" ref="chart"></router-view>
</div>
</template>

<script>
  import icon from '../icon/icon'
  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart'
  import cartcontrol from '../cartcontrol/cartcontrol'
  import food from '../food/food'
  import {mapMutations, mapGetters} from 'vuex'
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    created() {
      this.$http.get('/goods').then((res) => {
        res = res.body
        if (res.status === '0') {
          this.goods = res.result.goods
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedfood: {}
      }
    },
    components: {
      icon,
      shopcart,
      cartcontrol,
      food
    },
    methods: {
      cartAdd(target) {
        this._drop(target)
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return
        }
        this.selectedfood = food
        this.$refs.food.show()
      },
      _drop(target) {
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target)
        })
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      selsectMenu(index, event) {
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      pay() {
        this.setGoods(this.selectFoods)
        this.$router.push('/good/commitOrderList')
      },
      ...mapMutations({
        setGoods: 'SET_GOODS'
      })
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods() {
        console.log('1')
        console.log(this.vgoods)
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      },
      ...mapGetters([
        'vgoods',
        'a'
      ])
    }
  }
</script>

<style scoped>
  .goods{
    position: absolute;
    top: 174px;
    width: 100%;
    overflow: hidden;
    bottom:46px;
    display: flex;
  }
  .menu-wrapper{
    flex: 0 0 80px;
    width:80px;
    background: #f3f5f7
  }
  .menu-wrapper .current{
    position: relative;
    margin-top: -1px;
    z-index: 10;
    font-weight: bold;
    background: #fff;
  }
  .menu-wrapper .current .text{
    border:none
  }
  .foot-wrapper{
    flex: 1;
  }
  .menu-item{
    display: table;
    height: 54px;
    width:56px;
    line-height: 14px;
    padding: 0 12px
  }
  .menu-wrapper .icon{
    display: inline-block;
    vertical-align: top;
    width:12px;
    height:12px;
    margin-right:2px;
    background-size: 12px 12px;
    background-repeat: no-repeat
  }
  .menu-wrapper .text{
    font-size:12px;
    display: table-cell;
    width:56px;
    vertical-align: middle;
    border-bottom:1px solid rgba(7,17,27,0.1)
  }
  .foot-wrapper .title{
    padding-left:14px;
    height:26px;
    line-height: 26px;
    border-left:2px solid #d9dde1; 
    font-size: 12px;
    color:rgb(147,153,159);
    background: #f3f5f7;  
  }
  .food-item{
    display:flex;
    margin:18px;
    padding-bottom: 18px;
    border-bottom:1px solid rgba(7,17,27,0.1)
  }
  .food-item:last-child{
    border-bottom: none;
    margin-bottom: 0;
  }
  .food-item .icon{
    width:57px;
    height:57px;
    flex: 0 0 57;
    margin-right: 10px;  
  }
  .food-item .content{
    flex:1;
    position: relative;
    margin-left:0;
  }
  .food-item .name{
    font-size: 14px;
    margin:2px 0 8px 0;
    line-height: 14px;
    color:rgb(7, 17, 27);
    height: 14px;
  }
  .food-item .desc{
    margin-bottom: 8px;
    line-height: 10px;
    font-size: 10px;
    color:rgb(147,153,159)
  }
  .food-item .extra{
    line-height: 10px;
    font-size: 10px;
    color:rgb(147,153,159);
    position: relative
  }
  .food-item .price{
    font-weight: 700;
    line-height: 24px;     
  }
  .food-item .now{
    margin-right: 18px;
    font-size: 14px;
    color: rgb(240,20,20);     
  }
  .food-item .old{
    text-decoration: underline;
    font-size: 10px;
    color:rgb(147,153,159); 
  }
  .cartcontrol-wrapper{
    position: absolute;
    right: 0;
    bottom: -2px;
  }
</style>