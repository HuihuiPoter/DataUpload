<template>
    <div style="margin-top: 3%">
        <el-row :gutter="20">
        <el-col :span="18" :offset="3">       
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
                    <!-- <el-upload
                        :auto-upload="false"
                        accept=".wav"
                        action=""
                        ref="upload"
                        multiple
                        :limit="1"
                        :on-change="onChange"
                       > -->
                        <el-button
                            size="medium"
                            type="success"
                            icon="el-icon-upload"
                            v-if="$store.state.list[scope.$index].audio_exist"
                            @click="createAudio(scope.$index, scope.row)"
                            >
                            重新生成音频
                        </el-button>
                        <el-button
                            size="medium"
                            type="primary"
                            icon="el-icon-upload"
                            v-else
                            @click="createAudio(scope.$index, scope.row)">
                            生成音频
                        </el-button>
                    <!-- </el-upload>    -->
                </template>
            </el-table-column>
            <el-table-column align="right">
                <!-- <template slot="header" slot-scope="scope">
                <el-input
                v-model="search"
                size="mini"
                @input="fun_scope(scope)"
                placeholder="输入关键字搜索"/>
                </template> -->
                <template slot-scope="scope">
                    <el-upload
                        :auto-upload="false"
                        accept=".png,.jpg"
                        action=""
                        ref="upload"
                        multiple
                        list-type="picture"
                        :limit="1"
                        :on-change="onChange_img"
                       >
                       <!-- <el-button slot="trigger" size="medium" type="info" icon="el-icon-search">选取文件</el-button> -->
                        <el-button
                            size="medium"
                            type="success"
                            icon="el-icon-upload"
                            v-if="$store.state.list[scope.$index].photo_exist"
                            @click="handleUpload(scope.$index, scope.row)">
                            重新上传图片
                        </el-button>
                        <el-button
                            size="medium"
                            type="primary"
                            icon="el-icon-upload"
                            v-else
                            @click="handleUpload(scope.$index, scope.row)">
                            上传图片
                        </el-button>
                    </el-upload>     
                </template>
            </el-table-column>
        </el-table>
        </el-col>
        </el-row>
        <audio :src="myaudio_url" ref="myaudio"></audio>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'AudioUp',
    data() {
        return {
            audio_url: 'https://www.worith.cn/api/upload_audio_word',
            img_url: 'https://www.worith.cn/api/upload_photo_word',
            audio: null,
            img: null,
            type: '单词',
            search: '',
            content: '',
            handleIndex: 0,
            myaudio_url: ''
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

            axios.post(this.audio_url, formData).then((res) => {
                console.log(res.data)
                this.$message({
                    message: '上传成功',
                    type: 'success'
                })
                this.$store.commit('audioState', {
                    content: this.content,
                    handleIndex: this.handleIndex,
                    audio_exist: true
                })
            }).catch((err) => console.log(err))
        },
        onChange_img(file){
            console.log(file)
            this.img = file.raw

            let formData = new FormData()
            formData.append('photo', this.img)
            formData.append('word_content', this.content)

            axios.post(this.img_url, formData).then((res) => {
                console.log(res.data)
                if (res.data.code == 200) {
                this.$message({
                    message: '上传成功',
                    type: 'success'
                })
                this.$store.commit('imgState', {
                    content: this.content,
                    handleIndex: this.handleIndex,
                    image_exist: true
                })
                }
            }).catch((err) => console.log(err))
        },
        handleUpload(index, row){
            console.log(index, row.content)
            this.content = row.content
            this.handleIndex = index
        },
        createAudio(index, row){
            this.content = row.content
            this.handleIndex = index

            let formData = new FormData()
            formData.append('content', this.content)

            axios.post(this.audio_url, formData).then((res) => {
                console.log(res.data)
                if (res.data.code == 200) {
                    this.$message({
                        message: '生成成功',
                        type: 'success'
                    })
                    this.myaudio_url = 'https://smtaudio-1257019756.cos.ap-shanghai.myqcloud.com/wordaudio/' + this.content + '.mp3'
                    this.$refs.myaudio.load()
                    const self = this
                    this.$refs.myaudio.oncanplay = function() {
                        self.$refs.myaudio.play()
                    }
                    this.$store.commit('audioState', {
                        content: this.content,
                        handleIndex: this.handleIndex,
                        audio_exist: true
                    })
                }
            }).catch((err) => console.log(err))
        }
    }
}
</script>