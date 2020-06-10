$(document).ready(function() {


    $.ajax ({
        'url': 'http://157.230.17.132:4013/sales',
        'method': 'GET',

        'success': function(data) {

            var mesi = {};

            for (var i = 0; i < data.length; i++) {
                var dati_venditore = data[i];
                console.log(dati_venditore);

                var data_corrente = dati_venditore.date;   // leggo la data di ogni oggetto
                console.log(data_corrente);

                var fatturato_corrente = dati_venditore.amount;
                console.log(fatturato_corrente);

                var data_moment = moment(data_corrente, 'DD/MM/YYYY');

                var mese_corrente = data_moment.format('MMMM'); // trasformare il numero del mese in lettere

                if (!mesi.hasOwnProperty(mese_corrente)) {

                    mesi[mese_corrente] = fatturato_corrente;

                } else {

                    mesi[mese_corrente] += fatturato_corrente;
                }

                console.log(mesi);
            }

            // estrapolo dall'oggeto 'mesi' il mese in lettere e il relativo fatturato totale

            var mese = Object.keys(mesi);
            console.log(mese);
            var fatturato = Object.values(mesi);
            console.log(fatturato);

            // e li inserisco dentro labels e datasets

            var ctx = $('#myChart')[0].getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: mese,
                    datasets: [{
                        label: 'Fatturato Mensile',
                        data: fatturato,
                        backgroundColor: [
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(55, 15, 234, 0.8)',
                            'rgba(25, 59, 64, 0.8)',
                            'rgba(149, 19, 46, 0.8)',
                            'rgba(5, 19, 224, 0.8)',
                            'rgba(123, 19, 64, 0.8)',
                            'rgba(255, 123, 123, 0.8)',
                            'rgba(231, 21, 221, 0.8)',
                            'rgba(98, 76, 232, 0.8)',
                            'rgba(54, 198, 4, 0.8)',
                            'rgba(38, 86, 222, 0.8)',
                            'rgba(222, 71, 90, 0.8)'
                        ],
                        borderColor: [
                            '#333'
                        ],
                        borderWidth: 1
                    }]
                },
            });
        },

        'error': function () {
            console.log('Errore!');
        }

    });

});



















// END
