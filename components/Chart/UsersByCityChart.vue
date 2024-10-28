<template>
    <div class="chart-container">
      <canvas ref="usersByCityChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables);
  
  export default {
    name: "UsersByCityChart",
    props: {
      userData: {
        type: Object,
        required: true
      }
    },
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        const ctx = this.$refs.usersByCityChart.getContext("2d");
        new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: Object.keys(this.userData), // City names
            datasets: [
              {
                label: "Users by City",
                data: Object.values(this.userData), // User counts
                backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#4BC0C0",
                  "#9966FF"
                ],
                hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#4BC0C0",
                  "#9966FF"
                ]
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top"
              }
            }
          }
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .chart-container {
    max-width: 400px;
    margin: 0 auto;
  }
  </style>
  