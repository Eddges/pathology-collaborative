let syncViewer = false

const syncButton = document.querySelector('.SyncPill')
const unsyncButton = document.querySelector('.UnSyncPill')

syncButton.addEventListener('click', () => {
    syncViewer = true
    syncButton.style.display = 'none'
    unsyncButton.style.display = 'flex'
})

unsyncButton.addEventListener('click', () => {
    syncViewer = false
    syncButton.style.display = 'flex'
    unsyncButton.style.display = 'none'
})

const viewer = OpenSeadragon({
    id: "openSeaDragonContainer",
    prefixUrl: "assets/openSeaDragon/images/",
    tileSources: 'assets/highRes/tissue_high.xml',
    debugMode: false
});

viewer.addHandler('animation-finish', data => {
    const center = viewer.viewport.getCenter()
    const zoom = viewer.viewport.getZoom()
    console.log('zoom: ', zoom)
    console.log('data: ', data)
    console.log('center: ', center)
    if(syncViewer) {
        socket.emit('viewerEvent', { zoom, center })
    }
})

socket.on('viewerEvent', ({ zoom, center }) => {
    viewer.viewport.panTo(center)
    viewer.viewport.zoomTo(zoom)
})