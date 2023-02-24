import axios from "axios";
import  {main_url, port} from '../config'

var chart_url = main_url + ":" + port + "/api/lineChart/days";
var chart_url2 = main_url + ":" + port + "/api/lineChart/month";
let now = new Date("2022-09-01");

const axios_chart_d = async () => {
  try {
    const response = await axios.get(chart_url, {
      params: { date: now },
      withCredentials: true,
    });

    return response.data;
  } catch (err) {
    console.log("Error >>", err);
  }
};

const axios_chart_m = async () => {
  try {
    const response = await axios.get(chart_url2, {
      params: { date: now },
      withCredentials: true,
    });

    return response.data;
  } catch (err) {
    console.log("Error >>", err);
  }
};
export async function get_days() {
  var label = ["weight", "lose_kcal", "kcal_consume"];
  var data = [[], [], []];

  var r = await axios_chart_d();
  for (var i = 0; i < r.length; i++) {
    for (var j = 0; j < label.length; j++) {
      data[j][i] = r[i][label[j]];
    }
  }

  var config = {
    labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09"],

    datasets: [
      {
        fill: false,
        label: label[0],
        backgroundColor: "#00D1B2",
        borderColor: "#00D1B2",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0,
        pointBackgroundColor: "#00D1B2",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#00D1B2",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: data[0],
        tension: 0.5,
        cubicInterpolationMode: "default",
        yAxisID: 'y1',
      },
      {
        fill: false,
        label: label[1],
        backgroundColor: "#209CEE",
        borderColor: "#209CEE",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0,
        pointBackgroundColor: "#209CEE",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#209CEE",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: data[1],
        tension: 0.5,
        cubicInterpolationMode: "default",
        yAxisID: 'y2',
      },
      {
        fill: false,
        label: label[2],
        backgroundColor: "#FF3860",
        borderColor: "#FF3860",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0,
        pointBackgroundColor: "#FF3860",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#FF3860",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: data[2],
        tension: 0.5,
        cubicInterpolationMode: "default",
        yAxisID: 'y3',
      },
    ],

    options: {
      plugins: {
        legend: {
          display: true,
        },
      },
    },
  };
  return config
}



export async function get_months() {
  var label = ["avgWeightMonth", "avgKcalMonth", "avgConsumeMonth"];
  var data = [[], [], []];

  var r = await axios_chart_m();


  for (var i = 0; i < label.length; i++) {
    for (var j = 0; j < Object.keys(r[label[i]]).length; j++) {
      data[i][j] = r[label[i]][j+1];
    }
  }
  var config = {
    labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09"],

    datasets: [
      {
        fill: false,
        label: label[0],
        backgroundColor: "#00D1B2",
        borderColor: "#00D1B2",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0,
        pointBackgroundColor: "#00D1B2",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#00D1B2",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: data[0],
        tension: 0.5,
        cubicInterpolationMode: "default",
        yAxisID: 'y1',
      },
      {
        fill: false,
        label: label[1],
        backgroundColor: "#209CEE",
        borderColor: "#209CEE",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0,
        pointBackgroundColor: "#209CEE",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#209CEE",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: data[1],
        tension: 0.5,
        cubicInterpolationMode: "default",
        yAxisID: 'y2',
      },
      {
        fill: false,
        label: label[2],
        backgroundColor: "#FF3860",
        borderColor: "#FF3860",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0,
        pointBackgroundColor: "#FF3860",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#FF3860",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: data[2],
        tension: 0.5,
        cubicInterpolationMode: "default",
        yAxisID: 'y3',
      },
    ],

    options: {
      plugins: {
        legend: {
          display: true,
        },
      },
    },
  };
  return config
}

