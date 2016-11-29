var ctx = document.getElementById('myChart');

var myChart = new Chart(ctx, {});



var hourWorth = 50;

var flights = [{
    price: 318,
    duration: 19,
    cheap_in_foreign: false,
    vendor_results_page: 'https://www.ca.kayak.com/flights/YYC-NYC/2017-01-20/2017-01-22/2adults/children-1L',
    flight_schedule: '<table class=\'table table-striped table-condensed\'> <caption class=\'text-center\'>Flight Schedule</caption> <thead> <tr> <th></th> <th>origin</th> <th>destination</th> </tr> </thead> <tbody> <tr> <td><strong>departure</strong></td> <td>8:05 Oct 12th, 2016</td> <td>16:55 Oct 22rd, 2016</td> </tr> <tr> <td><strong>arrival</strong></td> <td>13:05 Oct 13th, 2016</td> <td>4:00 Oct 24th, 2016</td> </tr> </tbody> </table>'
},{
    price: 420,
    duration: 7,
    cheap_in_foreign: true,
    vendor_results_page: 'http://flight.qunar.com/site/interroundtrip_compare.htm?fromCity=%E5%8D%A1%E5%B0%94%E5%8A%A0%E9%87%8C&toCity=%E5%8D%8E%E7%9B%9B%E9%A1%BF%EF%BC%88%E5%8D%8E%E7%9B%9B%E9%A1%BF%E5%93%A5%E4%BC%A6%E6%AF%94%E4%BA%9A%E7%89%B9%E5%8C%BA%EF%BC%89&fromDate=2017-01-18&toDate=2017-01-22&fromCode=YYC&toCode=WAS&from=qunarindex&lowestPrice=null&isInter=true&favoriteKey=&showTotalPr=null',
    flight_schedule: '<table class=\'table table-striped table-condensed\'> <caption class=\'text-center\'>Flight Schedule</caption> <thead> <tr> <th></th> <th>origin</th> <th>destination</th> </tr> </thead> <tbody> <tr> <td><strong>departure</strong></td> <td>17:05 Oct 13th, 2016</td> <td>6:55 Oct 23rd, 2016</td> </tr> <tr> <td><strong>arrival</strong></td> <td>3:25 Oct 13th, 2016</td> <td>14:00 Oct 24th, 2016</td> </tr> </tbody> </table>'

},{
    price: 350,
    duration: 12,
    cheap_in_foreign: false,
    vendor_results_page: 'https://www.ca.kayak.com/flights/YYC-NYC/2017-01-20/2017-01-22/2adults/children-1L',
    flight_schedule: '<table class=\'table table-striped table-condensed\'> <caption class=\'text-center\'>Flight Schedule</caption> <thead> <tr> <th></th> <th>origin</th> <th>destination</th> </tr> </thead> <tbody> <tr> <td><strong>departure</strong></td> <td>12:30 Oct 13th, 2016</td> <td>23:05 Oct 23rd, 2016</td> </tr> <tr> <td><strong>arrival</strong></td> <td>8:00 Oct 13th, 2016</td> <td>10:40 Oct 24th, 2016</td> </tr> </tbody> </table>'

}];


var combinedChart = new Chart(ctx, {
    type: 'bar',
    type2: 'price-duration',
    afterDatasetsDraw: function() {
        console.log(23432);
    },
    data: {
        labels: ['', '', ''],
        datasets: [{
            label: 'price',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            data: [
                318, 
                420, 
                350, 
            ]
        }, {
            label: 'duration',
            borderWidth: 2,
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            borderColor: 'rgba(255, 206, 86, 1)',
            data: [
                19, 
                7, 
                12, 
            ]
        }]

    },
    options: {
        title: {
            display: true,
            text: 'Cheapest 3 Flights',
            fontSize: 15
        },
        tooltips: {
            mode: 'index',
            //intersect: false
        },
        responsive: true,
        scales: {
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                display: false,
                stacked: true,
                scaleLabel: {
                    display: false,
                    labelString: 'price + duration (USD)',
                    fontColor: '#A5C78B'
                },
                gridLines: {
                    drawOnChartArea: false
                },
                //ticks: {
                //    fontColor: '#A5C78B'
                //}
            }]
        }
    }
});

