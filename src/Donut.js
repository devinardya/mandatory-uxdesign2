import React from 'react';
import Chart from 'react-apexcharts'

class Donut extends  React.PureComponent{

    constructor(props) {
        super(props);

        this.state = {
            options: {

                // https://apexcharts.com/docs/options/chart/animations/
                chart: {
                    width: 630,
                    type:"donut",
                    animations: {
                        enabled: true,
                        easing: 'easein',
                        speed: 500,
                        animateGradually: {
                            enabled: true,
                            delay: 200
                        },
                        dynamicAnimation: {
                            enabled: false,
                            speed: 350
                        }
                    }
                },

                // https://github.com/apexcharts/apexcharts.js/issues/827
                stroke: {
                    width: 5                        // space between each slice
                },

                // https://apexcharts.com/docs/legend/
                // https://apexcharts.com/docs/options/legend/
                legend: {
                    show:false,
                    position: 'bottom',
                    // horizontalAlign: 'right',
                    onItemClick: {
                        toggleDataSeries: true
                    },
                    onItemHover: {
                        highlightDataSeries: true
                    },
                },

                labels: ['Incorrect', 'Correct'],   // labels
                colors: ['#dddddd', '#D56F85'],     // colors

                // https://apexcharts.com/docs/options/datalabels/
                dataLabels: {
                    enabled: false,
                    formatter: function (val) {
                        return val + "%"
                    },
                    style: {
                       colors: ['#000000', '#dddddd']
                    }
                },

   

                plotOptions: {
                    pie: {
                        expandOnClick: false,       // does not work
                        donut: {
                            size: '80%',            // inner radius of the donut
                            labels: {
                                show: false,         // inner label (value in the middle of the donut chart)
                            }
                        }
                    }
                },

                // https://apexcharts.com/docs/options/states/
                states: {
                    hover: {
                        filter: {
                            type: 'none',
                            value: 0.01,
                        }
                    }
                },
                tooltip: {
                    enabled: false,
                    fillSeriesColor: false,
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 200
                      },
                      legend: {
                        show: false
                      }
                    }
                  }],


            },
        
            // Data
            series: [this.props.incorrectAnswers$, this.props.correctAnswers$],

        }

    }

    render() {

        return (
            <div className="donut">
                <Chart options={this.state.options} series={this.props.playedGames$ === 0 ? [1,0] : this.state.series} type="donut" />
            </div>
        );
    }
}

export default Donut;