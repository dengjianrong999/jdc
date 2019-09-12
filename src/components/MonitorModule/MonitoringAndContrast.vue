<template>
  <div class="tables-v">
        <div class="linkto" @click='linkTo()'>数据统计表</div>
        <lefttb></lefttb> 
  </div>
</template>

<script>
import lefttb from "./lefttable";
export default {
  data() {
    return {
      fullscreenLoading: false
    };
  },

  //分页
  components: {
    lefttb,
  },
  mounted() {},
  methods: {
    linkTo() {
      let _this = this;
      layer.open({
        type: 2,
        title: "数据统计表",
        area: ["75%", "70%"],
        anim: [parseInt(6 * Math.random())],
        resize: false,
        anim: 2,
        maxmin: true,
        success: function(layero) {
          layero.find(".layui-layer-min").remove();
        },
        content: "#/fasttb/",
        maxWidth: "800",
        end: function() {}
      });
    }
  }
};
</script>
<style scoped>
.table-bordered > thead > tr > th,
.table-bordered > tbody > tr > th,
.table-bordered > tfoot > tr > th,
.table-bordered > thead > tr > td,
.table-bordered > tbody > tr > td,
.table-bordered > tfoot > tr > td {
  box-sizing: border-box;
}
.tables-v {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 6px 10px;
}
.tables {
  float: left;
  width: 50%;
  padding-bottom: 10px;

  margin-top: 10px;
  box-sizing: border-box;
}
.tables:nth-child(1) {
  border-right: none;
}
.tables table {
  width: 100%;
}
table thead {
  background-color: #dfe9ec;
}
.table-title {
  height: 32px;
  width: 100%;
  line-height: 32px;
  text-align: left;
  border: 1px solid #dbdbdb;
  padding-left: 5px;
  font-size: 16px;
  font-weight: 700;
  background-color: #97d0ea;
}
.tables .table-one,
.tables .table-two {
  padding-top: 10px;
  height: 500px;
  overflow-y: scroll;
}
@media screen and (width: 1920px) {
  .tables .table-one,
  .tables .table-two {
    height: 800px;
  }
}
.linkto {
	height: 32px;
	line-height: 32px;
  width: 200px;
  border: 1px solid #dddddd;
}
.linkto:active,
.linkto:hover {
  background-color: #029ad1;
  color: #fff;
}
</style>
