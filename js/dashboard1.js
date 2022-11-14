
let dashboard_api = 'https://freddy.codesubmit.io/dashboard'

const StoreDashBoard = (data) => {
    localStorage.setItem('dashboard',JSON.stringify(data.dashboard))
    
}
export const GetDash = (access_token) => {
    fetch(dashboard_api, {
        method: 'GET',
        headers: {
            'Content-type': "application/json",
            'Authorization':'Bearer ' + access_token
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            if (response.status>=400 && response.status<500){
                window.location.replace('../index.html')
            }
        })
        .then((data)=>{
            StoreDashBoard(data)
        })
        .catch((error) => {
            console.error(error)
        });

}  
//init
let access_token= localStorage.getItem('access_token');

//config //render
if (!access_token){
    window.location.replace('../index.html');
}
else{
    GetDash(access_token)
}
