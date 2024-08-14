function getTime() {
    
    const date = new Date()
    
    let hours = date.getHours()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    
    return `${hours}:${date.getMinutes()} ${ampm}`
}

module.exports = getTime