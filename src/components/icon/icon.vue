<template>
    <span :class="classMap[iconType]"></span> 
</template>

<script>
  export default{
    props: {
      iconType: {
        type: Number
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
</script>

<style>
  .decrease{
    background-image: url('decrease_4@2x.png')
  }
  .discount{
    background-image: url('discount_4@2x.png')
  }
  .guarantee{
    background-image: url('guarantee_1@2x.png')
  }
  .invoice{
    background-image: url('invoice_1@2x.png')
  }
  .special{
    background-image: url('special_4@2x.png')
  }
  @media(-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
    .decrease{
      background-image: url("decrease_1@3x.png")
    }
    .discount{
    background-image: url('discount_1@3x.png')
    }
    .guarantee{
    background-image: url('guarantee_1@3x.png')
    }
    .invoice{
    background-image: url('invoice_1@3x.png')
    }
    .special{
    background-image: url('special_4@3x.png')
    }
  }
</style>