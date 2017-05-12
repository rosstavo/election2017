/**
 * File main.js.
 */

( function( $ ) {

    $( document ).ready( function() {

        var noJS = $('#no-js'),
            total = $('#total'),
            survived = $('#survived'),
            died = $('#died'),
            startPartyChart = $('#start-party-chart'),
            endPartyChart = $('#end-party-chart'),
            defectedPartyChart = $('#defected-party-chart'),
            rudeChart = $('#rude-chart'),
            updated = $('#updated');

        /**
         * Handy shorthand percentage function
         */
        function percentage( num1, num2 ) {
            return Math.round( ( num1 / num2 ) * 1000 ) / 10;
        }

        /**
         * Hide #no-js box
         */
        noJS.hide();

        /**
         * Get stats, do stuff with them
         */
        $.getJSON( "app/stats.json", function( data ) {

            /**
             * Convert a bunch of data to percentages
             */
            var defections = {
                Yes: percentage( data.defected, data.finished ),
                No: percentage( data.finished - data.defected, data.finished )
            };

            var rudeNames = {
                "Rude name": percentage( data.rude, data.total ),
                "Clean name": percentage( data.total - data.rude, data.total )
            }

            $.each( data.start_party, function( i, val ) {
                data.start_party[i] = percentage( val, data.total );
            } );

            $.each( data.end_party, function( i, val ) {
                data.end_party[i] = percentage( val, data.total );
            } );

            /**
             * Let's add some of the basic data at the top
             */
            total.html( data.total );
            survived.html( percentage( data.finished, data.total ) + '%' );
            died.html( percentage( data.total - data.finished, data.total ) + '%' );
            updated.html( data.updated );

            /**
             * Chart.js functions
             */
            Chart.defaults.global.defaultFontFamily = "'cardea', serif";
            Chart.defaults.global.defaultFontSize = 16;
            Chart.defaults.global.title.fontFamily = "'proxima-nova-alt-condensed', sans-serif";
            Chart.defaults.global.title.fontSize = 22;

            var startPartyChartObj = new Chart( startPartyChart, {
                    type: 'doughnut',
                    data: {
                        labels: Object.keys( data.start_party ),
                        datasets: [
                            {
                                data: Object.values( data.start_party ),
                                backgroundColor: [
                                    "#3498db",
                                    "#FAA61A",
                                    "#8e44ad",
                                    "#2ecc71",
                                    "#f1c40f",
                                    "#e74c3c"
                                ]
                            }
                        ]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'People started as:'
                        },
                        legend: {
                            position: 'bottom'
                        },
                        tooltips: {
                            mode: 'label',
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    return data['datasets'][0]['data'][tooltipItem['index']] + '%';
                                }
                            }
                        }
                    }
                } ),
                endPartyChartObj = new Chart( endPartyChart, {
                    type: 'doughnut',
                    data: {
                        labels: Object.keys( data.end_party ),
                        datasets: [
                            {
                                data: Object.values( data.end_party ),
                                backgroundColor: [
                                    "#3498db",
                                    "#e74c3c",
                                    "#FAA61A",
                                    "#2ecc71",
                                    "#f1c40f",
                                    "#8e44ad",
                                    "#34495e"
                                ]
                            }
                        ]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'People ended as:'
                        },
                        legend: {
                            position: 'bottom'
                        },
                        tooltips: {
                            mode: 'label',
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    return data['datasets'][0]['data'][tooltipItem['index']] + '%';
                                }
                            }
                        }
                    }
                } ),
                defectedPartyChartObj = new Chart( defectedPartyChart, {
                    type: 'doughnut',
                    data: {
                        labels: Object.keys( defections ),
                        datasets: [
                            {
                                data: Object.values( defections ),
                                backgroundColor: [
                                    "#e74c3c",
                                    "#3498db"
                                ]
                            }
                        ]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Did people defect?'
                        },
                        legend: {
                            position: 'bottom'
                        },
                        tooltips: {
                            mode: 'label',
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    return data['datasets'][0]['data'][tooltipItem['index']] + '%';
                                }
                            }
                        }
                    }
                } ),
                rudeChartObj = new Chart( rudeChart, {
                    type: 'doughnut',
                    data: {
                        labels: Object.keys( rudeNames ),
                        datasets: [
                            {
                                data: Object.values( rudeNames ),
                                backgroundColor: [
                                    "#e74c3c",
                                    "#ddd"
                                ]
                            }
                        ]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'How rude were people?'
                        },
                        legend: {
                            position: 'bottom'
                        },
                        tooltips: {
                            mode: 'label',
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    return data['datasets'][0]['data'][tooltipItem['index']] + '%';
                                }
                            }
                        }
                    }
                } );
        });
    } );

} )( jQuery );
