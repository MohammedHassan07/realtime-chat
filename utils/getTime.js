function getTime() {
    
    const dateTime = new Date()
    let hours = dateTime.getHours()
    const ampm = hours >= 12 ? 'PM' : 'AM'

    hours = hours % 12
    hours = hours ? hours : 12

    console.log(`time: ${hours}:${dateTime.getMinutes()} ${ampm}`)
    return `${hours}:${dateTime.getMinutes()} ${ampm}`
}

module.exports = getTime