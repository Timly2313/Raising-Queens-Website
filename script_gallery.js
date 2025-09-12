const images = document.querySelectorAll('.gallery-grid img');
const fullViewer = document.createElement('div');
fullViewer.classList.add('full-viewer');
fullViewer.innerHTML = `<img src="" alt=""><span class="close">&times;</span>`;
document.body.appendChild(fullViewer);

const fullViewerImg = fullViewer.querySelector('img');
const closeBtn = fullViewer.querySelector('.close');

images.forEach(img => {
    img.addEventListener('click', (e) => {
        const scrollY = window.scrollY;     
        fullViewer.style.top = `${scrollY}px`;   
        fullViewerImg.src = img.src;
        fullViewer.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

closeBtn.addEventListener('click', () => {
    fullViewer.style.display = 'none';
    document.body.style.overflow = '';
});

fullViewer.addEventListener('click', (e) => {
    if(e.target === fullViewer) {
        fullViewer.style.display = 'none';
        document.body.style.overflow = '';
    }
});