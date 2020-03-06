<template>
  <div>
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

<!--    <div v-show="flag">-->
<!--      <el-collapse-transition>-->
<!--        <p class="transition-box">{{input1}}</p>-->
<!--      </el-collapse-transition>-->
<!--    </div>-->
  </div>

</template>

<script>
export default {

  name: 'HelloWorld',
  data(){
    return{
      activeName: 'second',
      fullscreenLoading: false,
      keywords:'',
      flag:true,
      time:'',
      loadingflag:true,
        time1:'',
      datalist:[],
      tableData: [{
        dapeng: '一号大棚',
        zhandian: '三号站点',
        name: '风速',
        max:'45',
        now:'23',
        min:'10',
        danwei:'m/s'
      }, {
        dapeng: '二号大棚',
        zhandian: '三号',
        name: '一氧化碳',
        max:'45',
        now:'23',
        min:'10',
        danwei:'%'
      }, {
        dapeng: '一号大棚',
        zhandian: '三号',
        name: '二氧化碳',
        max:'45',
        now:'47',
        min:'10',
        danwei:'%'
      }, {
        dapeng: '一号大棚',
        zhandian: '三号',
        name: '氨气',
        max:'45',
        now:'23',
        min:'10',
        danwei:'%'
      },
        {
        dapeng: '一号大棚',
        zhandian: '三号',
        name: '空气温度',
        max:'45',
        now:'23',
        min:'10',
          danwei:'℃'
      },{
          dapeng: '二号大棚',
          zhandian: '三号',
          name: '土壤湿度',
          max:'45',
          now:'23',
          min:'10',
          danwei:'%'
        }, {
          dapeng: '一号大棚',
          zhandian: '三号',
          name: '氢气',
          max:'45',
          now:'23',
          min:'10',
          danwei:'%'
        }, {
          dapeng: '一号大棚',
          zhandian: '三号',
          name: '氮气',
          max:'45',
          now:'47',
          min:'10',
          danwei:'%'
        }],

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
            .catch(function (error) {
                // handle error
                // eslint-disable-next-line no-console
                console.log(error);
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
      // eslint-disable-next-line no-console
      var that=this

      this.$notify({
        title: '正在加载数据中...',
        type: 'success'
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
                  .catch(function (error) {
                    // handle error
                    // eslint-disable-next-line no-console
                    console.log(error);
                  })
                  .then(function () {
                    // always executed
                  });
        }
      },1000)


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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
