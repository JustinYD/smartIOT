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
                        default-active="2"
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
                <el-row style="background-color: #fff">
                    <el-col :md="5" :xs="5">
                        <el-date-picker
                                v-model="time"
                                align="right"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions">
                        </el-date-picker>

                    </el-col>
                    <el-col :md="12" :xs="12">
                        <el-button type="primary" icon="el-icon-delete" @click="getdata" >点击查询历史记录</el-button>
                        <el-button type="primary" icon="el-icon-time"  >更新时间{{time2}}{{time1}}</el-button>
                    </el-col>
                </el-row>
                <el-divider  class=""><i class="el-icon-loading"></i>  历史数据可视化</el-divider>
                <el-row >
                    <el-col :md="12" :xs="12"  >
                        <div id="total" :style="{width: '600px',height: '400px'}"></div>
                    </el-col>
                    <el-col :md="12" :xs="12" >
                        <div id="guangzhao" :style="{width: '600px', height: '400px'}"></div>
                    </el-col>

                </el-row >
                <el-row  type="flex" justify="center" class="echartsbox">
                    <el-col :md="8" :xs="8">
                        <div id="map" :style="{width: '400px', height: '400px'}"></div>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :md="8" :xs="8" class="echartsbox">
                        <div id="kongqi" :style="{width: '600px', height: '400px'}"></div>
                    </el-col>
                </el-row>
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
        name: "History",
        components: { BackToTop},
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
                isadmin:false,
                username:localStorage.getItem('name'),
                time2:'',
                time1:'',
                fengxiang:[],
                fengsu:[],
                yyht:[],
                eyht:[],
                yq:[],
                sphz:[],
                swd:[],
                qqi:[],
                trwd:[],
                trsd:[],
                anqi:[],
                kqwd:[],
                kqsd:[],
                pm2:[],
                gz:[],
                yx:[],
                value: new Date(),
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                time:''
            };
        },
        methods: {
            loginout(){
                let name=''
                localStorage.setItem('name' , name)
                this.$router.push({path: '/login'});
            },
            getdata(){
                var myDate=new Date()
                this.time2=myDate.toLocaleDateString();
                this.time1=myDate.toLocaleTimeString();
                this.fengxiang=[]
                this.fengsu=[];
                this.yyht=[];
                this.eyht=[];
                this.yq=[];
                this.sphz=[];
                this.swd=[];
                this.qqi=[];
                this.trwd=[];
                this.trsd=[];
                this.anqi=[];
                this.kqwd=[];
                this.kqsd=[];
                this.pm2=[];
                this.gz=[];
                this.yx=[];
                var that=this
                var date = new Date(this.time);
                var date_value=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                this.$http.post('http://www.smartdk.top:4000/history',{times:date_value},{emulateJSON:true}).then(function(res){
                    if(res.body.length==0){
                        that.$message.error('当日没有数据！请重新选择日期');
                    }else {
                        if(res.body.length==0){
                            that.$message.error('当日没有数据！请重新选择日期');
                        }else {
                            var data=res.body
                            for (var i=0;i<data.length;i++) {
                                that.fengxiang.push(data[i][2]);
                                that.fengsu.push(data[i][3]);
                                that.yyht.push(data[i][4]);
                                that.eyht.push(data[i][5]);
                                that.yq.push(data[i][6]);
                                that.sphz.push(data[i][7]);
                                that.swd.push(data[i][8]);
                                that.qqi.push(data[i][9]);
                                that.trwd.push(data[i][10]);
                                that.trsd.push(data[i][11]);
                                that.anqi.push(data[i][12]);
                                that.kqwd.push(data[i][13]);
                                that.kqsd.push(data[i][14]);
                                that.pm2.push(data[i][15]);
                                that.gz.push(data[i][16]);
                                that.yx.push(data[i][17]);
                            }
                            that.$message.success('数据查询成功！');
                            that.drawwater();
                            that.drawmap();
                            that.drawkongqi();
                            this.drawguangzhao();
                        }
                    }
                },function(res){
                    // eslint-disable-next-line no-console
                    console.log(res.status);
                });
            },
            drawguangzhao(){
                let myChart= this.$echarts.init(document.getElementById('guangzhao'))
                myChart.setOption({
                    // title : {
                    //     text: '气体检测',
                    //     x:'left',
                    //     subtext:this.time+this.time1+'更新'
                    // },
                    // tooltip: {
                    //     trigger: 'axis',
                    //     axisPointer: {
                    //         type: 'cross',
                    //         crossStyle: {
                    //             color: '#999'
                    //         }
                    //     }
                    // },
                    // toolbox: {
                    //     orient: 'vertical',
                    //     feature: {
                    //         magicType: {show: true, type: ['line', 'bar']},
                    //         restore: {show: true},
                    //         saveAsImage: {show: true}
                    //     }
                    // },
                    // legend: {
                    //     data:['一氧化碳','二氧化碳','氧气']
                    // },
                    // xAxis: [
                    //     {
                    //         type: 'category',
                    //         data :['00'+'时','01'+'时','02'+'时','03'+'时','04'+'时','05'+'时','06'+'时','07'+'时','08'+'时','09'+'时','10'+'时','11'+'时','12'+'时','13'+'时','14'+'时','15'+'时','16'+'时','17'+'时','18'+'时','19'+'时','20'+'时','21'+'时','22'+'时','23'+'时'],
                    //         axisPointer: {
                    //             type: 'shadow'
                    //         }
                    //     }
                    // ],
                    // yAxis: [
                    //     {
                    //         type: 'value',
                    //         name: '',
                    //         min: 0,
                    //         max: 10,
                    //         interval: 50,
                    //         axisLabel: {
                    //             formatter: '{value} %'
                    //         }
                    //     },
                    //     {
                    //         type: 'value',
                    //         name: '浓度',
                    //         min: 0,
                    //         max: 10,
                    //         interval: 50,
                    //         axisLabel: {
                    //             formatter: '{value} %'
                    //         }
                    //     }
                    // ],
                    // series: [
                    //     {
                    //         name:'一氧化碳',
                    //         type:'bar',
                    //         data:this.yyht
                    //     },
                    //     {
                    //         name:'二氧化碳',
                    //         type:'bar',
                    //         data:this.eyht
                    //     },
                    //     {
                    //         name:'氧气',
                    //         type:'line',
                    //         yAxisIndex: 1,
                    //         data:this.yq
                    //     }
                    // ]
                    backgroundColor: "#05224d",
                    tooltip: {},
                    grid: {
                        top: '8%',
                        left: '1%',
                        right: '1%',
                        bottom: '8%',
                        containLabel: true,
                    },
                    legend: {
                        itemGap: 50,
                        data: ['注册总量' ,'最新注册量'],
                        textStyle: {
                            color: '#f9f9f9',
                            borderColor: '#fff'
                        },
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: true,
                        axisLine: { //坐标轴轴线相关设置。数学上的x轴
                            show: true,
                            lineStyle: {
                                color: '#f9f9f9'
                            },
                        },
                        axisLabel: { //坐标轴刻度标签的相关设置
                            textStyle: {
                                color: '#d1e6eb',
                                margin: 15,
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', ],
                    }],
                    yAxis: [{
                        type: 'value',
                        min: 0,
                        // max: 140,
                        splitNumber: 7,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#0a3256'
                            }
                        },
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            margin: 20,
                            textStyle: {
                                color: '#d1e6eb',

                            },
                        },
                        axisTick: {
                            show: false,
                        },
                    }],
                    series: [{
                        name: '注册总量',
                        type: 'line',
                        // smooth: true, //是否平滑曲线显示
                        // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                        showAllSymbol: true,
                        symbol: 'emptyCircle',
                        symbolSize: 6,
                        lineStyle: {
                            normal: {
                                color: "#28ffb3", // 线条颜色
                            },
                            borderColor: '#f0f'
                        },
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#fff',
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#28ffb3",

                            }
                        },
                        tooltip: {
                            show: false
                        },
                        areaStyle: { //区域填充样式
                            normal: {
                                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(0,154,120,1)'
                                },
                                    {
                                        offset: 1,
                                        color: 'rgba(0,0,0, 0)'
                                    }
                                ], false),
                                shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                                shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                            }
                        },
                        data: [393, 438, 485, 631, 689, 824, 987]
                    }, {
                        name: '最新注册量',
                        type: 'bar',
                        barWidth: 20,
                        tooltip: {
                            show: false
                        },
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#fff',
                            }
                        },
                        itemStyle: {
                            normal: {
                                // barBorderRadius: 5,
                                // color: new echarts.graphic.LinearGradient(
                                //     0, 0, 0, 1,
                                //     [{
                                //             offset: 0,
                                //             color: '#14c8d4'
                                //         },
                                //         {
                                //             offset: 1,
                                //             color: '#43eec6'
                                //         }
                                //     ]
                                // )
                                color: function(params) {
                                    var colorList = ['#0ec1ff', '#10cdff', '#12daff', '#15ebff', '#17f8ff', '#1cfffb', '#1dfff1'];
                                    return colorList[params.dataIndex];
                                }
                            }
                        },
                        data: [200, 382, 102, 267, 186, 315, 316]
                    }]
                })
            },
            drawwater(){
                // 基于准备好的dom，初始化echarts实例
                // eslint-disable-next-line no-unused-vars
                var that=this
                let myChart = this.$echarts.init(document.getElementById('total'))
                // 绘制图表
                myChart.setOption({
                    // title: {
                    //     text: '水',
                    //     subtext:that.time+that.time1+'更新',
                    // },
                    // tooltip : {
                    //     trigger: 'axis',
                    //     axisPointer: {
                    //         type: 'cross',
                    //         label: {
                    //             backgroundColor: '#462d85'
                    //         }
                    //     }
                    // },
                    // legend: {
                    //     data:['水PH值','水温度','氢气'],
                    //
                    // },
                    // toolbox: {
                    //     orient: 'vertical',
                    //     show: true,
                    //     feature: {
                    //         magicType: {type: ['line', 'bar']},
                    //         restore: {},
                    //         saveAsImage: {}
                    //     }
                    // },
                    // grid: {
                    //     left: '3%',
                    //     right: '4%',
                    //     bottom: '3%',
                    //     containLabel: true
                    // },
                    // xAxis : [
                    //     {
                    //         type : 'category',
                    //         boundaryGap : false,
                    //         data :['00'+'时','01'+'时','02'+'时','03'+'时','04'+'时','05'+'时','06'+'时','07'+'时','08'+'时','09'+'时','10'+'时','11'+'时','12'+'时','13'+'时','14'+'时','15'+'时','16'+'时','17'+'时','18'+'时','19'+'时','20'+'时','21'+'时','22'+'时','23'+'时']
                    //     }
                    // ],
                    // yAxis : [
                    //     {
                    //         type : 'value'
                    //     }
                    // ],
                    // series : [
                    //     {
                    //         name:'水PH值',
                    //         type:'line',
                    //         stack: '总量',
                    //         areaStyle: {},
                    //         label: {
                    //             normal: {
                    //                 show: true,
                    //                 position: 'top'
                    //             }
                    //         },
                    //         data:that.sphz
                    //     },
                    //     {
                    //         name:'水温度',
                    //         type:'line',
                    //         stack: '总量',
                    //         areaStyle: {},
                    //         label: {
                    //             normal: {
                    //                 show: true,
                    //                 position: 'top'
                    //             }
                    //         },
                    //         data:that.swd
                    //     },
                    //     {
                    //         name:'氢气',
                    //         type:'line',
                    //         stack: '总量',
                    //         label: {
                    //             normal: {
                    //                 show: true,
                    //                 position: 'top'
                    //             }
                    //         },
                    //         areaStyle: {normal: {}},
                    //         data:that.qqi
                    //     }
                    // ]
                    backgroundColor: '#18163B',
                    grid: {
                        top: '15%',
                        right: '3%',
                        left: '5%',
                        bottom: '12%'
                    },
                    xAxis: [{
                        type: 'category',
                        color: '#59588D',
                        data: ['学员续费率', '试听课转换率', '课程消费率', '课后评分率', '作业完成率', '班级满班率', '排课上课率', '体验课转化率'],
                        axisPointer: {
                            type: 'line'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#272456'
                            }
                        },
                        axisLabel: {
                            margin: 20,
                            color: '#59588D',
                            textStyle: {
                                fontSize: 12
                            },
                        },
                    }],
                    yAxis: [{
                        min: 0,
                        max: 100,
                        axisLabel: {
                            formatter: '{value}%',
                            color: '#59588D',
                        },
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#272456'
                            }
                        }
                    }],
                    series: [{
                        type: 'bar',
                        data: [100, 90, 10, 90, 90, 20, 56, 89],
                        barWidth: '20px',
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#41E1D4' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#10A7DB' // 100% 处的颜色
                                }], false),
                                barBorderRadius: [30, 30, 0, 0],
                                shadowColor: 'rgba(0,255,225,1)',
                                shadowBlur: 4,
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                lineHeight: 30,
                                width: 80,
                                height: 30,
                                backgroundColor: '#252453',
                                borderRadius: 200,
                                position: ['-8', '-60'],
                                distance: 1,
                                formatter: [
                                    '    {d|●}',
                                    ' {a|{c}%}     \n',
                                    '    {b|}'
                                ].join(''),
                                rich: {
                                    d: {
                                        color: '#3CDDCF',
                                    },
                                    a: {
                                        color: '#fff',
                                        align: 'center',
                                    },
                                    b: {
                                        width: 1,
                                        height: 30,
                                        borderWidth: 1,
                                        borderColor: '#234e6c',
                                        align: 'left'
                                    },
                                }
                            }
                        }
                    }]
                });
            },
            drawkongqi(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('kongqi'))
                // 绘制图表
                myChart.setOption({
                    // title: {
                    //     text: '空气质量',
                    //     subtext:this.time+this.time1+'更新',
                    // },
                    // tooltip: {
                    //     trigger: 'axis'
                    // },
                    // legend: {
                    //     data:['空气温度','空气湿度','PM2.5']
                    // },
                    // toolbox: {
                    //     left: 'right',
                    //     top: 'center',
                    //     orient: 'vertical',
                    //     show: true,
                    //     feature: {
                    //         magicType: {type: ['line', 'bar']},
                    //         restore: {},
                    //         saveAsImage: {}
                    //     }
                    // },
                    // xAxis:  {
                    //     type: 'category',
                    //     boundaryGap: false,
                    //     data :['00'+'时','01'+'时','02'+'时','03'+'时','04'+'时','05'+'时','06'+'时','07'+'时','08'+'时','09'+'时','10'+'时','11'+'时','12'+'时','13'+'时','14'+'时','15'+'时','16'+'时','17'+'时','18'+'时','19'+'时','20'+'时','21'+'时','22'+'时','23'+'时']
                    // },
                    // yAxis: {
                    //     type: 'value',
                    //     axisLabel: {
                    //         formatter: '{value} °C'
                    //     }
                    // },
                    // series: [
                    //     {
                    //         name:'空气温度',
                    //         type:'line',
                    //         data:this.kqwd,
                    //         markPoint: {
                    //             data: [
                    //                 {type: 'max', name: '最大值'},
                    //                 {type: 'min', name: '最小值'}
                    //             ]
                    //         },
                    //         markLine: {
                    //             data: [
                    //                 {type: 'average', name: '平均值'}
                    //             ]
                    //         }
                    //     },
                    //     {
                    //         name:'空气湿度',
                    //         type:'line',
                    //         data:this.kqsd,
                    //         markPoint: {
                    //             data: [
                    //                 {name: '日最低', value: -2, xAxis: 1, yAxis: -1.5}
                    //             ]
                    //         },
                    //         markLine: {
                    //             data: [
                    //                 {type: 'average', name: '平均值'},
                    //                 [{
                    //                     symbol: 'none',
                    //                     x: '90%',
                    //                     yAxis: 'max'
                    //                 }, {
                    //                     symbol: 'circle',
                    //                     label: {
                    //                         normal: {
                    //                             position: 'start',
                    //                             formatter: '最大值'
                    //                         }
                    //                     },
                    //                     type: 'max',
                    //                     name: '最高点'
                    //                 }]
                    //             ]
                    //         }
                    //     },
                    //     {
                    //         name:'PM2.5',
                    //         type:'line',
                    //         data:this.pm2,
                    //         markPoint: {
                    //             data: [
                    //                 {name: '日最低', value: -2, xAxis: 1, yAxis: -1.5}
                    //             ]
                    //         },
                    //         markLine: {
                    //             data: [
                    //                 {type: 'average', name: '平均值'},
                    //                 [{
                    //                     symbol: 'none',
                    //                     x: '90%',
                    //                     yAxis: 'max'
                    //                 }, {
                    //                     symbol: 'circle',
                    //                     label: {
                    //                         normal: {
                    //                             position: 'start',
                    //                             formatter: '最大值'
                    //                         }
                    //                     },
                    //                     type: 'max',
                    //                     name: '最高点'
                    //                 }]
                    //             ]
                    //         }
                    //     }
                    // ]
                    backgroundColor: '#080b30',
                    title: {
                        text: '空气检测',
                        textStyle: {
                            align: 'center',
                            color: '#fff',
                            fontSize: 20,
                        },
                        top: '5%',
                        left: 'center',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            lineStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(0, 255, 233,0)'
                                    }, {
                                        offset: 0.5,
                                        color: 'rgba(255, 255, 255,1)',
                                    }, {
                                        offset: 1,
                                        color: 'rgba(0, 255, 233,0)'
                                    }],
                                    global: false
                                }
                            },
                        },
                    },
                    grid: {
                        top: '15%',
                        left: '5%',
                        right: '5%',
                        bottom: '15%',
                        // containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        axisLine: {
                            show: true
                        },
                        splitArea: {
                            // show: true,
                            color: '#f00',
                            lineStyle: {
                                color: '#f00'
                            },
                        },
                        axisLabel: {
                            color: '#fff'
                        },
                        splitLine: {
                            show: false
                        },
                        boundaryGap: false,
                        data: ['A', 'B', 'C', 'D', 'E', 'F'],

                    }],

                    yAxis: [{
                        type: 'value',
                        min: 0,
                        // max: 140,
                        splitNumber: 4,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(255,255,255,0.1)'
                            }
                        },
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                            margin: 20,
                            textStyle: {
                                color: '#d1e6eb',

                            },
                        },
                        axisTick: {
                            show: false,
                        },
                    }],
                    series: [{
                        name: '注册总量',
                        type: 'line',
                        // smooth: true, //是否平滑
                        showAllSymbol: true,
                        // symbol: 'image://./static/images/guang-circle.png',
                        symbol: 'circle',
                        symbolSize: 25,
                        lineStyle: {
                            normal: {
                                color: "#6c50f3",
                                shadowColor: 'rgba(0, 0, 0, .3)',
                                shadowBlur: 0,
                                shadowOffsetY: 5,
                                shadowOffsetX: 5,
                            },
                        },
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#6c50f3',
                            }
                        },
                        itemStyle: {
                            color: "#6c50f3",
                            borderColor: "#fff",
                            borderWidth: 3,
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 0,
                            shadowOffsetY: 2,
                            shadowOffsetX: 2,
                        },
                        tooltip: {
                            show: false
                        },
                        areaStyle: {
                            normal: {
                                // eslint-disable-next-line no-undef
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(108,80,243,0.3)'
                                },
                                    {
                                        offset: 1,
                                        color: 'rgba(108,80,243,0)'
                                    }
                                ], false),
                                shadowColor: 'rgba(108,80,243, 0.9)',
                                shadowBlur: 20
                            }
                        },
                        data: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02, ]
                    },
                        {
                            name: '注册总量',
                            type: 'line',
                            // smooth: true, //是否平滑
                            showAllSymbol: true,
                            // symbol: 'image://./static/images/guang-circle.png',
                            symbol: 'circle',
                            symbolSize: 25,
                            lineStyle: {
                                normal: {
                                    color: "#00ca95",
                                    shadowColor: 'rgba(0, 0, 0, .3)',
                                    shadowBlur: 0,
                                    shadowOffsetY: 5,
                                    shadowOffsetX: 5,
                                },
                            },
                            label: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#00ca95',
                                }
                            },

                            itemStyle: {
                                color: "#00ca95",
                                borderColor: "#fff",
                                borderWidth: 3,
                                shadowColor: 'rgba(0, 0, 0, .3)',
                                shadowBlur: 0,
                                shadowOffsetY: 2,
                                shadowOffsetX: 2,
                            },
                            tooltip: {
                                show: false
                            },
                            areaStyle: {
                                normal: {
                                    // eslint-disable-next-line no-undef
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(0,202,149,0.3)'
                                    },
                                        {
                                            offset: 1,
                                            color: 'rgba(0,202,149,0)'
                                        }
                                    ], false),
                                    shadowColor: 'rgba(0,202,149, 0.9)',
                                    shadowBlur: 20
                                }
                            },
                            data: [281.55, 398.35, 214.02, 179.55, 289.57, 356.14, ],
                        },
                    ]
                });
            },
            drawmap(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('map'))
                // 绘制图表
                myChart.setOption({
                    backgroundColor: 'transparent',

                    title: {
                        text: '传感器分布图',
                        left: 'center',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    series: [{
                        type: 'map',
                        label: {
                            emphasis: {
                                show: true
                            }
                        },
                        zoom:1.2,
                        roam: false,
                        map: '云南',
                        // eslint-disable-next-line no-irregular-whitespace
                        itemStyle: {    //地图颜色
                            normal: {
                                areaColor: '#5fc9f8',
                                borderColor: '#9be4ff'
                            },
                            emphasis: {
                                areaColor: '#43b9f6'
                            }
                        }
                    }]
                });
            },
            getnowdate(){
                var date = new Date();
                var seperator1 = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = year + seperator1 + month + seperator1 + strDate;
                return currentdate
            }
        },
        mounted(){
            this.drawwater();
            this.drawmap();
            this.drawkongqi();
            this.drawguangzhao();
        },
        created(){
            if(this.username==''){
                this.$router.push({path: '/login'});
                this.$notify({
                    title: '请登录！',
                    type: 'error'
                });
            }else{
                if (localStorage.getItem('admin') == '1') {
                    this.isadmin = true
                }
                var myDate=new Date()
                this.time2=myDate.toLocaleDateString();
                this.time1=myDate.toLocaleTimeString();
                this.fengxiang=[]
                this.fengsu=[];
                this.yyht=[];
                this.eyht=[];
                this.yq=[];
                this.sphz=[];
                this.swd=[];
                this.qqi=[];
                this.trwd=[];
                this.trsd=[];
                this.anqi=[];
                this.kqwd=[];
                this.kqsd=[];
                this.pm2=[];
                this.gz=[];
                this.yx=[];
                var that=this
                this.time=this.getnowdate()
                var date = new Date(this.time);
                var date_value=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                this.$http.post('http://www.smartdk.top:4000/history',{times:date_value},{emulateJSON:true}).then(function(res){
                    if(res.body.length==0){
                        that.$message.error('当日没有数据！请重新选择日期');
                    }else {
                        var data=res.body
                        for (var i=0;i<data.length;i++) {
                            that.fengxiang.push(data[i][2]);
                            that.fengsu.push(data[i][3]);
                            that.yyht.push(data[i][4]);
                            that.eyht.push(data[i][5]);
                            that.yq.push(data[i][6]);
                            that.sphz.push(data[i][7]);
                            that.swd.push(data[i][8]);
                            that.qqi.push(data[i][9]);
                            that.trwd.push(data[i][10]);
                            that.trsd.push(data[i][11]);
                            that.anqi.push(data[i][12]);
                            that.kqwd.push(data[i][13]);
                            that.kqsd.push(data[i][14]);
                            that.pm2.push(data[i][15]);
                            that.gz.push(data[i][16]);
                            that.yx.push(data[i][17]);
                        }
                        that.$message.success('数据查询成功！');
                        that.drawwater();
                        that.drawmap();
                        that.drawkongqi();
                        this.drawguangzhao();
                    }
                },function(res){
                    // eslint-disable-next-line no-console
                    console.log(res.status);
                });
            }

        }
    }
</script>

<style scoped>
    .echartsbox{
        box-shadow: 0 2px 10px 0 #D4D4D4;
        margin-bottom: 20px;
    }
</style>