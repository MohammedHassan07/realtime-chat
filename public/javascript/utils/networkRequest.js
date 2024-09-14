const HOST = 'localhost'
const BASE_URL = `http://${HOST}:3000`

async function makeGetRequest(url) {

    const res = await fetch(`${BASE_URL}${url}`, {

        method: 'GET',

        headers: {
            'Content-Type': 'application/json',
        }
    })

    const response = await res.json()
    return response
}

async function makeRequest(url, data) {

    const res = await fetch(`${BASE_URL}${url}`, {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    const response = await res.json()
    return response
}

export { makeGetRequest, makeRequest }