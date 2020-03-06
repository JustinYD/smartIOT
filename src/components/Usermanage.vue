<template>
    <div>
        <el-row class="topbar">
            <el-col :span="20">
                <h2>智慧林业大数据检测平台</h2>
            </el-col>
            <el-col :span="2">
                <h4>欢迎您，{{username}}</h4>
            </el-col>
            <el-col :span="2">
                <h4 style="cursor: pointer" @click="loginout">退出</h4>
            </el-col>

        </el-row>
        <el-row >
            <el-col :span="4" >
                <el-menu
                        default-active="9"
                        class="el-menu-vertical-demo"
                        background-color="#ffffff"
                        text-color="#000000"
                        router
                        active-text-color="#1296db">
                    <el-menu-item index="1" route="/home">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-menu-item index="2" route="history">
                        <i class="el-icon-menu"></i>
                        <span slot="title">历史数据</span>
                    </el-menu-item>
                    <el-menu-item index="3" route="analysis">
                        <i class="el-icon-data-analysis"></i>
                        <span slot="title">数据分析</span>
                    </el-menu-item>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>设置</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title"><i class="el-icon-cpu"></i>传感器</template>
                            <el-menu-item index="6" route="setyuzhi">
                                <i class="el-icon-odometer"></i>
                                <span slot="title">传感器阈值</span>
                            </el-menu-item>
                            <el-menu-item index="7" route="setting">
                                <i class="el-icon-place"></i>
                                <span slot="title">传感器信息</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group >
                            <template slot="title"><i class="el-icon-message-solid"></i>预警</template>
                            <el-menu-item index="8" route="setphone">
                                <i class="el-icon-phone"></i>
                                <span slot="title">预警电话</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group >
                            <template slot="title"><i class="el-icon-user-solid"></i>系统用户</template>
                            <el-menu-item index="9" route="usermanage">
                                <i class="el-icon-user"></i>
                                <span slot="title">用户管理</span>
                            </el-menu-item>
                            <el-menu-item index="10" route="operation">
                                <i class="el-icon-user"></i>
                                <span slot="title">用户操作</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="20" >
                <el-row>
                    <el-col :span="6" >
                        <div class="demo-input-suffix">
                            <el-input
                                    placeholder="请输入想要搜索的内容"
                                    v-model="keywords">
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>

                        </div>
                    </el-col>
                    <el-col :span="14" >
                        <el-button type="primary" icon="el-icon-loading" round v-show="flag"><span >加载中...</span><span v-show="!flag">已更新！</span></el-button>
                        <el-button type="success" icon="el-icon-success" round v-show="!flag"><span>已更新！</span></el-button>
                        <el-button type="info" icon="el-icon-time" round  v-show="!flag"><span>实时更新-{{time}}{{time1}}</span></el-button>
                        <el-button type="primary" icon="el-icon-user-solid" round  @click="dialogFormVisible = true"><span>添加用户</span></el-button>
                    </el-col>
                    <el-col :span="20" >
                        <el-divider><i class="el-icon-user-solid"></i>  用户信息</el-divider>
                        <el-table
                                :data=search(keywords)
                                v-loading="loading"
                                element-loading-text="加载数据ing"
                                element-loading-spinner="el-icon-loading"
                                element-loading-background="rgba(0, 0, 0, 0.8)"
                                style="width: 100%">
                            <el-table-column
                                    prop="name"
                                    label="名字"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="loginname"
                                    label="登录名"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="password"
                                    label="密码">
                            </el-table-column>
                            <el-table-column
                                    prop="admin"
                                    label="权限">
                            </el-table-column>
                            <el-table-column
                                    prop="time"
                                    label="时间">
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="280">
                                <template slot-scope="scope">
                                    <el-button type="primary" icon="el-icon-edit" @click="handleClick1(scope.row)" >编辑</el-button>
                                    <el-button type="danger" icon="el-icon-delete" @click="handleClick(scope.row)" >删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
                        <el-divider><i class="el-icon-mobile-phone"></i>  添加用户</el-divider>
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="名字" prop="name">
                                <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="登录名" prop="sex">
                                <el-input type="text" v-model="ruleForm.loginname" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="phone">
                                <el-input type="password" v-model="ruleForm.password"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                    <el-dialog title="编辑用户" :visible.sync="dialogFormVisible1">
                        <el-divider><i class="el-icon-mobile-phone"></i>  编辑用户</el-divider>
                        <el-form :model="ruleForm1" status-icon :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="名字" prop="name">
                                <el-input type="text" v-model="ruleForm1.name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="登录名" prop="sex">
                                <el-input type="text" v-model="ruleForm1.loginname" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="phone">
                                <el-input type="text" v-model="ruleForm1.password"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm1('ruleForm1')">提交</el-button>
                                <el-button @click="resetForm1('ruleForm1')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                </el-row>

            </el-col>
        </el-row>
    </div>

