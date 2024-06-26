<template>
    <div class="pager-container bg-white">
      <div class="pager-left">
        <span class="page-view">
          <!-- 当前页
          {{ currentCount }} 条&nbsp;&nbsp;&nbsp;&nbsp; -->
          共 {{ total }} 条
        </span>
      </div>
      <el-pagination
          v-if="total > 0"
          layout="prev, pager, next"
          :current-page="page"
          :page-size="size"
          :pager-count="pagerCount"
          :total="total"
          @current-change="handleCurrentChange">
      </el-pagination>
      <slot/>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Pager',
    props: {
      total: {
        type: Number,
        default: 0,
      },
      size: {
        type: Number,
        default: 10,
      },
      page: {
        type: Number,
        default: 1,
      },
      pagerCount: {
        type: Number,
        default: 5,
      },
    },
    data() {
      return {
      };
    },
    computed: {
      currentCount() {
        if (this.total > 0) {
          if (this.page * this.size <= this.total) return this.size;
          else return this.total - ((this.page - 1) * this.size);
        } else {
          return 0;
        }
      },
    },
    methods: {
      handleCurrentChange(page) {
        this.$emit('pageChange', page);
      },
    },
  };
  </script>
  
  <style scoped lang="scss">
  .pager-container{
    height: 32px;
    padding: 0 10px 0 20px;
    display: flex;
    align-items :center;
    justify-content: flex-end;
    color: #6D7278;
    margin-top: 4px;
  }
   
  
    .page-view{
        font-size :14px;
    }
     
  </style>