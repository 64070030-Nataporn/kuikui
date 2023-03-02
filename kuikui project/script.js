//calendar

const calendar = document.querySelector('.calendar');
var gofindday = document.getElementsByClassName('gofindday')[0];
var todaybtn = document.getElementsByClassName('todaybtn')[0];

var today = new Date();
let activityDay;
var month = today.getMonth(); //use for index array
var year = today.getFullYear();


const months = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
]

const eventsArr = [];

// function add day each month
function getallday() {
  // adding day in calenday (last month day)
  let days = "";
  let count = 0;
  const firstday = new Date(year, month, 1);
  const lastday = new Date(year, month + 1, 0);
  const prevLastday = new Date(year, month, 0);
  console.log(prevLastday, lastday)
  const prevday = prevLastday.getDate()
  const lastdate = lastday.getDate()
  const day = firstday.getDay()
  const nextday = 7 - lastday.getDay() - 1;
  let date = document.getElementsByClassName('date')[0];
  let allday = document.getElementsByTagName('tbody')[0];

  // header month and year
  allday.innerHTML = ""
  date.innerHTML = months[month] + " " + year;
  console.log(month)

  // prev month to find day
  for (let i = day; i > 0; i--) {
    days += `<td class="day prev-date" onclick="addListner()">${prevday - i + 1}</td>`
    count++
  }

  // current month
  for (let i = 1; i <= lastdate; i++) {

    // check event if found
    let event = false;
    eventsArr.forEach((eventobj) => {
      if (eventobj.day === i && eventobj.month === month + 1 && eventobj.year === year) {
        event = true;
      }
    })

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

      activityDay = i
      getactiveday(i);
      updateevent(i);

      // if event found on today
      if (event) {
        days += `<td class="day today active event" onclick="addListner()">${i}</td>`
      } else {
        days += `<td class="day today active" onclick="addListner()">${i}</td>`
      }

    }
    // if event found on other day
    else {
      if (event) {
        days += `<td class="day event" onclick="addListner()">${i}</td>`
      } else {
        days += `<td class="day" onclick="addListner()">${i}</td>`
      }
    }

    count++
  }

  // next month to find day
  for (let i = 1; i <= nextday + 1; i++) {
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

// button to get today
function gototoday() {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  getallday();
}

// button to go day i choose
function godayselect(numberinx) {
  let dateval = document.getElementsByClassName('input-date')[numberinx].value;
  const valdate = dateval.split("-");
  today = valdate[2] * 1; //get index from split
  month = valdate[1] * 1 - 1; // use index to array
  year = valdate[0] * 1;
  getallday();
}

// modal
// Function to open the modal
function addeventfav() {

  // Add is-active class on the modal
  document.getElementById("modal").classList.add("is-active");

}

// Function to close the modal
function closeModal() {
  document.getElementById("modal").classList.remove("is-active");
}

// add event in modal
const addeventpop = document.getElementsByClassName('add-event')[0];

//function to add active on day to know what day i select
function addListner() {
  // loop day in calendar
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      //get day each element
      activeDay = Number(e.target.innerHTML);

      // call active day after click
      getactiveday(e.target.innerHTML)
      console.log(e.target.innerHTML)
      updateevent(Number(e.target.innerHTML))
      //remove active
      days.forEach((day) => {
        console.log(day)
        day.classList.remove("active");
      });
      //if clicked prev-date or next-date loop next or prev month
      if (e.target.classList.contains("prev-date")) {
        prevdaymonth();
        //add active to clicked day afte month is change
        setTimeout(() => {
          //add active on day
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerText
            ) {
              day.classList.add("active");
            }
          });
        }, 1000);
      } else if (e.target.classList.contains("next-date")) {
        nextdaymonth();
        //add active to clicked day afte month is changed
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 1000);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

// show event in board


function getactiveday(date) {
  let eventday = document.getElementsByClassName('event-day')[0];
  let eventdate = document.getElementsByClassName('event-date')[0];
  const day = new Date(year, month, date);
  const dayname = day.toString().split(" ")[0];
  console.log(day)
  eventday.innerText = dayname;
  console.log
  eventdate.innerText = date + " " + months[month] + " " + year
}

// function show event of day
function updateevent(date) {
  const eventbook = document.getElementsByClassName('events')[0]
  let events = "";
  eventsArr.forEach((dayevent) => {
    if (date === dayevent.day && month + 1 === dayevent.month && year === dayevent.year) {
      events += `<div class="event p-2 has-text-left">
                    <div class="describe is-flex is-align-items-center">
                        <span class="icon">
                            <i class="fas fa-circle"></i>
                        </span>
                        <p class="event-title headertext subtitle is-size-6">${dayevent.events}</p>
                    </div>
                </div>`
    }
  }
  )
  eventbook.innerHTML = events;
}

// add event by input function
function addeventtoboard() {
  let nameevent = document.getElementsByClassName('event-name')[0].value
  let addevent = false
    eventsArr.forEach((item) => {
      // if current day have event and want to add more
      if (item.day === activityDay && item.month === month + 1 && item.year === year) {
        item.events.push(nameevent);
        addevent = true
      }
      else {
        eventsArr.push({
          day: activityDay,
          month: month + 1,
          year: year,
          events: [nameevent]
        })
      }
    })
  

  // if array empty in that day
  if (!addevent) {
    console.log(activityDay)
    eventsArr.push({
      day: activityDay,
      month: month + 1,
      year: year,
      events: [nameevent]
    })
    console.log(eventsArr)
  }
  updateevent(activityDay)

}

function gologout() {
  window.location.href = 'homepage.html'
}