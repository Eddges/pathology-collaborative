// const socket = io()

// const audioSendButton = document.querySelector('#audioSend')

// let sendAudioFlag = false

// audioSendButton.addEventListener('click', () => {
//     sendAudioFlag = !sendAudioFlag
//     // if (sendAudioFlag) {
//         const constraints = { audio: true }
//         navigator.mediaDevices.getUserMedia(constraints).then(mediaStream => {
//             const mediaRecorder = new MediaRecorder(mediaStream)
//             mediaRecorder.onstart = function(e) {
//                 this.chunks = []
//             }
//             mediaRecorder.ondataavailable = function(e) {
//                 this.chunks.push(e.data)
//             }
//             mediaRecorder.onstop = function(e) {
//                 const blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' })
//                 socket.emit('radio', blob)
//             }
//             mediaRecorder.start()

//             setTimeout(function() {
//                 mediaRecorder.stop()
//             }, 5000)
//         })
//     // } else {

//     // }
// })

// socket.on('voice', function(arrayBuffer) {
//     const blob = new Blob([arrayBuffer], { 'type': 'audio/ogg; codecs=opus' })
//     const audio = document.createElement('audio')
//     audio.src = window.URL.createObjectURL(blob)
//     audio.play
// })
