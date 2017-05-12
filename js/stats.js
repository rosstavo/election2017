/**
 * File main.js.
 */

( function( $ ) {

    $( document ).ready( function() {

        var noJS = $('#no-js'),
            total = $('#total'),
            stats = $('#stats'),
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
         * Handy shorthand function to add commas to numbers (http://stackoverflow.com/a/1990590)
         */
        $.fn.digits = function(){
            return this.each(function(){
                $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
            })
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
            total.html( data.total ).digits();
            survived.html( percentage( data.finished, data.total ) + '%' );
            died.html( percentage( data.total - data.finished, data.total ) + '%' );
            updated.html( data.updated );

            /**
             * Chart.js functions
             */
            Chart.defaults.global.defaultFontFamily = "'cardea', serif";
            Chart.defaults.global.defaultFontSize = 16;
            Chart.defaults.global.defaultFontColor = 'black';
            Chart.defaults.global.title.fontFamily = "'proxima-nova-alt-condensed', sans-serif";
            Chart.defaults.global.legend.position = 'bottom';
            Chart.defaults.global.legend.labels.boxWidth = 20;
            Chart.defaults.global.tooltips.mode = 'label';
            Chart.defaults.global.tooltips.cornerRadius = 0;

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
                        tooltips: {
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
                        tooltips: {
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
                                    "#f1c40f",
                                    "#ecf0f1"
                                ]
                            }
                        ]
                    },
                    options: {
                        tooltips: {
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
                                    "#ecf0f1"
                                ]
                            }
                        ]
                    },
                    options: {
                        tooltips: {
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    return data['datasets'][0]['data'][tooltipItem['index']] + '%';
                                }
                            }
                        }
                    }
                } );
        } ).error( function() {
            stats.html( '<p>Statistics currently unavailable.</p><a href="index.html">&larr; Go back</a>' );
        } );
    } );

} )( jQuery );
