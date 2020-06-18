<template>
  <div>
    <FormCreate :rule="rule" v-model="fApi" :option="options" />
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div>
        <el-input v-model="diction.key" placeholder></el-input>
        <el-input v-model="diction.value" placeholder></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inject: "",
      diction: {
        key: "",
        value: ""
      },
      dialogVisible: false,
      fApi: {},
      options: {
        onSubmit: formData => {
          alert(JSON.stringify(formData));
        }
      },
      rule: [
        {
          type: "el-button",
          emit: [
            {
              name: "click",
              inject: ["btn1"]
            }
          ],
          emitPrefix: "prefix1",
          children: ["添加"]
        },
        {
          type: "el-button",
          emit: [
            {
              name: "click",
              inject: ["btn2"]
            }
          ],
          emitPrefix: "prefix1",
          children: ["修改"]
        }
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    add() {
      this.rule.forEach(item => {
        if (item.field == this.inject) {
          item.options.push({
            value: `${this.diction.key}`,
            label: `${this.diction.value}`,
            disabled: false
          });
        }
      });
      this.dialogVisible = false;
    },
    change(inject) {
      this.dialogVisible = true;
      this.inject = inject.inject[0];
      alert(`change: ${inject.inject}`);
    },
    blur() {
      alert("blur!");
    },
    getList() {
      this.postRequest("/form").then(resp => {
        // console.log(resp.data);
        // this.rule.push(resp.data)
        this.rule = resp.data;
        console.log(resp);
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fApi.on("prefix1-click", this.change);
    });
  }
};
</script>
