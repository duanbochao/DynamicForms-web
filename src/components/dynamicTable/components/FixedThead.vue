<template>
  <div class="app-container">
    <el-table :key="key" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column v-for="item in formThead" :key="item" :label="item">
        <template slot-scope="scope">{{ scope.row[item] }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: ""
    },

    formThead: {
      type: Array,
      default: ""
    }
  },
  data() {
    return {
      key: 1, // table key
    };
  }
};
</script>