</template>

<script>
    export default {
        name: "Setphone",
        data() {

            var validatename = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入名字'));
                } else {
                    if (this.ruleForm.name !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validateloginname = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入登录名'));
                } else {
                    if (this.ruleForm.loginname !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatepassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.password !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            return {
                username:localStorage.getItem('name'),
                loading:true,
                datalist:[],
                keywords:'',
                loadingflag:true,
                flag: true,
                time:'',
                event:{
                    name:localStorage.getItem('name'),
                    event:'',
                    time:''
                },
                time1:'',
                dialogFormVisible: false,
                dialogFormVisible1: false,
                formLabelWidth: '120px',
                ruleForm: {
                    time:'',
                    name: '',
                    loginname: '',
                    password: ''
                },
                ruleForm1: {
                    time:'',
                    name: '',
                    loginname: '',
                    password: ''
                },
                rules: {
                    name: [
                        { validator: validatename, trigger: 'blur' }
                    ],
                    loginname: [
                        { validator: validateloginname, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatepassword, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            loginout(){
                let name=''
                localStorage.setItem('name' , name)
                this.$router.push({path: '/login'});
            },
            handleClick(row){

                var that=this
                // eslint-disable-next-line no-unused-vars
                this.$http.post('http://www.smartdk.top:4000/deleteuser',{username:row.name},{emulateJSON:true}).then(function(res){
                    var myDate=new Date()
                    var t=myDate.toLocaleDateString();
                    var t1=myDate.toLocaleTimeString();
                    that.event.time=t+t1
                    that.event.event='删除了用户'+row.name
                    // eslint-disable-next-line no-unused-vars
                    this.$http.post('http://www.smartdk.top:4000/addevent',that.event,{emulateJSON:true}).then(function(res){

                        // eslint-disable-next-line no-unused-vars
                    },function(res){
                        that.$message.error('服务器当前错误');
                    });
                    that.$message.error('已成功删除');
                    that.getdata()
                    // eslint-disable-next-line no-unused-vars
                },function(res){
                    that.$message.error('服务器当前错误');
                });
            },
            handleClick1(row){
                var that=this
                that.dialogFormVisible1=true
                that.ruleForm1=row
            },
            getdata(){
                var that=this
                that.flag=true
                that.loading=true
                var myDate=new Date()
                that.time=myDate.toLocaleDateString();
                that.time1=myDate.toLocaleTimeString();
                that.$axios.get('http://www.smartdk.top:4000/showuser')
                    .then(function (res) {
                        // handle success
                        // eslint-disable-next-line no-console
                        let data=res.data
                        that.flag=false
                        that.loading=false
                        that.datalist=[]
                        for(let i=0;i<data.length;i++){
                            that.datalist.push({'name':data[i][0],'loginname':data[i][1],'password':data[i][2],'time':data[i][3]})
                        }
                    })
                    // eslint-disable-next-line no-unused-vars
                    .catch(function (error) {
                        that.$message.error('服务器当前错误');
                    })
                    .then(function () {
                        // always executed
                    });
            },
            search(keywords){
                return  this.datalist.filter(item=>{
                    if(item.name.includes(keywords)){
                        return item;
                    }else if(item.loginname.includes(keywords)){
                        return item;
                    }else if(item.password.includes(keywords)){
                        return item;
                    }
                })
            },
            submitForm(formName) {
                var that=this
                var myDate=new Date()
                var time0=myDate.toLocaleDateString();
                var time1=myDate.toLocaleTimeString();
                // eslint-disable-next-line no-unused-vars
                that.ruleForm.time=time0+time1

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // eslint-disable-next-line no-unused-vars
                        this.$http.post('http://www.smartdk.top:4000/adduser',that.ruleForm,{emulateJSON:true}).then(function(res){
                            that.$message({
                                message: '恭喜你，添加用户成功',
                                type: 'success'
                            });
                            var myDate=new Date()
                            var t=myDate.toLocaleDateString();
                            var t1=myDate.toLocaleTimeString();
                            that.event.time=t+t1
                            that.event.event='添加了用户'+that.ruleForm.name
                            // eslint-disable-next-line no-unused-vars
                            this.$http.post('http://www.smartdk.top:4000/addevent',that.event,{emulateJSON:true}).then(function(res){

                                // eslint-disable-next-line no-unused-vars
                            },function(res){
                                that.$message.error('服务器当前错误');
                            });
                            that.getdata()
                            that.$refs[formName].resetFields();
                            that.dialogFormVisible = false
                            // eslint-disable-next-line no-unused-vars
                        },function(res){
                            that.$message.error('服务器当前错误');
                        });

                    } else {
                        // eslint-disable-next-line no-console
                        that.$notify.error({
                            title: '错误',
                            message: '提交错误！请正确填写',
                            position: 'bottom-left'
                        });
                        return false;
                    }
                });
            },
            submitForm1(formName1) {
                var that=this
                var myDate=new Date()
                var time0=myDate.toLocaleDateString();
                var time1=myDate.toLocaleTimeString();
                // eslint-disable-next-line no-unused-vars
                that.ruleForm.time=time0+time1

                this.$refs[formName1].validate((valid) => {
                    if (valid) {
                        // eslint-disable-next-line no-unused-vars
                        this.$http.post('http://www.smartdk.top:4000/edituser',that.ruleForm1,{emulateJSON:true}).then(function(res){
                            if(res.body=='ok'){
                                that.$message({
                                    message: '恭喜你，编辑用户成功',
                                    type: 'success'
                                });
                                var myDate=new Date()
                                var t=myDate.toLocaleDateString();
                                var t1=myDate.toLocaleTimeString();
                                that.event.time=t+t1
                                that.event.event='更新了用户'+that.ruleForm1.name+'，密码为'+that.ruleForm1.password
                                // eslint-disable-next-line no-unused-vars
                                this.$http.post('http://www.smartdk.top:4000/addevent',that.event,{emulateJSON:true}).then(function(res){

                                    // eslint-disable-next-line no-unused-vars
                                },function(res){

                                });
                                that.getdata()
                            }
                            that.$refs[formName1].resetFields();
                            that.dialogFormVisible1 = false
                            // eslint-disable-next-line no-unused-vars
                        },function(res){
                            that.$message.error('服务器当前错误');
                        });

                    } else {
                        // eslint-disable-next-line no-console
                        that.$notify.error({
                            title: '错误',
                            message: '提交错误！请正确填写',
                            position: 'bottom-left'
                        });
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            resetForm1(formName1) {
                this.$refs[formName1].resetFields();
            }
        },
        created(){
            if(this.username==''){
                this.$router.push({path: '/login'});
                this.$notify({
                    title: '请登录！',
                    type: 'error'
                });
            }else{
                // eslint-disable-next-line no-console
                var that=this

                setInterval(function () {
                    if(that.loadingflag){
                        var myDate=new Date();
                        that.time=myDate.toLocaleDateString();
                        that.time1=myDate.toLocaleTimeString();
                        that.$axios.get('http://www.smartdk.top:4000/showuser')
                            .then(function (res) {
                                // handle success


                                // eslint-disable-next-line no-unused-vars,no-console
                                // eslint-disable-next-line no-unused-vars
                                let data=res.data
                                for(let i=0;i<data.length;i++){
                                    if(data[i][4]=='1'){
                                        data[i][4]='管理员'
                                    }else {
                                        data[i][4]='用户'
                                    }
                                }
                                that.flag=false
                                that.loading=false
                                that.datalist=[]
                                for(let i=0;i<data.length;i++){
                                    that.datalist.push({'name':data[i][0],'loginname':data[i][1],'password':data[i][2],'time':data[i][3],'admin':data[i][4]})
                                }

                            })
                            // eslint-disable-next-line no-unused-vars
                            .catch(function (error) {
                                that.$message.error('服务器当前错误');
                            })
                            .then(function () {
                                // always executed
                            });
                    }
                },1000)
            }



        },
        destroyed(){
            this.loadingflag=false
        }
    }
</script>

<style scoped>

</style>