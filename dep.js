import Chart from 'chart.js/auto'

(async function() {
    const data = [
        { mois: "Jan", count: 352 },
        { mois: "Fev", count: 0 },
        { mois: "Mar", count: 0 },
        { mois: "Avr", count: 0 },
        { mois: "Mai", count: 77 },
        { mois: "Juin", count: 108 },
        { mois: "Jui", count: 604 },
        { mois: "Aout", count: 310 },
        { mois: "Sep", count: 447 },
        { mois: "Oct", count: 0 },
        { mois: "Nov", count: 0 },
        { mois: "Dec", count: 0 },
    ];

    new Chart(
        document.getElementById('dep'),
        {
            type: 'bar',
            data: {
                labels: data.map(row => row.mois),
                datasets: [
                    {
                        label: 'Dépences de Davidos',
                        data: data.map(row => row.count)
                    }
                ]
            }
        }
    );
})();
