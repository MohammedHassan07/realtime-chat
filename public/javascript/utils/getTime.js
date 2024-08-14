// function to get the time
function getTime(date = new Date()) {

    const dateTime = new Date(date)
    let hours = dateTime.getHours()
    const ampm = hours >= 12 ? 'PM' : 'AM'

    hours = hours % 12
    hours = hours ? hours : 12
    return `${hours}:${dateTime.getMinutes()} ${ampm}`
}

export default getTime