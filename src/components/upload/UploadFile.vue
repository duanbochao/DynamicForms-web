<template>
  <div class="container" v-loading="loading">
    <div v-for="(item,index) in iconList" :key="index">
      <div class="el-upload--picture-card">
        <img
          v-if="item.icon==='docx'"
          src="../../assets/2.png"
          width="100%"
          @click="handleRemove(index)"
        />
        <img
          v-if="item.icon==='pdf'"
          src="../../assets/3.png"
          width="100%"
          @click="handleRemove(index)"
        />
        <img
          v-if="item.icon==='xlsx'"
          src="../../assets/1.png"
          width="100%"
          @click="handleRemove(index)"
        />
      </div>
      <div class="fileName">{{item.name}}</div>
    </div>

    <div class="el-upload--picture-card">
      <el-upload
        action="#"
        accept=".doc, .docx, .xls, .xlsx, .pdf"
        :auto-upload="false"
        multiple
        :show-file-list="false"
        :on-change="handleChange"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filePath: {
      type: [String, Object],
      default: ""
    }
  },
  data() {
    return {
      iconList: [], //存储文件信息
      fileList: [], //存储文件
      loading: false,
      formData: {
        filePath: ""
      },
      dialogVisible: false,
      isSuccess: "isSuccess"
    };
  },
  methods: {
    submit() {
      if (this.formData.filePath === "") {
        this.$message.error("请选择上传目录");
        return;
      }

      var params = new FormData();
      this.fileList.forEach(item => {
        params.append("file", item);
      });
      params.append("filePath", this.formData.filePath);
      this.loading = true;
      this.postRequest("/upload", params).then(response => {
        this.loading = false;
      });
    },
    handleChange(file, fileList) {
      var suffix = this.getFileType(file.name);
      console.log(suffix);
      const self = this;
      if (suffix === "docx") {
        self.iconList.push({ name: file.name, icon: "docx" });
        self.fileList.push(file.raw);
      }

      if (suffix === "xlsx") {
        self.iconList.push({ name: file.name, icon: "xlsx" });
        self.fileList.push(file.raw);
      }

      if (suffix === "pdf") {
        self.iconList.push({ name: file.name, icon: "pdf" });
        self.fileList.push(file.raw);
      }
    },

    handleRemove(index) {
      this.fileList.splice(index, 1);
      this.iconList.splice(index, 1);
    },

    getFileType(filePath) {
      var startIndex = filePath.lastIndexOf(".");
      if (startIndex !== -1) {
        return filePath
          .substring(startIndex + 1, filePath.length)
          .toLowerCase();
      } else return "";
    }
  }
};
</script>

<style scoped>
.el-upload--picture-card {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  cursor: pointer;
  line-height: 146px;
  vertical-align: top;
  margin: 10px;
}
.container {
  display: flex;
  flex-wrap: wrap;
  padding-left: 50px;
}

.fileName {
  font-size: 12px;
  max-width: 148px;
}
.isSuccess {
  background-color: #13ce66;
}
</style>
