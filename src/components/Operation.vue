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
                        default-active="10"
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
                        <export-excel v-if="search(keywords) !== null" :list=search(keywords) :tHeader="tHeader" :tValue="tValue"></export-excel>
                    </el-col>
                    <el-col :span="20" >
                        <el-divider><i class="el-icon-user-solid"></i>  用户操作列表</el-divider>

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
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="event"
                                    label="事件"
                                    width="580">
                            </el-table-column>
                            <el-table-column
                                    prop="time"
                                    label="时间">
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <el-tooltip placement="top" content="回到顶部">
                    <back-to-top :custom-style="myBackToTopStyle" :visibility-height="200" :back-position="0" transition-name="fade"/>
                </el-tooltip>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import  ExportExcel from '../ExportExcel'
    import  BackToTop from '../BackToTop'
    export default {
        name: "Operation",
        components: { ExportExcel,BackToTop},
        data() {
            return {
                myBackToTopStyle: {
                    right: '50px',
                    bottom: '50px',
                    width: '40px',
                    height: '40px',
                    borderRadius: '4px',
                    lineHeight: '45px', // 请保持与高度一致以垂直居中
                    background: '#e7eaf1'// 按钮的背景颜色
                },
                username:localStorage.getItem('name'),
                loading:true,
                datalist:[],
                tHeader:['名字', '事件', '时间'],
                tValue:['name', 'event', 'time'],
                keywords:'',
                loadingflag:true,
                flag: true,
                time:'',
                time1:'',
                ruleForm: {
                    time:'',
                    name: '',
                    event: '',
                    password: ''
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
                this.$http.post('http://www.smartdk.top:4000/deleteevent',{username:row.name},{emulateJSON:true}).then(function(res){
                    that.$message.error('已成功删除');
                    that.getdata()
                    // eslint-disable-next-line no-unused-vars
                },function(res){
                    that.$message.error('服务器当前错误');
                });
            },
            search(keywords){
                return  this.datalist.filter(item=>{
                    if(item.name.includes(keywords)){
                        return item;
                    }else if(item.event.includes(keywords)){
                        return item;
                    }else if(item.time.includes(keywords)){
                        return item;
                    }
                })
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
                        that.$axios.get('http://www.smartdk.top:4000/showevent')
                            .then(function (res) {
                                // handle success


                                // eslint-disable-next-line no-unused-vars,no-console
                                // eslint-disable-next-line no-unused-vars
                                let data=res.data
                                that.flag=false
                                that.loading=false
                                that.datalist=[]
                                for(let i=0;i<data.length;i++){
                                    that.datalist.unshift({'name':data[i][0],'event':data[i][1],'time':data[i][2]})
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