async function makeGetRequest(url) {

    const BASE_URL = 'http://localhost:3000'
    const res = await fetch(`${BASE_URL}${url}`, {

        method: 'GET',

        headers: {
            'Content-Type': 'application/json',
        }
    })

    const response = await res.json()
    return response
}

export default makeGetRequest