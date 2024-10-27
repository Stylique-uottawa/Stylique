const form = document.getElementById('form')
const firstname_input = document.getElementById('firstname-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const repeat_password_input = document.getElementById('repeat-password-input')
const errors_messages = document.getElementById('errors-messages')

form.addEventListener('submit', (e) => {
    // e.preventDefault() Prevent Submit

    let errors = []
    if (firstname_input) {
        // if we have a firstname input then we are in the signup
        errors = getSignupFormErrors(
            firstname_input.value,
            email_input.value,
            password_input.value,
            repeat_password_input.value
        )
    } else {
        // if we don't have a firstname input then we are in the login
        errors = getLoginFormErrors(email_input.value, password_input.value)
    }
    
    if (errors.length > 0) {
        e.preventDefault()
        errors_messages.innerText = errors.join(". ")
    }
})

function getSignupFormErrors(firstname, email, password, repeatPassword) {
    let errors = []
    if (firstname === '' || firstname == null) {
        errors.push('Firstname is required')
        firstname_input.parentElement.classList.add('Incorrect')
    }
    if (email === '' || email == null) {
        errors.push('Email is required')
        email_input.parentElement.classList.add('Incorrect')
    }
    if (password === '' || password == null) {
        errors.push('Password is required')
        password_input.parentElement.classList.add('Incorrect')
    }
    if (password.length < 8) {
        errors.push('Password must have 8 characters')
        password_input.parentElement.classList.add('Incorrect')
    }
    if (password !== repeatPassword) {
        errors.push('Password does not match repeat password')
        password_input.parentElement.classList.add('Incorrect')
        repeat_password_input.parentElement.classList.add('Incorrect')
    }

    return errors;
}

function getLoginFormErrors(email, password) {
    let errors = []
    if (email === '' || email == null) {
        errors.push('Email is required')
        email_input.parentElement.classList.add('Incorrect')
    }
    if (password === '' || password == null) {
        errors.push('Password is required')
        password_input.parentElement.classList.add('Incorrect')
    }

    return errors;
}

// Use the input elements directly instead of input.value
const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null)
allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('Incorrect')) {
            input.parentElement.classList.remove('Incorrect')
            errors_messages.innerText = ''
        }
    })
})
