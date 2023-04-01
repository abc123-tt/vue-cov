<template>
  <div>
    <div class="internal_tit">
      <span class="colorBlock"></span>
      <slot name="tit"></slot>
    </div>

    
  </div>

  
</template>

<script>
export default {
  name: '',
  data() {
    return {

    }
  },
  props: {
  },
  components: {

  },
  methods: {

  },
  mounted() {

  },
  created() {

  },
  watch: {

  },
  computed: {

  },
  filters: {

  }
}
</script>

<style scoped lang='less'>
.internal_tit {
  display: flex;
  align-items: center;
  height: 35px;
  font-size: 18px;
  font-weight: bold;
  margin-top:10px;
  padding:0 20px;
  .colorBlock {
    width: 4px;
    height: 16px;
    background-color: #4169e2;
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
  }


}
</style>