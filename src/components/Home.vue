<template>

    <div>
        <el-row class="topbar">
            <el-col :span="20">
                <h2>智慧林业大数据检测平台</h2>
            </el-col>
            <el-col :span="4">
                <el-dropdown :hide-on-click="false">
                  <span class="el-dropdown-link">
                    <h4>欢迎您，{{username}}<i class="el-icon-arrow-down el-icon--right"></i></h4>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item ><h4 @click="outerVisible = true">修改密码</h4></el-dropdown-item>
                        <el-dropdown-item divided><h4 @click="loginout">退出</h4></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

            </el-col>

        </el-row>
        <el-dialog
                title="请输入当前密码："
                :visible.sync="outerVisible"
                width="30%">
            <el-input type="password" v-model="repwd"></el-input>
            <el-button @click="outerVisible = false">取 消</el-button>
            <el-button type="primary" @click="checkpwd">确 定</el-button>
        </el-dialog>
        <el-dialog
                title="请输入新密码："
                :visible.sync="innerVisible"
                width="30%">
            <el-input type="password" v-model="repwd"></el-input>
            <el-button @click="innerVisible = false">取 消</el-button>
            <el-button type="primary" @click="changepwd">确 定</el-button>
        </el-dialog>
        <el-row >
            <el-col :span="4" >
                <el-menu
                        default-active="1"
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
                    <el-submenu index="5" v-show="isadmin">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>设置</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title"><i class="el-icon-cpu"></i>传感器</template>
                            <el-menu-item index="1-1" route="setyuzhi">
                                <i class="el-icon-odometer"></i>
                                <span slot="title">传感器阈值</span>
                            </el-menu-item>
                            <el-menu-item index="1-2" route="setting">
                                <i class="el-icon-place"></i>
                                <span slot="title">传感器信息</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group >
                            <template slot="title"><i class="el-icon-message-solid"></i>预警</template>
                            <el-menu-item index="1-3" route="setphone">
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
                    <el-col :span="6">
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
                        <el-button type="primary" icon="el-icon-loading" round  v-show="!flag"><span>实时更新中...</span></el-button>
                    </el-col>
                </el-row>
                <el-divider><i class="el-icon-data-line"></i>  实时数据显示</el-divider>
                <transition name="el-zoom-in-top">
                    <el-row  v-show="!flag">
                        <el-col :span="4" class="transition-box" v-for="item in search(keywords)" :key="item.name" >
                            <div @click="showitem(item)">
                                <span>{{item.penghao}}--{{item.zhandian}}</span>
                                <p>{{item.name}}</p>
                                <p>{{item.now}}</p>
                            </div>
                        </el-col>
                    </el-row>
                </transition>
            </el-col>
        </el-row>
        <el-tooltip placement="top" content="回到顶部">
            <back-to-top :custom-style="myBackToTopStyle" :visibility-height="200" :back-position="0" transition-name="fade"/>
        </el-tooltip>
    </div>
</template>

