<template>
  <div>
    <nav class="control">
      <ul>
        <slot name="navBtn">1填点什么吧...</slot>
      </ul>
    </nav>
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
.control {
    padding: 12px 20px;

    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        margin-right: 6px;
        font-size: 14px;
        padding: 6px 10px;
        background-color: #f7f7f7;
        cursor: pointer;
      }

      .isActive {
        background-color: #f1f5ff;
        color: #4169e2;
      }
    }
  }
</style>