async function makeRequest(url, data, userToken) {

    const BASE_URL = 'http://localhost:3000'

    const res = await fetch(`${BASE_URL}${url}`, {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
            token: userToken
        },
        body: JSON.stringify(data)
    })

    const response = await res.json()
    return response
}

export default makeRequest