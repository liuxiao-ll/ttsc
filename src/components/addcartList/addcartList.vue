<template>
  <div class="addcartList">
    <p>啊啊啊啊</p>
  </div>
</template>

<script>
  export default{
    prop: {
      selectFoods: {
        type: Array,
        default: []
      }
    },
    created() {
      console.log(this.selectFoods)
    }
  }
</script>

<style scoped>
  @import '../../common/st/addcartList/addcartList.scss'
</style>