<script>
    import  BackToTop from '../BackToTop'
    export default {
        components: { BackToTop},
        name: "Home",
        data(){
            return{
                myBackToTopStyle: {
                    right: '50px',
                    bottom: '50px',
                    width: '40px',
                    height: '40px',
                    borderRadius: '4px',
                    lineHeight: '45px', // 请保持与高度一致以垂直居中
                    background: '#e7eaf1'// 按钮的背景颜色
                },
                isadmin:false,
                username:localStorage.getItem('name'),
                pwd:localStorage.getItem('pwd'),
                repwd:'',
                outerVisible: false,
                innerVisible: false,
                activeName: 'second',
                fullscreenLoading: false,
                keywords:'',
                flag:true,
                time:'',
                loadingflag:true,
                time1:'',
                datalist:[],
                event:{
                    name:localStorage.getItem('name'),
                    event:'',
                    time:''
                },


            }
        },
        methods: {
            // eslint-disable-next-line no-unused-vars
            // tableRowClassName({max,min,now}) {
            //   let ma=parseInt(max)
            //   let mi=parseInt(min)
            //   let no=parseInt(now)
            //   // eslint-disable-next-line no-console
            //   console.log(max)
            //   if (no>ma) {
            //     // eslint-disable-next-line no-console
            //     console.log(1)
            //     return 'warning-row';
            //   } else if (no<mi) {
            //     // eslint-disable-next-line no-console
            //     console.log(3)
            //     return 'success-row';
            //   }
            //   return '';
            // },
            // eslint-disable-next-line no-unused-vars
            tableRowClassName({row, rowIndex}) {
                // eslint-disable-next-line no-console
                console.log(rowIndex)
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },
            showitem(item){
                // eslint-disable-next-line no-console
                console.log(item.danwei)
            },
            loginout(){
                let name=''
                localStorage.setItem('name' , name)
                this.$router.push({path: '/login'});
            },
            checkpwd(){
                var that=this
                // eslint-disable-next-line no-cond-assign
              if(that.pwd==that.repwd) {
                  that.outerVisible=false
                  that.repwd=''
                  that.innerVisible=true
              }else {
                  that.repwd=''
                  this.$message({
                      type: 'error',
                      message: `密码错误！请重新输入`
                  });

              }
            },
            changepwd(){
                var that=this
                // eslint-disable-next-line no-unused-vars
                that.$http.post('http://www.smartdk.top:4000/changepwd',{name:that.username,repwd:that.repwd},{emulateJSON:true}).then(function(res){
                    if(res.body=='ok'){
                        this.$message({
                            type: 'success',
                            message: `请重新登陆!`
                        });
                        that.innerVisible=false
                        var myDate=new Date()
                        var t=myDate.toLocaleDateString();
                        var t1=myDate.toLocaleTimeString();
                        that.event.time=t+t1
                        that.event.event='修改了密码，'+that.repwd
                        // eslint-disable-next-line no-unused-vars
                        this.$http.post('http://www.smartdk.top:4000/addevent',that.event,{emulateJSON:true}).then(function(res){

                            // eslint-disable-next-line no-unused-vars
                        },function(res){
                            this.$notify({
                                title: '服务器错误！',
                                type: 'error'
                            });
                        });
                        that.repwd=''
                        let name=''
                        localStorage.setItem('name' , name)
                        that.$router.push({path: '/login'});
                    }else {
                        that.$message({
                            type: 'error',
                            message: `密码更新失败！`
                        });
                    }
                    // eslint-disable-next-line no-unused-vars
                },function(res){

                });
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
                var myDate=new Date()
                that.time=myDate.toLocaleDateString();
                that.time1=myDate.toLocaleTimeString();
                that.$axios.get('http://www.smartdk.top:4000/getdata')
                    .then(function (res) {
                        // handle success
                        // eslint-disable-next-line no-console
                        let data=res.data
                        that.flag=false
                        for(let i=0;i<data.length;i++){
                            that.datalist[i].name=data[i][1]
                            that.datalist[i].now=data[i][2]
                            that.datalist[i].penghao=data[i][3]
                            that.datalist[i].zhandian=data[i][4]
                        }

                    })
                    // eslint-disable-next-line no-unused-vars
                    .catch(function (error) {
                        that.$notify({
                            title: '服务器错误！',
                            type: 'error'
                        });
                    })
                    .then(function () {
                        // always executed
                    });
            },
            open() {
                this.$alert('这是一段内容', '标题名称', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: `action: ${ action }`
                        });
                    }
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
                if(localStorage.getItem('admin')=='1'){
                    this.isadmin=true
                }
                var that=this
                this.$notify({
                    title: '正在加载数据中...',
                    type: 'success',
                    position: 'bottom-right'
                });
                setInterval(function () {

                    if(that.loadingflag){
                        that.$axios.get('http://www.smartdk.top:4000/getdata')
                            .then(function (res) {
                                // handle success
                                var myDate=new Date();
                                that.time=myDate.toLocaleDateString();
                                that.time1=myDate.toLocaleTimeString();
                                let data=res.data
                                that.flag=false
                                that.datalist=[]
                                for(let i=0;i<data.length;i++){
                                    that.datalist.push({'name':data[i][1],'now':data[i][2],'penghao':data[i][3],'zhandian':data[i][4],'max':'','min':''})
                                }

                            })
                            // eslint-disable-next-line no-unused-vars
                            .catch(function () {
                                that.$message.error('服务器当前错误');
                            })
                            .then(function () {
                                // always executed
                            });
                    }
                },1000)
            }



        },
        beforeCreate(){

        },
        destroyed(){
            this.loadingflag=false
        },

        props: {
            msg: String
        }
    }
</script>

<style scoped>
    .mainBox{
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
        font-size: 14px;

    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    .warning-row {
        background: oldlace;
    }

    .success-row {
        background: #f0f9eb;
    }
    .transition-box {
        margin-top: 10px;
        margin-bottom: 10px;
        border-radius: 4px;
        text-align: center;
        color: #44c1ff;
        padding: 40px 20px;
        box-sizing: border-box;
        cursor: pointer;
        margin-right: 20px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }
    .transition-box:hover{
        box-shadow: 0 10px 12px 0 rgba(0, 0, 0, 0.1)
    }

    a {
        color: #42b983;
    }
</style>