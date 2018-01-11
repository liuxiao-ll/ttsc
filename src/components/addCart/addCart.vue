<template>
  <transition name="slide">
    <div class="addCart" v-show="isShowAdd">
      <div class="addCart-header" ref="header">
        <i class="el-icon-arrow-left icon" @click="toggle"></i>
        <div class="text">新增收货地址</div>
        <p class="mangage" @click="addCart">保存</p>
      </div>
      <div class="line">
        <p class="text">联系人</p>
      </div>
      <div class="addcart-name">
        <div class="name">
          <span class="label">姓名：</span>
          <input type="text" class="adName" placeholder="请填写收货人的姓名" v-model="userName">
        </div>
      </div>
      <div class="addcart-name">
        <div class="name">
          <span class="label">电话：</span>
          <input type="text" class="adName" placeholder="请填写收货人的电话" v-model="tel">
        </div>
      </div>
      <div class="line">
        <p class="text">收货地址</p>
      </div>
      <div class="addcart-name">
          <div class="name">
            <span class="label">小区/大厦/学校：</span>
            <input type="text" class="adName" placeholder="请填写地址" v-model="streetName">
          </div>
        </div>
        <div class="addcart-name">
          <div class="name">
            <span class="label">楼号-门牌号：</span>
            <input type="text" class="adName" placeholder="例:16号楼427室" v-model="roomNumber">
          </div>
        </div>
    </div>
  </transition>
</template>

<script>
  export default{
    data() {
      return {
        isShowAdd: false,
        userName: '',
        tel: '',
        streetName: '',
        roomNumber: ''
      }
    },
    methods: {
      show() {
        this.isShowAdd = true
      },
      addCart() {
        this.$http.post('/users/addCart', {
          userName: this.userName,
          tel: this.tel,
          streetName: this.streetName,
          roomNumber: this.roomNumber
        }).then((res) => {
          res = res.data
          if (res.status === '0') {
            this.isShowAdd = false
          }
        })
      },
      toggle() {
        this.isShowAdd = false
      }
    }
  }
</script>

<style scoped>
  @import '../../common/st/addCart/addCart.css'
</style>

