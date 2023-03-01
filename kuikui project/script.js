//calendar

const calendar = document.querySelector('.calendar');
let prev = document.querySelector('.prev')
let next = document.querySelector('.next')
console.log(prev)
//let allday2 = document.getElementById('daybook');

var today = new Date();
let activityDay;
var month = today.getMonth(); //use for index array
var year = today.getFullYear();

const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
]

// function add day each month
function getallday() {
    // adding day in calenday (last month day)
    let days = "";
    let count = 0;
    const firstday = new Date(year, month, 1);
    const lastday = new Date(year, month + 1, 0);
    const prevLastday = new Date(year, month, 0);
    const prevday = prevLastday.getDate()
    const lastdate = lastday.getDate()
    const day = firstday.getDay()
    const nextday = 7 - lastday.getDay() - 1;
    let date = document.getElementsByClassName('date')[0];
    let allday = document.getElementsByTagName('tbody')[0];

    // header month and year
    allday.innerHTML = ""
    date.innerHTML = months[month] + " " + year;
    console.log(date)

    // prev month to find day
    for (let i = day; i > 0; i--) {
        days += `<td class="day prev-date">${prevday - i + 1}</td>`
        count++
    }

    // current month
    for (let i = 1; i <= lastdate; i++) {

        if (count % 7 == 0) {
            let row = document.createElement('tr')
            row.classList.add("days", "has-text-centered");
            console.log(row)
            row.innerHTML = days;
            console.log(row)
            allday.appendChild(row)
            days = "";
        }
        // if today
        if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
            days += `<td class="day today">${i}</td>`
        }

        else {
            days += `<td class="day">${i}</td>`
        }

        count++
    }

    // next month to find day
    for (let i = 1; i <= nextday+1; i++) {
        if (count % 7 == 0 || i == (nextday + 1)) {
            let row = document.createElement('tr')
            row.classList.add("days", "has-text-centered");
            console.log(row)
            row.innerHTML = days;
            console.log(row)
            allday.appendChild(row)
            days = "";
        }

        days += `<td class="day next-date">${i}</td>`
        count++
    }

    console.log(allday)

}

// prev month

function prevdaymonth() {
    month--;

    if (month < 0) {
        month = 11; // num index array months
        year--;
    }

    getallday();
}

// next month

function nextdaymonth() {
    month++;

    if (month > 11) {
        month = 0;
        year++;
    }
    getallday();
}

getallday();

// click arrow next and back