$(function () {
    $('.modal', '.hour-worth-modal').modal({show: false});

    $('.flight-selection').on('click', 'button', function(event){
        resetSelectBtnsAndClosePayForm();

        var buttonIndex = $('.flight-selection button').index(event.target);

        if(flights[buttonIndex]['cheap_in_foreign'] === true) {
            $('.modal .btn').off('click');
            $('.modal .btn-default').on('click', function(){
                $('.modal').modal('hide');
                window.open(flights[buttonIndex]['vendor_results_page'], '_blank');
            });
            $('.modal .btn-primary').on('click', function(){
                $('.modal').modal('hide');
                $('form').removeClass('hidden');
                $(event.target).text('chosen').addClass('btn-success').attr('disabled', 'disabled');
            });            
            $('.modal').modal('show');
        } else {
            window.open(flights[buttonIndex]['vendor_results_page'], '_blank');
        }
    });

    $("input[type='radio']").click(function(){ 
        resetSelectBtnsAndClosePayForm();
        
        $('.radio .label').removeClass('label-primary').addClass('label-default');
        $(this).siblings('.label').addClass('label-primary');
        switch ($(this).val()) {
            case 'price':
        
                myChart.destroy();
                combinedChart.destroy();
                myChart = new Chart(ctx, {
                    type: 'bar',
                    type2: 'price',
                    data: {
                        labels: ['', '', ''],
                        datasets: [{
                            label: 'price',
                            borderColor: [
                                'rgba(75, 192, 192, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(75, 192, 192, 1)'
                            ],
                            yAxisID: 'y-axis-1'
                        },{
                            label: 'duration',
                            borderColor: [
                                'rgba(255, 206, 86, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(255, 206, 86, 1)' 
                            ],
                            yAxisID: 'y-axis-2',
                        }]
                    },
                    options: {
                        responsive: true,

                        title: {
                            display: true,
                            text: 'Cheapest 3 Flights',
                            fontSize: 15
                        },
                        scales: {
                            yAxes: [{
                                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                display: true,
                                position: 'left',
                                id: 'y-axis-1',
                                gridLines: {
                                    drawOnChartArea: false
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'price (USD)'
                                },
                            }, {
                                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                display: true,
                                position: 'right',
                                id: 'y-axis-2',
                                gridLines: {
                                    drawOnChartArea: false
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'duration (hours)'
                                },
                            }],
                        }
                    }
                });
                sortFlightsByPrice(flights);
                highlightPriceBars();
                updateChartData(flights);
                myChart.update();
             
                break;
            case 'duration':
               
                myChart.destroy();
                combinedChart.destroy();
                myChart = new Chart(ctx, {
                    type: 'bar',
                    type2: 'duration',
                    data: {
                        labels: ['', '', ''],
                        datasets: [{
                            label: 'price',
                            borderColor: [
                                'rgba(75, 192, 192, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(75, 192, 192, 1)'
                            ],
                            yAxisID: 'y-axis-1'
                        },{
                            label: 'duration',
                            borderColor: [
                                'rgba(255, 206, 86, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(255, 206, 86, 1)' 
                            ],
                            yAxisID: 'y-axis-2',
                        }]
                    },
                    options: {
                        responsive: true,

                        title: {
                            display: true,
                            text: 'Cheapest 3 Flights',
                            fontSize: 15
                        },
                        scales: {
                            yAxes: [{
                                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                display: true,
                                position: 'left',
                                id: 'y-axis-1',
                                gridLines: {
                                    drawOnChartArea: false
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'price (USD)'
                                },
                            }, {
                                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                display: true,
                                position: 'right',
                                id: 'y-axis-2',
                                gridLines: {
                                    drawOnChartArea: false
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'duration (hours)'
                                },
                            }],
                        }
                    }
                });
                sortFlightsByDuration(flights);
                highlightDurationBars();
                updateChartData(flights);
                myChart.update();
     
                break;  
            case 'price-duration':
                //hourWorth = prompt('How much would you be willing to pay to spend ONE less hour on the flight?');
                myChart.destroy();
               
                combinedChart.destroy();
                combinedChart = new Chart(ctx, {
                    type: 'bar',
                    type2: 'price-duration',
                    afterDatasetsDraw: function() {
                        console.log(23432);
                    },
                    data: {
                        labels: ['', '', ''],
                        datasets: [{
                            label: 'price',
                            backgroundColor: 'rgba(75, 192, 192, 0.5)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            data: [
                                318, 
                                420, 
                                350, 
                            ]
                        }, {
                            label: 'duration',
                            borderWidth: 2,
                            backgroundColor: 'rgba(255, 206, 86, 0.5)',
                            borderColor: 'rgba(255, 206, 86, 1)',
                            data: [
                                19, 
                                7, 
                                12, 
                            ]
                        }]

                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Cheapest 3 Flights',
                            fontSize: 15
                        },
                        tooltips: {
                            mode: 'index',
                            //intersect: false
                        },
                        responsive: true,
                        scales: {
                            xAxes: [{
                                stacked: true,
                            }],
                            yAxes: [{
                                display: false,
                                stacked: true,
                                scaleLabel: {
                                    display: false,
                                    labelString: 'price + duration (USD)',
                                    fontColor: '#A5C78B'
                                },
                                gridLines: {
                                    drawOnChartArea: false
                                },
                                //ticks: {
                                //    fontColor: '#A5C78B'
                                //}
                            }]
                        }
                    }
                });
                sortFlightsByPriceDuration(flights);
                updateCombinedChartData(flights);
                combinedChart.update();
                break;             
        }

        renderFlightSchedules(flights);  
    });

    $('form').submit(function() {
        window.location.href = 'payment.html';
        return false;
    });

    $('[data-toggle="popover"]').popover({html: true});

    sortFlightsByPriceDuration(flights);
    updateCombinedChartData(flights);
    combinedChart.update();

    renderFlightSchedules(flights);


});

