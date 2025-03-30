
async function fetchIPTVData() {
    const response = await fetch('iptv_data.json');
    return response.json();
}

document.addEventListener('DOMContentLoaded', async () => {
    const iptvData = await fetchIPTVData();
    displayCategories(iptvData);
});

function displayCategories(iptvData) {
    const categoryList = document.getElementById('categoryList');
    categoryList.innerHTML = '';
    Object.keys(iptvData).forEach(category => {
        const div = document.createElement('div');
        div.className = 'category';
        div.textContent = category;
        div.onclick = () => displayChannels(iptvData, category);
        categoryList.appendChild(div);
    });
}

function displayChannels(iptvData, category) {
    const channelList = document.getElementById('channelList');
    channelList.innerHTML = '';
    iptvData[category].forEach(channel => {
        const div = document.createElement('div');
        div.className = 'channel';
        div.textContent = channel.name;
        div.onclick = () => loadStream(channel.url);
        channelList.appendChild(div);
    });
}

function loadStream(url) {
    const videoContainer = document.getElementById('videoContainer');
    const video = document.getElementById('video');
    videoContainer.style.display = 'block';
    
    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
    } else {
        alert('Tu navegador no soporta HLS');
    }
}

function loadIPTV() {
    const url = document.getElementById('urlInput').value;
    window.location.href = window.location.pathname + "?url=" + encodeURIComponent(url);
}
