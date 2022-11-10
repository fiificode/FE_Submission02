//logout
document.getElementById('logOut').onclick = function logout(){
    localStorage.removeItem('token');
    window.location.href = './index.html';
}
