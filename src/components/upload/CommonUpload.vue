<template>
  <div class="dialogBox">
    <el-dialog
      :show-close="false"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
      <div slot="title" class="header_box">
        <div class="header_box_top">
          <div>
            <span style="font-size:14px;font-weight: bolder;">{{msgTitle}}-普通上传</span>
            &nbsp;&nbsp;&nbsp;
            <span style="font-size:14px" v-if="scannerWays">
              扫描方式：
              <el-radio style="height:2px" v-model="radio" label="1">
                <span style="font-size:12px">单面扫描</span>
              </el-radio>
              <el-radio v-model="radio" label="2">
                <span style="font-size:12px">双面扫描</span>
              </el-radio>
            </span>
          </div>
          <span @click="closeDialog" style="cursor: pointer;">x</span>
        </div>
        <div class="header_box_select">
          <el-form :inline="true">
            <el-form-item label="上传到">
              <el-select v-model="filePath" placeholder="请选择" ref="filePath">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 选择前的样式 -->
      <div class="container_box_before" v-if="container_box_before">
        <div>
          <el-button
            type="primary"
            icon="el-icon-picture-outline"
            style="font-size:24px;width:200px"
            @click="selectModel('0')"
          >图片上传</el-button>
        </div>

        <div style="padding-top:15px">
          <el-button
            type="primary"
            icon="el-icon-document"
            style="font-size:24px;width:200px"
            @click="selectModel('1')"
          >文档上传</el-button>
        </div>
        <div style="padding-top:15px">
          <el-button type="primary" style="font-size:24px;width:200px" @click="selectModel('2')">
            <span style="font-size:23px" class="iconfont icon-saomiaoyi"></span>
            扫描上传
          </el-button>
        </div>
      </div>
      <!-- 选择后的样式 -->
      <div v-if="container_box_after">
        <div class="container_box">
          <uploadPic style="margin-top:55px" ref="uploadPic" v-if="showUploadPic" />
          <uploadFile style="margin-top:55px" ref="uploadFile" v-if="showUploadFile" />
          <scannerPic
            style="margin-top:55px;  margin-bottom: 50px"
            ref="uploadScannerPic"
            v-if="showScannerPic"
          />
        </div>
        <span scope="footer" style="text-align:left;padding:0px">
          <div class="footer_box">
            <el-row>
              <el-col :span="24">
                <div style="padding-left:68px">
                  <el-button
                    style="width:170px;height:50px;font-size:18px"
                    type="primary"
                    @click="upload"
                    icon="el-icon-upload"
                  >开始上传</el-button>
                  <el-button style="width:170px;height:50px;font-size:18px" @click="goBack()">
                    返回
                    <i class="el-icon-caret-right el-icon--right"></i>
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import uploadPic from "./UploadPic";
import uploadFile from "./UploadFile";
import scannerPic from "./ScannerPic";
import "../../static/css/iconfont.css";
export default {
  components: { uploadPic, uploadFile, scannerPic },
  props: {
    datas: {
      type: Boolean,
      default: ""
    },
    catalog: {
      type: Array,
      default: ""
    }
  },
  data() {
    return {
      scannerWays: false,
      radio: "2",
      msgTitle: "图片上传",
      dialogVisible: false,
      uploadFlag: undefined,
      //上传之前div显示
      container_box_before: true,
      container_box_after: false,
      //上传方式选择
      showUploadPic: false,
      showUploadFile: false,
      showScannerPic: false,
      options: [],
      filePath: ""
    };
  },

  created() {
    this.dialogVisible = true;
    this.options = this.catalog;
  },
  watch: {
    datas: function(new1, old) {
      if (new1 === false) {
        this.dialogVisible = true;
      }
      if (new1 === true) {
        this.dialogVisible = true;
      }
      return new1;
    }
  },
  methods: {
    selectModel(active) {
      this.uploadFlag = active;
      //图片上传
      if (active === "0") {
        this.container_box_before = false;
        this.container_box_after = true;
        this.showUploadPic = true;
        this.showUploadFile = false;
        this.showScannerPic = false;
        this.scannerWays = false;
      }
      //文档上传
      if (active === "1") {
        this.msgTitle = "文档上传";
        this.container_box_before = false;
        this.container_box_after = true;
        this.showUploadFile = true;
        this.showUploadPic = false;
        this.showScannerPic = false;
        this.scannerWays = false;
      }
      //扫描仪上传
      if (active === "2") {
        this.msgTitle = "扫描仪上传";
        this.container_box_before = false;
        this.container_box_after = true;
        this.showUploadFile = false;
        this.showUploadPic = false;
        this.showScannerPic = true;
        this.scannerWays = true;
      }
    },

    goBack() {
      this.container_box_before = true;
      this.container_box_after = false;
    },
    upload() {
      if (this.uploadFlag === "0") {
        this.$refs.uploadPic.formData.filePath = this.filePath;
        this.$refs.uploadPic.submit(); //上传图片
      }
      if (this.uploadFlag === "1") {
        this.$refs.uploadFile.formData.filePath = this.filePath;
        this.$refs.uploadFile.submit(); //上传文件
      }
      if (this.uploadFlag === "2") {
        this.$refs.uploadScannerPic.formData.filePath = this.filePath;
        this.$refs.uploadScannerPic.submit(); //上传文件
      }
    },
    closeDialog() {
      this.$emit("func", "false");
      this.dialogVisible = false;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>
<style scoped>
.container_box {
  min-height: 450px;
}
.container_box_before {
  margin-top: 50px;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.footer_box {
  position: absolute;
  bottom: 0px;
  right: 0px;
  left: 0px;
  margin-bottom: 10px;
  height: 60px;
  line-height: 60px;
  background-color: #f3f3f3;
}

.header_box {
  position: absolute;
  background-color: #f3f3f3;
  left: 0px;
  right: 0px;
  top: 0px;
}

.header_box_top {
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  border-bottom: 1px solid #fcd0d0;
}

.header_box_select {
  height: 50px;
  padding-top: 5px;
  text-align: left;
  padding-left: 5px;
}
</style>
