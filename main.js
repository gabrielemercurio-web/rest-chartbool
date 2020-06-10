$(document).ready(function() {


    $.ajax ({
        'url': 'http://157.230.17.132:4013/sales',
        'method': 'GET',

        'success': function(data) {
            console.log(data);
        },

        'error': function () {
            console.log('Errore!');
        }

    });

    var ctx = $('#myChart')[0].getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2
            }]
        },
    });

});



















// END
