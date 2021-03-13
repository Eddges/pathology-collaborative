let syncViewer = false

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
    socket.emit('viewerEvent', { zoom, center })
})

socket.on('viewerEvent', ({ zoom, center }) => {
    viewer.viewport.panTo(center)
    viewer.viewport.zoomTo(zoom)
})