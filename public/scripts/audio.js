var sendAudioFlag = false
const audioSendButton = document.querySelector('#audioSend')

audioSendButton.addEventListener('click', () => {
    sendAudioFlag = !sendAudioFlag
    const constraints = { audio: true }
    navigator.mediaDevices.getUserMedia(constraints).then(mediaStream => {
        const mediaRecorder = new MediaRecorder(mediaStream)
        mediaRecorder.onstart = function(e) {
            this.chunks = []
        }
        mediaRecorder.ondataavailable = function(e) {
            this.chunks.push(e.data)
            console.log('data available')
        }
        mediaRecorder.onstop = function(e) {
            const blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' })
            socket.emit('radio', blob)
            console.log('voice stopped')
        }

        if (sendAudioFlag) {
            audioSendButton.classList.add('AudioOn')
            window.playbackInterval = setInterval(function() {
                mediaRecorder.start()
                setTimeout(function() {
                    mediaRecorder.stop()
                }, 990)
            }, 1000)
        } else {
            console.log('Clearing audio')
            audioSendButton.classList.remove('AudioOn')
            clearInterval(window.playbackInterval)
        }

    })
})

socket.on('voice', function(arrayBuffer) {
    const blob = new Blob([arrayBuffer], { 'type': 'audio/ogg; codecs=opus' })
    console.log('listening to voice')
    console.log('arrayBuffer: ', arrayBuffer)
    const audio = document.createElement('audio')
    audio.src = window.URL.createObjectURL(blob)
    audio.play()
})