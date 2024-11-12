if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(res => console.log('serviceWorker cargado correctamente', res))
        .catch(err => console.log('serviceWorker no se pudo registrar', err));
} else {
    console.log('no se localiza');
}