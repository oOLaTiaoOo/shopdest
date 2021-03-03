<template>
  <div class="login_container">
      <div class="login_box">
          <!-- 头像 -->
          <div class="avatar_box">
              <img src="../../assets/logo.png" alt="">
          </div>
          <!-- 登陆表单 -->
          <div>
              <el-form ref="loginref" :model="loginform" :rules="loginrule"  class="login_form">
                  <!-- 账号 -->
                <el-form-item prop="username">
                    <el-input v-model="loginform.username"  prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="loginform.password" prefix-icon="el-icon-goods" type="password"></el-input>
                </el-form-item>
                <!-- 提交区域 -->
                <el-form-item  class="btns">
                    <el-button @click="login" type="primary">登陆</el-button>
                    <el-button @click="resetloginform" type="info">重置</el-button>
                </el-form-item>
              </el-form>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            //登陆表单的数据绑定对象
            loginform:{
                username:'admin',
                password:'123456'
            },
            //登陆表单的规则
            loginrule:{
                //用户名是否合法
                username:[
                    { required: true, message: '请输入账户名称', trigger: 'blur' },
                    { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
                ],
                //密码是否合法
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        //重置按钮
        resetloginform(){
            this.$refs.loginref.resetFields();
        },
        //登陆按钮预验证
        login(){
             this.$refs.loginref.validate(async valid =>{
                 //验证是否合法
                 //不合法
                 if(!valid) return;
                 //合法即发送请求
                 const {data:res} = await this.$http.post('login',this.loginform);
                 //验证是否请求成功并弹窗提示
                 if(res.meta.status !== 200) return this.$message.error('登陆失败');
                 this.$message.success('登陆成功');
                 //登陆成功将token保存在sessionstorage中并跳转
                 window.sessionStorage.setItem("token",res.data.token);
                 this.$router.push("/home")
             });
        }
    }
}
</script>

<style scoped>
.login_container{
    background-color: #2b4b6b;
    height: 100%;
    width: 100%;
}
.login_box{
    width:450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); 
}
.avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;  
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%); 
    background-color: #fff;
}
.avatar_box img{
    width: 100%;
    height:100%;
    border-radius: 50%;
    background-color: #eee;
}
.btns{
    display:flex;
    justify-content: flex-end;
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
</style>