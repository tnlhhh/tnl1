const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('capture');
const downloadButton = document.getElementById('download');
let currentFilter = 'none';
let stickers = [];

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        console.error('Lỗi truy cập webcam!', error);
    });

captureButton.addEventListener('click', () => {
    context.filter = currentFilter;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    stickers.forEach(sticker => {
        context.drawImage(sticker.img, sticker.x, sticker.y, 100, 100);
    });
    canvas.style.display = 'block';
    downloadButton.style.display = 'inline';
});

downloadButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'photo.png';
    link.click();
});

function applyFilter(filter) {
    currentFilter = filter;
    video.style.filter = filter;
}

function addSticker(imgElement) {
    stickers.push({ img: imgElement, x: Math.random() * 540, y: Math.random() * 380 });
}
