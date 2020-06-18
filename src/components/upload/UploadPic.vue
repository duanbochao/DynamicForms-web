<template>
  <div style="text-align:left;padding-left:50px">
    <keep-alive>
      <el-upload
        action="/upload"
        multiple
        ref="upload"
        accept="image/*"
        list-type="picture-card"
        :auto-upload="false"
        :data="formData"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </keep-alive>

    <el-dialog :visible.sync="dialogVisiblePic" :append-to-body="true">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    datas: {
      type: [String, Object],
      default: ""
    }
  },
  data() {
    return {
      formData: {
        filePath: ""
      },
      fileList: [],
      dialogImageUrl: "",
      dialogVisiblePic: false
    };
  },
  methods: {
    submit() {
      if (this.formData.filePath === "") {
        this.$message.error("请选择上传目录");
        return;
      }

      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisiblePic = true;
    }
  }
};
</script>

<style scoped>
</style>
