<template>
    <div style="margin-top: 3%">
        <el-row :gutter="20">
        <el-col :span="12" :offset="6">       
        <el-table :data="$store.state.list.filter(data => !search || data.content.toLowerCase().includes(search.toLowerCase()))" border stripe max-height="450">
            <el-table-column
                :label="type"
                prop="content">
            </el-table-column>
            <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                <el-input
                v-model="search"
                size="mini"
                @input="fun_scope(scope)"
                placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-upload
                        :auto-upload="false"
                        accept=".wav"
                        action=""
                        ref="upload"
                        multiple
                        :limit="1"
                        :on-change="onChange"
                       >
                       <!-- <el-button slot="trigger" size="medium" type="info" icon="el-icon-search">选取文件</el-button> -->
                        <el-button
                            size="medium"
                            type="success"
                            icon="el-icon-upload"
                            v-if="$store.state.list[scope.$index].audio_exist"
                            @click="handleUpload(scope.$index, scope.row)">
                            重新上传音频
                        </el-button>
                        <el-button
                            size="medium"
                            type="primary"
                            icon="el-icon-upload"
                            v-else
                            @click="handleUpload(scope.$index, scope.row)">
                            上传音频
                        </el-button>
                    </el-upload>
                    
                
                </template>
            </el-table-column>
        </el-table>
        </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'AudioUp',
    data() {
        return {
            url: 'https://www.worith.cn/api/sen_upload_audio',
            audio: null,
            picture: null,
            type: '单词',
            search: '',
            content: '',
            handleIndex: 0
        }
    },
    methods: {
        fun_scope(scope){
            let i = scope.$index
            return i + Math.random(1, 10)
        },
        onChange(file){
            console.log(file)
            this.audio = file.raw

            let formData = new FormData()
            formData.append('audio', this.audio)
            formData.append('content', this.content)

            axios.post(this.url, formData).then((res) => {
                console.log(res.data)
                this.$message({
                    message: '上传成功',
                    type: 'success'
                })
                this.$store.commit('audioState', {
                    content: this.content,
                    handleIndex: this.handleIndex
                })
            }).catch((err) => console.log(err))
        },
        handleUpload(index, row){
            console.log(index, row.content)
            this.content = row.content
            this.handleIndex = index
        }
    }
}
</script>