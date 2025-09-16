document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker registrado con éxito:', registration);
                })
                .catch(error => {
                    console.error('Fallo el registro del Service Worker:', error);
                });
        });
    }

    const form = document.getElementById('report-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmission();
    });
});

function handleFormSubmission() {
    const reportero = document.getElementById('reportero').value;
    const fecha = document.getElementById('fecha').value; // Ahora solo toma la fecha del formulario
    const ubicacion = document.getElementById('ubicacion').value;
    const tipo = document.getElementById('tipo').value;
    const contenido = document.getElementById('contenido').value;

    const reportData = {
        reportero: reportero,
        fecha: fecha,
        ubicacion: ubicacion,
        tipo: tipo,
        contenido: contenido,
        timestamp: new Date().toISOString() // La hora se usa como un identificador único en la base de datos local, no se guardará en la hoja de cálculo
    };

    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
            action: 'submit-report',
            data: reportData
        });
        console.log('Datos enviados al Service Worker.');
        
        document.getElementById('report-form').reset();
    } else {
        console.error('El Service Worker no está disponible.');
    }
}