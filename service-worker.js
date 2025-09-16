// La URL de tu Google Apps Script
const API_URL = 'https://script.google.com/macros/s/AKfycbxWnMRTDscHfOUFATJQ04l04yWNgYKFMTaRtE14BWxXGkQ9a-hzRDlPdsTGP444Gx-sgA/exec';

// Nombre de la base de datos IndexedDB
const DB_NAME = 'reportes-db';
const DB_STORE_NAME = 'reportes';

// Función para abrir o crear la base de datos
function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onerror = event => reject(event.target.errorCode);
        request.onupgradeneeded = event => {
            const db = event.target.result;
            db.createObjectStore(DB_STORE_NAME, { keyPath: 'timestamp' });
        };
        request.onsuccess = event => resolve(event.target.result);
    });
}

// Función para guardar un reporte en IndexedDB
async function saveReportLocally(report) {
    const db = await openDatabase();
    const tx = db.transaction(DB_STORE_NAME, 'readwrite');
    const store = tx.objectStore(DB_STORE_NAME);
    store.add(report);
    return tx.complete;
}

// Función para obtener todos los reportes guardados
async function getSavedReports() {
    const db = await openDatabase();
    const tx = db.transaction(DB_STORE_NAME, 'readonly');
    const store = tx.objectStore(DB_STORE_NAME);
    return store.getAll();
}

// Función para eliminar un reporte
async function deleteReport(timestamp) {
    const db = await openDatabase();
    const tx = db.transaction(DB_STORE_NAME, 'readwrite');
    const store = tx.objectStore(DB_STORE_NAME);
    store.delete(timestamp);
    return tx.complete;
}

// Función para enviar un reporte a Google Sheets usando FormData
async function sendReport(report) {
    const formData = new URLSearchParams();
    for (const key in report) {
        formData.append(key, report[key]);
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        console.log('Reporte enviado con éxito:', report);
        await deleteReport(report.timestamp);
        return true;
    } catch (error) {
        console.log('Fallo al enviar el reporte. Se mantendrá guardado.', error);
        return false;
    }
}

// ----------------- Escuchadores de eventos -----------------

// Evento que se activa cuando hay un mensaje de la página
self.addEventListener('message', event => {
    if (event.data.action === 'submit-report') {
        const reportData = event.data.data;
        
        if (navigator.onLine) {
            console.log('Conexión detectada. Intentando enviar el reporte...');
            sendReport(reportData);
        } else {
            console.log('Sin conexión. Guardando reporte localmente.');
            saveReportLocally(reportData);
            self.registration.sync.register('sync-reports');
        }
    }
});

// Se activa cuando regresa la conexión
self.addEventListener('sync', event => {
    if (event.tag === 'sync-reports') {
        console.log('Sincronizando reportes guardados...');
        event.waitUntil(
            getSavedReports().then(reports => {
                const sendPromises = reports.map(report => sendReport(report));
                return Promise.all(sendPromises);
            })
        );
    }
});

// Eventos de instalación y activación
self.addEventListener('install', event => { console.log('Service Worker instalado.'); });
self.addEventListener('activate', event => { console.log('Service Worker activado.'); });