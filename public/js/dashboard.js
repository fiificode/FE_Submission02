//logout
document.getElementById('logOut').onclick = function logout(){
    localStorage.removeItem('token');
    window.location.href = './index.html';
}


//Declaring variables
const today_summary = document.getElementById("today");
const lastWeek_summary = document.getElementById("last_week");
const lastMonth_summary = document.getElementById("last_month");


const url = "https://freddy.codesubmit.io/dashboard";
const refreshUrl = "https://freddy.codesubmit.io/refresh";
const access_token = localStorage.getItem("token");
const refresh_token = localStorage.getItem("refresh_token");

// fetch dashboard data
fetch(url, {
    method:"GET", 
    headers: {
        "Content-type": "application/json;charset=UTF-8",
        "Authorization": "Bearer "+access_token,
    }
    }).then(response => response.json())
    .then(json => {
        console.log(json);
    

    if(json.msg) {
        checkAndRequest()
    }else{
        const weekData = json.dashboard.sales_over_time_week
        const monthsData = json.dashboard.sales_over_time_year
        const bestSellerData = json.dashboard.bestsellers

        loadDataIntoTable(bestSellerData, document.querySelector("table"))
       
       

        
        var todayTotal, todayOrders;
        var lastWeekTotal = 0;
        var lastWeekOrders = 0;
        var lastMonthTotal = 0;
        var lastMonthOrders = 0;
        for ( var i in weekData) {
            todayTotal = weekData[i].total
            todayOrders = weekData[i].orders
            break;
        }
        today_summary.innerHTML = `$${nFormatter(todayTotal)} / ${todayOrders} orders`
        
        for (var k = 1; k < Object.keys(weekData).length + 1; k++){
            lastWeekTotal += weekData[k].total
            lastWeekOrders += weekData[k].orders
        }
        lastWeek_summary.innerHTML = `$${nFormatter(lastWeekTotal)} / ${lastWeekOrders} orders`

        let lastMonth = Object.keys(monthsData)[1]
        lastMonthTotal = monthsData[lastMonth].total
        lastMonthOrders = monthsData[lastMonth].orders
        lastMonth_summary.innerHTML = `$${nFormatter(lastMonthTotal)} / ${lastMonthOrders} orders`   
    }
}).catch(err => console.log(err))

const checkAndRequest =() =>{
    fetch(refreshUrl, {
        method: "POST",
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            "Authorization": "Bearer " + refresh_token 
        }
    })  .then(response => response.json()) 
    .then(json => 
   {
     console.log(json.access_token)
    localStorage.setItem('token', json.access_token)
    window.location.href = './dashboard.html'
}
)
.catch(err => console.log(err));
}

//revenue amount formatter
function nFormatter(num) {
    if (num >= 1000000000) {
        return(num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
        return(num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return(num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
}

//populate bestseller
async function loadDataIntoTable(data, table) {
    let tableData = "";
    for (var k = 0; k < Object.keys(data).length; k++){
           tableData+=`
            <tr>
                <td class="product">${data[k].product.name}</td>
                <td>${data[k].revenue/data[k].units}</td>
                <td>${data[k].units}</td>
                <td>${nFormatter(data[k].revenue)}</td>
            </tr>
           `
        }
        document.getElementById("table_body").innerHTML = tableData
}
