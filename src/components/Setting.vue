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
                        default-active="7"
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
                            <el-menu-item index="1-4" route="usermanage">
                                <i class="el-icon-user"></i>
                                <span slot="title">用户管理</span>
                            </el-menu-item>
                            <el-menu-item index="1-5" route="operation">
                                <i class="el-icon-user"></i>
                                <span slot="title">用户操作</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="20" >
                <el-row>
                    <el-col :span="24">
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
                            <el-button type="primary" icon="el-icon-time" round  v-show="!flag"><span>实时更新-{{time}}{{time1}}</span></el-button>
                        </el-col>
                        <el-col :span="24">
                            <el-divider><i class="el-icon-pie-chart"></i>  传感器数据</el-divider>
                        </el-col>
                        <transition name="el-zoom-in-top">

                            <el-table
                                    :data=search(keywords)
                                    v-loading="loading"
                                    element-loading-text="加载数据ing"
                                    element-loading-spinner="el-icon-loading"
                                    element-loading-background="rgba(0, 0, 0, 0.8)"
                                    height="500"
                                    style="width: 100%">
                                <el-table-column
                                        prop="id"
                                        label="ID">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="传感器">
                                </el-table-column>
                                <el-table-column
                                        prop="now"
                                        label="当前">
                                </el-table-column>
                                <el-table-column
                                        prop="penghao"
                                        label="棚号">
                                </el-table-column>
                                <el-table-column
                                        prop="zhandian"
                                        label="站点">
                                </el-table-column>
                                <el-table-column
                                        fixed="right"
                                        label="操作"
                                        width="100">
                                    <template slot-scope="scope">
                                        <el-button @click="handleClick(scope.row)" icon="el-icon-edit" type="text" size="small">编辑</el-button>
                                    </template>
                                </el-table-column>

                            </el-table>

                        </transition>
                        <el-dialog title="编辑传感器信息" :visible.sync="dialogFormVisible">
                            <el-form :model="form">
                                <el-form-item label="名称" :label-width="formLabelWidth">
                                    <el-input v-model="form.name" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="棚号" :label-width="formLabelWidth">
                                    <el-input v-model="form.penghao" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="站点" :label-width="formLabelWidth">
                                    <el-input v-model="form.zhandian" autocomplete="off"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="update">确 定</el-button>
                            </div>
                        </el-dialog>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    export default {
        name: "Setting",
        data() {
            return {
                username:localStorage.getItem('name'),
                loading:true,
                loadingflag:true,
                keywords:'',
                flag: true,
                datalist:[],
                event:{
                    name:localStorage.getItem('name'),
                    event:'',
                    time:''
                },
                time:'',
                time1:'',
                dialogFormVisible: false,
                form: {},
                formLabelWidth: '120px'
            }
        },
        methods:{
            handleClick(row) {

                this.form=row
                this.dialogFormVisible = true
            },
            loginout(){
                let name=''
                localStorage.setItem('name' , name)
                this.$router.push({path: '/login'});
            },
            update(){
                var that=this
                this.$http.post('http://www.smartdk.top:4000/setaddres',that.form,{emulateJSON:true}).then(function(res){
                    if(res.body=='ok'){
                        that.$message.success('传感器数据已更新！');
                        that.event.time=that.time+that.time1
                        that.event.event='更新了'+that.form.name+that.form.penghao+that.form.zhandian
                        // eslint-disable-next-line no-unused-vars
                        this.$http.post('http://www.smartdk.top:4000/addevent',that.event,{emulateJSON:true}).then(function(res){

                            // eslint-disable-next-line no-unused-vars
                        },function(res){
                            that.$message.error('服务器当前错误');
                        });
                    }else if(res.body=='fail'){
                        that.$message.info('传感器数据未变！');
                    }
                    that.getdata()
                },function(res){
                    // eslint-disable-next-line no-console
                    console.log(res.status);
                    that.$message.error('传感器更新失败！');
                });
                this.dialogFormVisible = false
            },
            search(keywords){
                return  this.datalist.filter(item=>{
                    if(item.name.includes(keywords)){
                        return item;
                    }else if(item.penghao.includes(keywords)){
                        return item;
                    }else if(item.zhandian.includes(keywords)){
                        return item;
                    }
                })
            },
            getdata(){
                var that=this
                that.flag=true
                that.loading=true
                var myDate=new Date()
                that.time=myDate.toLocaleDateString();
                that.time1=myDate.toLocaleTimeString();
                that.$axios.get('http://www.smartdk.top:4000/getdata')
                    .then(function (res) {
                        // handle success
                        // eslint-disable-next-line no-console
                        let data=res.data
                        that.flag=false
                        that.loading=false
                        for(let i=0;i<data.length;i++){
                            that.datalist[i].id=data[i][0]
                            that.datalist[i].name=data[i][1]
                            that.datalist[i].now=data[i][2]
                            that.datalist[i].penghao=data[i][3]
                            that.datalist[i].zhandian=data[i][4]
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
                        that.$axios.get('http://www.smartdk.top:4000/getdata')
                            .then(function (res) {
                                // handle success


                                let data=res.data
                                that.flag=false
                                that.loading=false
                                that.datalist=[]
                                for(let i=0;i<data.length;i++){
                                    that.datalist.push({'id':data[i][0],'name':data[i][1],'now':data[i][2],'penghao':data[i][3],'zhandian':data[i][4]})
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