const url1 = "https://freddy.codesubmit.io/dashboard";
const refreshUrl1 = "https://freddy.codesubmit.io/refresh";
const access_token1 = localStorage.getItem("token");
const refresh_token1 = localStorage.getItem("refresh_token");

fetch(url1, {
    method:"GET", 
    headers: {
        "Content-type": "application/json;charset=UTF-8",
        "Authorization": "Bearer "+access_token1,
    }
    }).then(response => response.json())
    .then(json => {
        console.log(json);
        

    if(json.msg) {
        checkAndRequest()
       
    }else{
        const weekData = json.dashboard.sales_over_time_week
        const monthsData = json.dashboard.sales_over_time_year
        

        let chartArea = document.getElementById('myChart');
        let forecast_chart = null;
        let title = document.getElementById("revenue-title");
        let toggleInput = document.getElementById('checkbtn');
        let values1Arr = [];
        let values2Arr = [];
        const labels1 = ['Today', 'Yesterday', 'Day 3', 'Day 4', 'Day 5', 'Day 6',];
        const labels2 = ['This month', 'Last Month', 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7', 'Month 8', 'Month 9', 'Month 10', 'Month 11', 'Month 12'];
        const values1 = Object.values(weekData).map((value) => (values1Arr.push(Number(value.total))));
        const values2 = Object.values(monthsData).map((value) => (values2Arr.push(Number(value.total))));

     
        
        //config
        const getChart = (labels1, values1) => {
            const data = {
                labels: labels1,
                datasets: [{
                    label: 'Revenue',
                    backgroundColor: 'rgb(255 136 0)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: values1,
                }]
            };
            const config = {
                type: 'bar',
                data: data,
                options: {}
                
            };
            return config;
        }
      
        title.innerHTML = "Revenue (Last 7 days)";
        const config = getChart(labels1, values1)
        forecast_chart = new Chart(chartArea, config);
       

        toggleInput.addEventListener('click', () => {
            if (toggleInput.checked == true) {
                        title.innerHTML = "Revenue (Last 12 months)";
                        const config = getChart(labels2, values2)
                        if (forecast_chart != null) {
                            forecast_chart.destroy()
                        }
                        forecast_chart = new Chart(chartArea, config);
                    }
            else {
                title.innerHTML = "Revenue (Last 7 days)";
                const config = getChart(labels1, values1)
                if (forecast_chart != null) {
                    forecast_chart.destroy()
                    }
                    forecast_chart = new Chart(chartArea, config);
                }
        })
    }}).catch(err => console.log(err))
        