function updateChartData(flights) {
    myChart.data.datasets[0].data = flights.map(function(flight){return flight.price; });
    myChart.data.datasets[1].data = flights.map(function(flight){return flight.duration; });   
}

function updateCombinedChartData(flights) {
    combinedChart.data.datasets[0].data = flights.map(function(flight){return flight.price; });
    combinedChart.data.datasets[1].data = flights.map(function(flight){return flight.duration * hourWorth; });   
}

function highlightPriceBars() {
    myChart.data.datasets[0].backgroundColor = [
                'rgba(75, 192, 192, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(75, 192, 192, 0.5)'
            ];
    myChart.data.datasets[0].borderWidth = 2;
    myChart.options.scales.yAxes[0].ticks.fontColor = 'rgba(75, 192, 192, 1)';
    myChart.options.scales.yAxes[0].scaleLabel.fontColor = 'rgba(75, 192, 192, 1)';

    
    myChart.data.datasets[1].backgroundColor = [
                'rgba(255, 206, 86, 0.1)',
                'rgba(255, 206, 86, 0.1)',
                'rgba(255, 206, 86, 0.1)'
            ];
    myChart.data.datasets[1].borderWidth = 0;
    myChart.options.scales.yAxes[1].ticks.fontColor = 'rgba(255, 206, 86, 0.1)';
    myChart.options.scales.yAxes[1].scaleLabel.fontColor = 'rgba(255, 206, 86, 0.1)';
}

