$(document).ready(function() {


    $.ajax ({
        'url': 'http://157.230.17.132:4013/sales',
        'method': 'GET',

        'success': function(data) {

            var mesi = {};
            var fatturati = {};
            var fatturato_totale = 0;

            for (var i = 0; i < data.length; i++) {
                var dati_venditore = data[i];

                var data_corrente = dati_venditore.date;   // leggo la data di ogni oggetto

                var fatturato_corrente = dati_venditore.amount;
                fatturato_totale += fatturato_corrente;

                var venditore_corrente = dati_venditore.salesman;
                console.log(venditore_corrente);

                var data_moment = moment(data_corrente, 'DD/MM/YYYY');

                var mese_corrente = data_moment.format('MMMM'); // trasformare il numero del mese in lettere

                if (!mesi.hasOwnProperty(mese_corrente)) {

                    mesi[mese_corrente] = fatturato_corrente;

                } else {

                    mesi[mese_corrente] += fatturato_corrente;
                }

                console.log(mesi);

                if (!fatturati.hasOwnProperty(venditore_corrente)) {

                    fatturati[venditore_corrente] = fatturato_corrente;

                } else {

                    fatturati[venditore_corrente] += fatturato_corrente;

                }

                console.log(fatturati);
            }

            console.log(fatturato_totale);

            // estrapolo dall'oggeto 'mesi' il mese in lettere e il relativo fatturato totale
            var mese = Object.keys(mesi);
            var fatturato = Object.values(mesi);

            // e li inserisco dentro labels e datasets
            // GRAFICO A LINEA
            var ctx_1 = $('#ChartLine')[0].getContext('2d');
            var chartLine = new Chart(ctx_1, {
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



            // estrapolo dall'oggeto 'fatturati' il nome del venditore e il relativo fatturato totale
            var nome_venditore = Object.keys(fatturati);
            var fatturati_venditori = Object.values(fatturati);

            // calcolo il fatturato di ciascun venditore in %
            var fatturato_percentuale = [];

            for (var i = 0; i < fatturati_venditori.length; i++) {
                fatturato_venditore_corrente = fatturati_venditori[i]

                var fatturato_percentuale_corrente = (fatturato_venditore_corrente / fatturato_totale) * 100;

                fatturato_percentuale.push(fatturato_percentuale_corrente.toFixed(1));
            }

            // GRAFICO A TORTA
            var ctx_2 = $('#ChartPie')[0].getContext('2d');
            var chartLine = new Chart(ctx_2, {
                type: 'pie',
                data: {
                    labels: nome_venditore,
                    datasets: [{
                        label: 'Fatturato Mensile dei Venditori (%)',
                        data: fatturato_percentuale,
                        backgroundColor: [
                            'rgba(255, 159, 164, 0.8)',
                            'rgba(155, 115, 234, 0.8)',
                            'rgba(215, 59, 64, 0.8)',
                            'rgba(149, 219, 146, 0.8)',
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
