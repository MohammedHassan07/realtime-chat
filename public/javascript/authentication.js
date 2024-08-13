import makeRequest from "./utils/makeRequest.js"

console.log('authentication.js')

const loginForm = document.getElementById('login-form-div')
const registerForm = document.getElementById('register-form-div')
const loginText = document.getElementById('login-text')
const registerText = document.getElementById('register-text')
const error1 = document.getElementById('error-message')
const error2 = document.getElementById('error-message-2')

loginText.addEventListener('click', () => {

    loginForm.classList.add(['active'])
    loginForm.classList.remove('hide')
    registerForm.classList.add(['hide'])
    registerForm.classList.remove('active')

})

registerText.addEventListener('click', () => {

    loginForm.classList.add('hide')
    loginForm.classList.remove('active')
    registerForm.classList.add('actice')
    registerForm.classList.remove('hide')
})

const btnLogin = document.getElementById('btn-login')
btnLogin.addEventListener('click', async (e) => {

    e.preventDefault()

    const inputs = loginForm.querySelectorAll('input')

    const values = Array.from(inputs).map(input => input.value)

    const data = {
        mobile: values[0],
        password: values[1]
    }


    // console.log(data)
    const url = '/user/login'
    const response = await makeRequest(url, data)

    console.log(response.error)

    if (response.error) {


        error1.classList.remove('hide')

        setTimeout(() => {
            error1.classList.add('hide')
        }, 2000)

        console.log(response)

        error1.innerHTML = `<p>
        ${response.message}
        </p>`

        return
    }

    error1.style.color = 'green'
    // window.history.replaceState(null, null, 'http://127.0.0.1:3000/home')
    location.href = 'http://localhost:3000/'

})

// register user
const btnRegister = document.getElementById('btn-register')
btnRegister.addEventListener('click', async (e) => {

    e.preventDefault()

    const inputs = registerForm.querySelectorAll('input')
    const values = Array.from(inputs).map(input => input.value)

    const data = {

        name: values[0],
        mobile: values[1],
        password: values[2],
    }

    // console.log(data)
    const url = '/user/register'

    console.log(data)
    const response = await makeRequest(url, data)

    error2.classList.remove('hide')

    setTimeout(() => {
        error2.classList.add('hide')
    }, 2000)

    error2.innerHTML = `<p>
    ${response.message}
    </p>`

    // console.log(response.message)
})
