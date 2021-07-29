function downloadFile () {
fetch('/FrevosQRScanner.apk')
.then(response => {
    response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = 'FrevosQRScanner.apk';
        a.click();
    });
})
}