function highlightDurationBars() {
    myChart.data.datasets[0].backgroundColor = [
                'rgba(75, 192, 192, 0.1)',
                'rgba(75, 192, 192, 0.1)',
                'rgba(75, 192, 192, 0.1)'
            ];
    myChart.data.datasets[0].borderWidth = 0;
    myChart.options.scales.yAxes[0].ticks.fontColor = 'rgba(75, 192, 192, 0.1)';
    myChart.options.scales.yAxes[0].scaleLabel.fontColor = 'rgba(75, 192, 192, 0.1)';

    
    myChart.data.datasets[1].backgroundColor = [
                'rgba(255, 206, 86, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(255, 206, 86, 0.5)'
            ];
    myChart.data.datasets[1].borderWidth = 2;
    myChart.options.scales.yAxes[1].ticks.fontColor = 'rgba(255, 206, 86, 1)';
    myChart.options.scales.yAxes[1].scaleLabel.fontColor = 'rgba(255, 206, 86, 1)';
}

function renderFlightSchedules(flights) {
    $('.flight-selection abbr').each(function(index) {
        $(this).attr('data-content', flights[index]['flight_schedule']);
    });
}

function sortFlightsByPrice(flights) {
    flights.sort(function(a, b) {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
        return 0;
    });
}

function sortFlightsByDuration(flights) {
    flights.sort(function(a, b) {
        if (a.duration < b.duration) return -1;
        if (a.duration > b.duration) return 1;
        return 0;
    });
}



function sortFlightsByPriceDuration(flights) {
    flights.sort(function(a, b) {
        if (a.duration * hourWorth + a.price < b.duration * hourWorth+ b.price) return -1;
        if (a.duration * hourWorth + a.price > b.duration * hourWorth+ b.price) return 1;
        return 0;
    });    
}

function resetSelectBtnsAndClosePayForm () {
    $('.flight-selection button').text('choose').removeClass('btn-success').removeAttr('disabled');
    $('form').addClass('hidden');
}

// Define a plugin to provide data labels
Chart.plugins.register({
    afterDatasetsDraw: function(chartInstance, easing) {
        // To only draw at the end of animation, check for easing === 1
        var ctx = chartInstance.chart.ctx;

        console.log(chartInstance.config.type2);

        chartInstance.data.datasets.forEach(function (dataset, i) {
            var meta = chartInstance.getDatasetMeta(i);
            if (!meta.hidden) {
                meta.data.forEach(function(element, index) {
                    // Draw the text in black, with the specified font
                    

                    //ctx.fillStyle = 'rgb(0, 0, 0)';

                    var fontSize = 16;
                    var fontStyle = 'normal';
                    var fontFamily = 'Helvetica Neue';
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                    // Just naively convert to string for now
                    var dataString = dataset.data[index].toString();

                    // Make sure alignment settings are correct
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';

                    var padding = 5;
                    var position = element.tooltipPosition();
                    
                    switch(chartInstance.config.type2) {
                        case 'price':
                            ctx.fillStyle = 'rgb(75, 192, 192)';
                            if (i === 0) ctx.fillText('$' + dataString, position.x, position.y - (fontSize / 2) - padding);
                            break;
                        case 'duration':
                            ctx.fillStyle = 'rgb(255, 206, 86)';
                            if (i === 1) ctx.fillText(dataString + ' hours', position.x, position.y - (fontSize / 2) - padding);
                            break;
                        case 'price-duration':
                            if (i === 0) {
                                ctx.fillStyle = 'rgb(75, 192, 192)';
                                ctx.fillText('$' + dataString, position.x, position.y - (fontSize / 2) - padding);
                            } if (i === 1) {
                                ctx.fillStyle = 'rgb(255, 206, 86)';
                                ctx.fillText(parseInt(dataString)/hourWorth + ' hours', position.x, position.y - (fontSize / 2) - padding);
                            }  
                            //ctx.fillStyle = 'rgb(0, 0, 0)';
                            break;
                    }
                    //ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                });
            }
        });
    }
});