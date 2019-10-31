import React, { Component, Fragment } from "react";
import ReactEcharts from "echarts-for-react";
import { graphql } from "react-apollo";
import gql from "../../../node_modules/graphql-tag";

const query = gql`
  query userDrops($limit: Int) {
    userDrops(limit: $limit) {
      cashBack
      date
      name
    }
  }
`;

// Components

class UserChart extends Component {
  componentDidMount() {}

  InitChart() {
    const limit = this.props.data.variables.limit;
    const chartType = this.props.type;
    let lookback = null;

    let cashDrops = [];
    let dates = [];
    const data = this.props.data.userDrops;

    data.map(drops => {
      cashDrops.push(drops.cashBack);
      dates.push(drops.date);
    });

    return {
      title: {
        text: `${chartType} Last ${limit} Days`,
        x: "center"
      },
      tooltip: {
        trigger: "axis"
      },

      toolbox: {
        show: true
      },
      calculable: true,
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: dates
        }
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            formatter: "{value} $"
          }
        }
      ],
      series: [
        {
          name: "Drop",
          type: "line",
          data: cashDrops,
          markPoint: {
            data: [
              { type: "max", name: "Best Day" },
              { type: "min", name: "Worst Day" }
            ]
          },
          markLine: {
            data: [{ type: "average", name: "avarage $" }]
          }
        }
      ]
    };
  }

  render() {
    return (
      <Fragment>
        {this.props.data.loading ? null : (
          <ReactEcharts
            style={{ height: "90%", minHeight: "350px" }}
            theme={"captainTheme"}
            option={this.InitChart()}
          />
        )}
      </Fragment>
    );
  }
}

// Chart Options

const chartOptions = {
  series: [
    {
      name: "Reference Page",
      type: "pie",
      radius: "55%",
      data: [
        { value: 400, name: "Searching Engine" },
        { value: 335, name: "Direct" },
        { value: 310, name: "Email" },
        { value: 274, name: "Alliance Advertisement" },
        { value: 235, name: "Video Advertisement" }
      ]
    }
  ]
};

export default graphql(query, {
  options: ({ limit }) => {
    return {
      variables: { limit: limit },
      options: { fetchPolicy: "network-only" }
    };
  }
})(UserChart);
