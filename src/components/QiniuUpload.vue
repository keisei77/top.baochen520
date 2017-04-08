<template>
  <div class="qiniu-upload" :class="custom">
    <div class="upload-button">
      <div id="container">
        <md-button v-if="showUploadButton" class="md-fab md-primary" id="pickfiles" v-tap="{ methods: qiniu }">
          <md-icon>add</md-icon>
        </md-button>
        <md-button v-else class="md-fab transparent md-icon-button" id="pickfiles" v-tap="{ methods: qiniu }">
          <md-icon>account_circle</md-icon>
        </md-button>
      </div>
    </div>
    <md-spinner :md-size="20" md-indeterminate class="md-accent loading" v-show="loading"></md-spinner>
  </div>
</template>

<script>
import Env from '../utils/env'

export default {
  props: {
    showUploadButton: {
      type: Boolean,
      default: true
    },
    custom: {
      type: String
    }
  },
  data () {
    return {
      imgSrc: [],
      loading: false,
      uploader: null
    }
  },
  mounted () {
    this.uploader = window.Qiniu.uploader({
      runtimes: 'html5,flash,html4',    // 上传模式,依次退化
      browse_button: 'pickfiles',       // 上传选择的点选按钮，**必需**
      uptoken_url: `${Env.apiDomain}/api/token`,            // Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
      // uptoken: '<Your upload token>', // 若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
      unique_names: false, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
      save_key: false,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
      domain: 'omcfsg3lb.bkt.clouddn.com',   // bucket 域名，下载资源时用到，**必需**
      get_new_uptoken: false,  // 设置上传文件的时候是否每次都重新获取新的token
      container: 'container',           // 上传区域DOM ID，默认是browser_button的父元素，
      max_file_size: '100mb',           // 最大文件体积限制
      flash_swf_url: 'js/plupload/Moxie.swf',  // 引入flash,相对路径
      max_retries: 3,                   // 上传失败最大重试次数
      dragdrop: true,                   // 开启可拖曳上传
      drop_element: 'container',        // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
      chunk_size: '4mb',                // 分块上传时，每片的体积
      auto_start: true,                 // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
      init: {
        'FilesAdded': function (up, files) {
          window.plupload.each(files, function (file) {
            // 文件添加进队列后,处理相关的事情
          })
        },
        'BeforeUpload': function (up, file) {
          // 每个文件上传前,处理相关的事情
        },
        'UploadProgress': function (up, file) {
          // 每个文件上传时,处理相关的事情
        },
        'FileUploaded': function (up, file, info) {
          // 每个文件上传成功后,处理相关的事情
          // 其中 info 是文件上传成功后，服务端返回的json，形式如
          // {
          //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
          //    "key": "gogopher.jpg"
          //  }
          // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

          // var domain = up.getOption('domain');
          // var res = parseJSON(info);
          // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
        },
        'Error': function (up, err, errTip) {
          // 上传出错时,处理相关的事情
        },
        'UploadComplete': function () {
          // 队列文件处理完毕后,处理相关的事情
        },
        'Key': function (up, file) {
          // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
          // 该配置必须要在 unique_names: false , save_key: false 时才生效
        }
      }
    })
  },
  methods: {
    qiniu () {
      let vm = this
      this.uploader.bind('UploadProgress', function () {
        vm.loading = true
      })
      this.uploader.bind('FileUploaded', function (up, file, info) {
        vm.loading = false
        let domain = up.getOption('domain')
        let sourceLink = `${domain}/${JSON.parse(info.response).key}`
        vm.imgSrc.push(`http://${sourceLink}`)
        vm.$emit('uploaded', `http://${sourceLink}`)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .qiniu-upload {
    .upload-button {
      position: fixed;
      right: 3%;
      bottom: 2%;
    }
    .loading {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &.qiniu-register {
      position: absolute;
      top: 10%;
      left: 40%;
      .upload-button {
        position: absolute;
        right: unset;
        bottom: unset;
        .transparent {
          background: transparent;
          .md-theme-default.md-button:not([disabled]).md-fab {
            background: transparent;
          }
        }
      }
    }
  }
</style>
