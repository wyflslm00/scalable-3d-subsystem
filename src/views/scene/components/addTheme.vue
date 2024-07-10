<template>
    <div class="project-edit">
      <el-dialog
          :title="editName"
          :visible.sync="dialogVisible"
          width="500px"
          :close-on-click-modal='false'
          :center="true"
          :before-close="handleClose">
          <div class="box">
              <p >
                  <span>主题名称</span>
                  <el-input
                    style="width:268px"
                      v-model="formData.domain"
                       placeholder="请输入">
                       </el-input>
              </p>
              <p >
                  <span>主题编码</span>
                  <el-input
                    style="width:268px"
                      v-model="formData.domain"
                       placeholder="请输入">
                       </el-input>
              </p>
              <p >
                  <span>区域名称</span>
                  <el-input
                    style="width:268px"
                      v-model="formData.domain"
                       placeholder="请输入">
                       </el-input>
              </p>
              <p >
                  <span>说明</span>
                  
                  <el-input
                  type="textarea"
                  rows="4"
                    resize="none"
                    style="width:268px"
                      v-model="formData.domain"
                       placeholder="请输入">
                       </el-input>
              </p>
           
              
          </div>
  
          <span slot="footer" class="dialog-footer">
                <el-button  @click="handleClose">取消</el-button>
                <el-button type="primary" @click="enter">确定</el-button>
          </span>
          </el-dialog>
    </div>
  </template>
  
  <script>
  
  export default {
    name: "Edit",
    props:['dialogVisible','type','editName'],
    data() {
      return {
        formData: {
         domain:'',
        },
      }
    },
    mounted() {
      if(this.type){
          this.show()
      }
    },
    methods: {
      show() {
        
      },
      update() {
        
      },
      store(){
      },
      handleClose(){
          this.$emit('chose');
      },
      enter(){
        
      },
  
      
  
    }
  }
  </script>
  
  <style scoped lang="scss">
  .box{
    display: flex;
    flex-direction :column;
    justify-content :center;
    align-items: center;
    font-size :12px;
    &>p{
        display :flex;
        align-items :center;
        margin :10px 0;
    }
    span{
        display: inline-block;
        width :50px;
        margin-right :14px;
    }
    .warning{
        background-color: #fdf6ec;
        border-color: #faecd8;
        color :#e6a23c;
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
        margin-right: 0;
    }
       
       
  }
   
  
  </style>