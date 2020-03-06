<template>
    <div >
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
            <el-col :md="11" :xs="11" class="echartsbox" style="margin-right: 50px">
                <div id="total" :style="{width: '600px',height: '400px'}"></div>
            </el-col>
            <el-col :md="11" :xs="11" class="echartsbox">
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
    </div>
</template>

<script>
    export default {
        data() {
            return {
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
                    title : {
                        text: '气体检测',
                        x:'left',
                        subtext:this.time+this.time1+'更新'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {
                        orient: 'vertical',
                        feature: {
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data:['一氧化碳','二氧化碳','氧气']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data :['00'+'时','01'+'时','02'+'时','03'+'时','04'+'时','05'+'时','06'+'时','07'+'时','08'+'时','09'+'时','10'+'时','11'+'时','12'+'时','13'+'时','14'+'时','15'+'时','16'+'时','17'+'时','18'+'时','19'+'时','20'+'时','21'+'时','22'+'时','23'+'时'],
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '',
                            min: 0,
                            max: 10,
                            interval: 50,
                            axisLabel: {
                                formatter: '{value} %'
                            }
                        },
                        {
                            type: 'value',
                            name: '浓度',
                            min: 0,
                            max: 10,
                            interval: 50,
                            axisLabel: {
                                formatter: '{value} %'
                            }
                        }
                    ],
                    series: [
                        {
                            name:'一氧化碳',
                            type:'bar',
                            data:this.yyht
                        },
                        {
                            name:'二氧化碳',
                            type:'bar',
                            data:this.eyht
                        },
                        {
                            name:'氧气',
                            type:'line',
                            yAxisIndex: 1,
                            data:this.yq
                        }
                    ]
                })
            },
            drawwater(){
                // 基于准备好的dom，初始化echarts实例
                var that=this
                let myChart = this.$echarts.init(document.getElementById('total'))
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: '水',
                        subtext:that.time+that.time1+'更新',
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#462d85'
                            }
                        }
                    },
                    legend: {
                        data:['水PH值','水温度','氢气'],

                    },
                    toolbox: {
                        orient: 'vertical',
                        show: true,
                        feature: {
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data :['00'+'时','01'+'时','02'+'时','03'+'时','04'+'时','05'+'时','06'+'时','07'+'时','08'+'时','09'+'时','10'+'时','11'+'时','12'+'时','13'+'时','14'+'时','15'+'时','16'+'时','17'+'时','18'+'时','19'+'时','20'+'时','21'+'时','22'+'时','23'+'时']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'水PH值',
                            type:'line',
                            stack: '总量',
                            areaStyle: {},
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data:that.sphz
                        },
                        {
                            name:'水温度',
                            type:'line',
                            stack: '总量',
                            areaStyle: {},
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data:that.swd
                        },
                        {
                            name:'氢气',
                            type:'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            areaStyle: {normal: {}},
                            data:that.qqi
                        }
                    ]
                });
            },
            drawkongqi(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('kongqi'))
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: '空气质量',
                        subtext:this.time+this.time1+'更新',
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['空气温度','空气湿度','PM2.5']
                    },
                    toolbox: {
                        left: 'right',
                        top: 'center',
                        orient: 'vertical',
                        show: true,
                        feature: {
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data :['00'+'时','01'+'时','02'+'时','03'+'时','04'+'时','05'+'时','06'+'时','07'+'时','08'+'时','09'+'时','10'+'时','11'+'时','12'+'时','13'+'时','14'+'时','15'+'时','16'+'时','17'+'时','18'+'时','19'+'时','20'+'时','21'+'时','22'+'时','23'+'时']
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} °C'
                        }
                    },
                    series: [
                        {
                            name:'空气温度',
                            type:'line',
                            data:this.kqwd,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:'空气湿度',
                            type:'line',
                            data:this.kqsd,
                            markPoint: {
                                data: [
                                    {name: '日最低', value: -2, xAxis: 1, yAxis: -1.5}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'},
                                    [{
                                        symbol: 'none',
                                        x: '90%',
                                        yAxis: 'max'
                                    }, {
                                        symbol: 'circle',
                                        label: {
                                            normal: {
                                                position: 'start',
                                                formatter: '最大值'
                                            }
                                        },
                                        type: 'max',
                                        name: '最高点'
                                    }]
                                ]
                            }
                        },
                        {
                            name:'PM2.5',
                            type:'line',
                            data:this.pm2,
                            markPoint: {
                                data: [
                                    {name: '日最低', value: -2, xAxis: 1, yAxis: -1.5}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'},
                                    [{
                                        symbol: 'none',
                                        x: '90%',
                                        yAxis: 'max'
                                    }, {
                                        symbol: 'circle',
                                        label: {
                                            normal: {
                                                position: 'start',
                                                formatter: '最大值'
                                            }
                                        },
                                        type: 'max',
                                        name: '最高点'
                                    }]
                                ]
                            }
                        }
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
</script>

<style scoped>
    .echartsbox{
        box-shadow: 0 2px 10px 0 #D4D4D4;
        margin-bottom: 20px;
    }
</style>