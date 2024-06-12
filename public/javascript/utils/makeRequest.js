async function makeRequest(url, data) {

    const BASE_URL = 'http://localhost:3000'

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

export default makeRequest