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

        // loadDataIntoTable(bestSellerData, document.querySelector("table"))
        // barWeekChart(weekData)
        // barMonthChart(monthsData)

        
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

// week barchart
// async function getBarData(){
//     const response = await fetch(url, {
//         method:"GET",             
//         headers: {
//             "Content-type": "application/json;charset=UTF-8",
//             "Authorization": "Bearer "+access_token,
//         }
//         }).then(response => response.json())
//          .then(json => {
//         console.log(json);
//         var dat = json.dashboard.sales_over_time_week
//         let weekrev = Object.keys(dat)
//         let rev = dat[weekrev]
        
//         console.log(dat[1].total)
//         console.log(weekrev)
//         console.log(rev);
//         console.log(dat);
        
    

//     })

// }
// getBarData()




// //chart for weekly
// const barWeekChart = (data) => {
//     const revenueList = []
//     var allData = []
//     const day = ["today", "yesterday", "day 3","day 4", "day 5", "day 6", "day 7"]
//     var sum = 0
//     var size = Object.keys(data).length;

//     for (var i = 1; i < size +1; i++) {
//         revenueList.push({day:day[i-1],value:data[i].total})
//         allData = [...revenueList]
//         sum +=data[i].total
//     }
//     let myWeek = allData.map((item) => ({
//         day:item.day,
//         percent: (item.value/sum*100)+1
//     }))

//     const chart = document.querySelector("#myChart");

//     const createBarItems = (rev) => {
//         let item = document.createElement("div")
//         let bar = document.createElement("span")
//         let title = document.createElement("span")

//         bar.style = `height: ${rev.percent+50}%`;
//         title.innerHTML = rev.day

//         bar.append(title)
//         item.append(bar)

//         return item;
//     }

//     myWeek.forEach((rev) => chart.append(createBarItems(rev)))
// }

// //switch statistics
// const ShowHideDiv = (checkChart) => {
//     var week = document.getElementById("myWeek")
//     var month = document.getElementById("myMonth")
//     var title = document.getElementById("statsTitle")

//     title.innerHTML = checkChart.checked ? "Revenue (last 12 months)" : "Revenue (last 7 days)"
//     week.style.display = checkChart.checked ? "none" : "flex"
//     month.style.display = checkChart.checked ? "flex" : "none"
// }


// //monthly chart
// const barMonthChart = (data) => {
//      const revenueList = []
//     var allData = []
//     const day = ["this month", "last month", "month 3","month 4", "month 5", "month 6", "month 7", "month 8", "month 9", "month 10", "month 11", "month 12"]
//     var sum = 0
//     var size = Object.keys(data).length;

//     for (var i = 1; i < size +1; i++) {
//         revenueList.push({day:day[i-1],value:data[i].total})
//         allData = [...revenueList]
//         sum +=data[i].total
//     }
//     let myWeek = allData.map((item) => ({
//         day:item.day,
//         percent: (item.value/sum*100)
//     }))

//     const chart = document.querySelector(".month-stats");

//     const createBarItems = (rev) => {
//         let item = document.createElement("div")
//         let bar = document.createElement("span")
//         let title = document.createElement("span")

//         bar.style = `height: ${rev.percent+50}%`;
//         title.innerHTML = rev.day

//         bar.append(title)
//         item.append(bar)

//         return item;
//     }

//     myWeek.forEach((rev) => chart.append(createBarItems(rev)))
// }

// //populate bestseller
// async function loadDataIntoTable(data, table) {
//     let tableData = "";
//     for (var k = 0; k < Object.keys(data).length; k++){
//            tableData+=`
//             <tr>
//                 <td class="product">${data[k].product.name}</td>
//                 <td>${data[k].revenue/data[k].units}</td>
//                 <td>${data[k].units}</td>
//                 <td>${nFormatter(data[k].revenue)}</td>
//             </tr>
//            `
//         }
//         document.getElementById("table_body").innerHTML = tableData
// }


//Init








// const weekData = json.dashboard.sales_over_time_week
// const monthsData = json.dashboard.sales_over_time_year
// const bestSellerData = json.dashboard.bestsellers
// // let sales_over_time_week = JSON.parse(localStorage.getItem('dashboard')).sales_over_time_week;
// // console.log(sales_over_time_week)
// // let sales_over_time_year = JSON.parse(localStorage.getItem('dashboard')).sales_over_time_year;
