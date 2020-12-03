<template>
  <div id="upload">
    <el-row :gutter="20">
      <el-col :span="8" :offset="9">
        <el-upload
          accept=".xlsx"
          action=""
          ref="upload"
          :on-change="on_change"
          :auto-upload="false"
          multiple
          :limit="1"
          :on-exceed="on_exceed"

        >
          <el-button style="margin-left: 10%" slot="trigger" size="big" type="info" icon="el-icon-search">选取文件</el-button>
          <el-button
            style="margin-left: 10%"
            size="big"
            type="primary"
            icon="el-icon-upload"
            @click="submit"
            >上传文件</el-button>
          <div slot="tip" class="el-upload__tip">
            <span>上传ms-excel文件，此文件中包含需要上传音频数据的内容</span>          
          </div>
        </el-upload>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "FileUP",
  data() {
    return {
      url: "https://www.worith.cn/api/sen_upload_csv",
      file: null
    };
  },
  methods: {
    on_exceed(files, fileList) {
      console.log(files, fileList)
      this.$message({
          message: '超过数量限制',
          type: 'warning'
        })
    },
    on_change(file){
      this.file = file
    },
    submit() {  
      if (this.file.raw.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
        this.$message.error("文件类型错误")
        return
      }
      let formData = new FormData()
      
      formData.append('word', this.file.raw)
      
      //console.log(formData)
      axios.post(this.url, formData).then((res) => {
        console.log(res)
        this.$store.commit('returnList', {
          list: res.data.data
        })
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        this.$refs.upload.clearFiles()
      }).catch((err) => console.log(err))
    },
  },
};
</script>

<style scoped>
    #upload{
        margin-top: 8%;
    }
</style>