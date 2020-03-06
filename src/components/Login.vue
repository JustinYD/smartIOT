<template>
    <div>
        <el-form :model="form" class="loginbox">
            <el-form-item  :label-width="formLabelWidth">
                <el-header class="el-header">登陆-智慧林云系统</el-header>
            </el-form-item>
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.loginname" ></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input type="password" v-model="form.password" ></el-input>
            </el-form-item>
            <el-form-item  :label-width="formLabelWidth">
                <el-button type="primary" @click="login">登陆</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return{
                formLabelWidth: '100px',
                form:{
                    loginname:'',
                    password:''
                },
                event:{
                    name:'',
                    event:'登陆',
                    time:''
                }
            }
        },
        methods:{
            login(){
                var that=this
                var myDate=new Date()
                var t=myDate.toLocaleDateString();
                var t1=myDate.toLocaleTimeString();
                that.event.time=t+t1
                if (this.form.password&&this.form.loginname){
                    this.$http.post('http://www.smartdk.top:4000/login',that.form,{emulateJSON:true}).then(function(res){

                        if (res.body=='400'){
                            that.$message({
                                message: '登陆失败，用户名或密码错误，请联系管理员',
                                type: 'error',
                                duration:5000
                            });
                            that.form={}
                        }else {
                            that.$message({
                                message: '登陆成功！',
                                type: 'success',
                                duration:2000
                            });
                            localStorage.setItem('name' , res.body[0][0])
                            localStorage.setItem('pwd' , res.body[0][2])
                            localStorage.setItem('admin' , res.body[0][4])
                            that.event.name=res.body[0][0]
                            // eslint-disable-next-line no-unused-vars
                            this.$http.post('http://www.smartdk.top:4000/addevent',that.event,{emulateJSON:true}).then(function(res){

                                // eslint-disable-next-line no-unused-vars
                            },function(res){
                                that.$message.error('服务器当前错误');
                            });
                            that.$router.push({path: '/home'});
                            that.form={}
                        }
                        // eslint-disable-next-line no-unused-vars
                    },function(res){
                        that.$message.error('服务器当前错误');
                        that.form={}
                    });
                }else {
                    this.$message({
                        message: '登陆失败，请输入用户名或密码',
                        type: 'warning'
                    });
                }

            }
        }
    }
</script>

<style scoped>
    .loginbox{
        width: 400px;
        height: 400px;
        margin-left: 35%;
        margin-top: 5%;
        padding: 10px;
    }
    .el-header{
        font-size: 25px;
    }
</style>