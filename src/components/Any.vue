<template>
    <div v-loading="loading"
         element-loading-text="上传中"
         element-loading-spinner="el-icon-loading">
<!--        <form method="post" action="http://127.0.0.1:5000/upload" enctype="multipart/form-data">-->
<!--            <input type="file" size="30" name="photo"/>-->
<!--            <br>-->
<!--            <input type="submit" value="提交信息" class="button-new" style="margin-top:15px;"/>-->
<!--        </form>-->
<!--        <el-button class="btn" @click="upload">测试</el-button>-->
        <van-button @click="test">vant</van-button>
        <form>
            <input class="el-input" type="file" @change="getFile($event)" accept="image/*">
            <button class="btn" @click="submitForm($event)">提交</button>
        </form>
        <img :src=imgurl style="width: 400px;height: 400px">
        <pre>{{data}}</pre>
        

    </div>
</template>

<script>
    export default {
        name: "Any",
        data(){
            return{
                loading:false,
                data:'',
                file:'',
                imgurl:'',
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
            }
        },
        methods:{
            test(){
                console.log("vant按钮")
            },
            getFile(event) {
                this.file = event.target.files[0];
                var file = event.target.files[0];
                this.imgurl=window.URL.createObjectURL(file)
            },
            submitForm(event) {
                this.loading=true
                event.preventDefault();
                let formData = new FormData();
                formData.append('photo', this.file);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }

                this.$http.post('http://127.0.0.1:5000/upload', formData, config).then(function (res) {
                    this.loading=false
                    this.data=res.body
                })
            },
            upload(){
                // eslint-disable-next-line no-console
                console.log(this.imgurl)
                this.$http.get('http://127.0.0.1:5000/test',{emulateJSON:true}).then(function(res){
                    console.log(res.body)
                    // eslint-disable-next-line no-unused-vars
                },function(res){
                    // eslint-disable-next-line no-console
                    console.log(res)
                });
            },
            handleRemove(file, fileList) {
                // eslint-disable-next-line no-console
                console.log(file, fileList);
            },
            handlePreview(file) {
                // eslint-disable-next-line no-console
                console.log(file);
            }
        }
    }
</script>

<style scoped>
    .test{
        width: 200px;
        color: #0fb4ca;
    }
</style>