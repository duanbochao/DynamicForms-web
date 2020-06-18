<template>
  <div class="app-container">
    <fixed-thead :tableData="tableData" :formThead="formThead" />
  </div>
</template>

<script>
import FixedThead from './components/FixedThead'

export default {
  name: 'DynamicTable',
  components: { FixedThead},
  data() {
    return {
      tableData:[],
      formThead:[]
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.postRequest("/list").then(response => {
        this.tableData = response.data.list; //表数据
        this.formThead = response.data.showList; //表头，控制是否显示对应的列
      });
    }
  }
}
</script>

