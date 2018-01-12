<template>
  <transition name="slide">
    <div class="addcartList" v-show="isShowAddress">
      <div class="addcartList-header" ref="header">
        <i class="el-icon-arrow-left icon" @click="isShowAddress = false"></i>
        <div class="text">收货地址</div>
        <p class="mangage" @click="toggle">管理</p>
      </div>
      <div class="addcartList-content">
        <ul>
          <li class="item" v-for="item in addressList" @click="choseDefault(item)">
            <div class="animate">
              <transition name="fade">
                <i class="el-icon-remove icon icon-active" v-show="isShowEdit" @click.stop.prevent="deleteAdd(item)"></i>
              </transition>
              <div class="text" :class="{'active': item.isDefault}">
                <p class="address">{{item.streetName}} {{item.roomNumber}}</p>
                <p class="phone">{{item.tel}}</p>
                <transition name="fade">
                  <i class="edit"  :class="{'el-icon-check': !isShowEdit && item.isDefault,'el-icon-edit-outline': isShowEdit}" ></i>
                </transition>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="add" @click="add">
        <div>
          <i class="el-icon-circle-plus-outline icon"></i>
          <span class="text">新增收货地址</span>
        </div>
      </div>
      <addCart ref="add"></addCart>
    </div>
  </transition>
</template>

<script>
  import addCart from '../addCart/addCart.vue'
  export default{
    prop: {
      selectFoods: {
        type: Array,
        default: []
      }
    },
    created() {
      console.log(this.selectFoods)
      this._initAddressList()
    },
    data() {
      return {
        isShowEdit: false,
        isFirst: false,
        isShowAdd: false,
        isShowAddress: false,
        addressList: []
      }
    },
    methods: {
      toggle() {
        this.isShowEdit = !this.isShowEdit
        this.isFirst = true
      },
      add() {
        this.$refs.add.show()
      },
      show() {
        this.isShowAddress = true
        this._initAddressList()
        this.isShowEdit = false
      },
      choseDefault(item) {
        let addressId = item.addressId
        this.$http.post('/users/choseDefault', {addressId: addressId}).then((res) => {
          res = res.data
          if (res.status === '0') {
            this.isShowAddress = false
            this.$emit('userAddress')
          }
        })
      },
      _initAddressList() {
        this.$http.get('/users/addressList').then((res) => {
          res = res.data
          if (res.status === '0') {
            this.addressList = res.result
          }
        })
      },
      deleteAdd(item) {
        let addressId = item.addressId
        console.log(addressId)
        this.$http.post('/users/deleteAddress', {addressId: addressId}).then((res) => {
          res = res.data
          console.log(res)
        })
      }
    },
    components: {
      addCart
    }
  }
</script>

<style scoped>
  @import '../../common/st/addcartList/addcartList.css'
</style>