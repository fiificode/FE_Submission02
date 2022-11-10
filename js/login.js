
async function isLoggedIn () {
    const token = localStorage.getItem('token');
    console.log(token);
    if(token === null) {
        console.log('login');
    }else{
        window.location.href = './pages/dashboard.html';
    }
}
isLoggedIn()

// Declaring of variables
const loginForm = document.getElementById("login-form");
const loginBtn = document.getElementById("login-btn");

// Click event on loging Button
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    const login_url = "https://freddy.codesubmit.io/login";

    if(username === '' || password === '') {
        alert('Enter username or password');
    }else{
        fetch(login_url, {
            method:"POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        }).then(function(response) {
            if(response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        }).then(function(data) {
            console.log(data.access_token);

            localStorage.setItem('token', data.access_token)
            localStorage.setItem('refresh_token', data.refresh_token)
            window.location.href('./pages/dashboard.html');
        }).catch(function(error){
            // alert('Wrong credentials')
            location.reload();
        });
    }
})