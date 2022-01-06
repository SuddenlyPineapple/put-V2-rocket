<template>
  <Plotly :data="chartData" :layout="layout" :display-mode-bar="false"></Plotly>
</template>

<script>
import { Plotly } from "vue-plotly";

export default {
  name: "IndexChart",
  props: {
    name: {
      type: String,
      required: true,
    },
    yLabel: {
      type: String,
      required: false,
      default: "Y Axis",
    },
    xLabel: {
      type: String,
      required: false,
      default: "X Axis",
    },
    xData: {
      type: Array,
      required: true,
      default: () => [],
    },
    yData: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  components: {
    Plotly,
  },
  computed: {
    chartData: function () {
      return [
        {
          x: this.yData,
          y: this.xData,
          type: "scatter",
        },
      ];
    },
    layout: function () {
      return {
        title: {
          text: this.name,
        },
        xaxis: {
          title: {
            text: this.yLabel,
          },
        },
        yaxis: {
          title: {
            text: this.xLabel,
          },
        },
      };
    },
  },
};
</script>
