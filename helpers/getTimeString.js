const getTimeString = string => {
    const timeSplit = string.split(' ')[4].split(':')
    let hours = ''
    let minutes = ''
    let meridian = ''

    if (+timeSplit[0] < 12) {
        hours = timeSplit[0]
        minutes = timeSplit[1]
        meridian = 'AM'
    } else if (+timeSplit[0] > 12) {
        hours = timeSplit[0] - 12
        minutes = timeSplit[1]
        meridian = 'PM'
    } else if (+timeSplit[0] === 12) {
        hours = 12
        minutes = timeSplit[1]
        meridian = 'PM'
    }
    return `${hours}:${minutes} ${meridian}`
}

module.exports = getTimeString