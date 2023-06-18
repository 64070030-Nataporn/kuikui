<template>
  <div id="app">
    <navbar></navbar>
    <!--banner-->
    <div class="hero is-primary">
      <div class="hero-body">
        <div class="columns">
          <div class="column is-align-self-center">
            <p class="title headertext">
              Music is healing Music holds things together
            </p>
            <p class="subtitle textsmall">
              A great song should lift your heart, warm the soul and make you
              feel good.
            </p>
          </div>
          <div class="column has-text-centered">
            <img src="http://localhost:3000/uploads/Component 5.png" />
          </div>
        </div>
      </div>
    </div>

    <!--recommend book-->
    <div class="container my-5">
      <p class="has-text-centered is-size-4 m-4 quotes">
        Recommended Songs For You
      </p>
      <div class="columns has-text-centered m-4">
        <div
          v-for="item in datamusic"
          class="column is-one-fifth"
          :key="item.song_id"
        >
          <!--list song per each-->
          <div class="card">
            <div class="card-image">
              <figure class="image is-square">
                <img :src="imagePath(item.file_path)" />
              </figure>
            </div>

            <div class="card-content">
              <div class="content has-text-left">
                <p class="title is-5 headertext">
                  {{ shortHeader(item.name_song) }}
                </p>
                <p>{{ item.artist }}</p>
                <span class="icon" v-for="i in 5" :key="i">
                  <i
                    v-show="i <= Number(item.rating)"
                    class="fas fa-star has-text-warning"
                  ></i>
                  <i
                    v-show="i > Number(item.rating)"
                    class="fas fa-star has-text-black"
                  ></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--room and calendar-->
    <div class="container has-background-success-light my-5">
      <div class="columns my-4">
        <!--chatroom-->
        <div class="column has-text-centered">
          <div>
            <img
              style="width: 200px; height: 250px"
              src="http://localhost:3000/uploads/shine-gaming-headphones-on-stand.png"
            />
          </div>
          <router-link to="/musicchat" class="button is-light is-rounded">
          Chatroom
        </router-link>
        </div>
        <!--calendar-->
        <div class="column is-two-quarters">
          <div
            class="calendar is-flex-direction-column is-justify-content-space-between"
            id="calendar"
          >
            <div
              class="month is-flex is-align-items-center is-justify-content-space-between"
            >
              <i class="fa fa-angle-left prev" @click="prevdaymonth()"></i>

              <div id="datebook" class="date quotes has-text-black my-2"></div>

              <i class="fa fa-angle-right next" @click="nextdaymonth()"></i>
            </div>

            <div>
              <table class="headertext table" style="width: 98%">
                <thead>
                  <tr class="has-text-centered weekdays">
                    <th class="has-text-centered">Sun</th>
                    <th class="has-text-centered">Mon</th>
                    <th class="has-text-centered">Tue</th>
                    <th class="has-text-centered">Wed</th>
                    <th class="has-text-centered">Thu</th>
                    <th class="has-text-centered">Fri</th>
                    <th class="has-text-centered">Sat</th>
                  </tr>
                </thead>

                <tbody class="numberday" id="daybook"></tbody>
              </table>
            </div>
            <div
              class="is-flex is-justify-content-center is-align-items-center"
            >
              <input type="date" class="input input-date" style="width: 30%" />
              <button class="button" @click="godayselect(0)">Go</button>

              <button class="button m-3 todaybtn" @click="gototoday()">
                Today
              </button>
            </div>
          </div>
        </div>
        <!--event-->
        <div class="column">
          <div class="today-date has-text-centered">
            <div class="event-day quotes title"></div>
            <div class="event-date headertext subtitle is-size-5"></div>
          </div>
          <div
            v-show="eventmusic"
            v-for="ev in eventmusic"
            class="events is-flex-direction-column"
            id="eventmusic"
            :key="ev.event_id"
          >
            <ul>
              <li v-if="ev.appointment == ansdate">
                {{ ev.event_name + " " + ev.start_time + "-" + ev.end_time }}
              </li>
            </ul>
          </div>
          <div class="add-event" style="bottom: 0">
            <button
              class="button is-warning js-modal-trigger"
              data-target="modal-js-example"
              @click="putmodal('open')"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" id="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-centered">Appointment Events</p>
          <button
            id="modalclose"
            class="delete"
            aria-label="close"
            @click="putmodal('close')"
          ></button>
        </header>
        <section class="modal-card-body has-text-centered">
          <div class="columns">
            <div class="column is-2"></div>
            <div class="column is-8">
              <label class="label has-text-left">Event: </label>
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    class="input"
                    type="text"
                    placeholder="Event"
                    v-model="events"
                  />
                  <span class="icon is-left">
                    <i class="fas fa-bell"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="column is-2"></div>
          </div>
          <div class="columns">
            <div class="column is-4">
              <label class="label has-text-left">Date: </label>
              <div class="field">
                <div class="control">
                  <input
                    class="input"
                    type="date"
                    placeholder="Date"
                    v-model="dates"
                  />
                </div>
              </div>
            </div>
            <div class="column is-4">
              <label class="label has-text-left">Start: </label>
              <div class="field">
                <div class="control">
                  <input
                    class="input"
                    type="time"
                    placeholder="time"
                    v-model="start_time"
                  />
                </div>
              </div>
            </div>
            <div class="column is-4">
              <label class="label has-text-left">End: </label>
              <div class="field">
                <div class="control">
                  <input
                    class="input"
                    type="time"
                    placeholder="time"
                    v-model="end_time"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot is-justify-content-center">
          <button class="button is-success" @click="addEvents()">
            Save changes
          </button>
          <button class="button">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
import navbarsong from "../components/navbarsong.vue";

export default {
  data() {
    return {
      datamusic: [],
      today: "",
      month: 0,
      year: 0,
      findday: 0,
      events: "",
      dates: "",
      start_time: "",
      end_time: "",
      eventmusic: [],
      ansdate: "",
      user: null
    };
  },
  components: {
    navbar: navbarsong,
  },
  created() {
    (this.today = new Date()),
      (this.month = new Date().getMonth()),
      (this.year = new Date().getFullYear()),
      this.getEvents();
  },
  mounted() {
    this.getSongs(), this.getallday(), this.onAuthChange()
  },
  methods: {
    onAuthChange() {
      const token = localStorage.getItem("token");
      if (token) {
        this.getUser();
      } else {
        this.$router.push({ path: "/login" });
      }
    },
    getUser() {
      //  const token = localStorage.getItem('token')
      axios.get("/user/me").then((res) => {
        this.user = res.data;
        console.log(this.user);
      });
    },
    getSongs() {
      axios
        .get("/songpage")
        .then((response) => {
          this.datamusic = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    getallday() {
      //calendar

      const calendar = document.getElementById("calendar");
      var todaybtn = document.getElementsByClassName("todaybtn")[0];

      var today = this.today;
      let activityDay = "";
      var month = this.month; //use for index array
      var year = this.year;

      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // function add day each month

      // adding day in calenday (last month day)
      let days = "";
      let count = 0;
      const firstday = new Date(year, month, 1);
      const lastday = new Date(year, month + 1, 0);
      const prevLastday = new Date(year, month, 0);
      console.log(prevLastday, lastday);
      const prevday = prevLastday.getDate();
      const lastdate = lastday.getDate();
      const day = firstday.getDay();
      const nextday = 7 - lastday.getDay() - 1;
      let date = document.getElementsByClassName("date")[0];
      let allday = document.getElementsByTagName("tbody")[0];

      // header month and year
      allday.innerHTML = "";
      date.innerHTML = months[month] + " " + year;
      console.log(month);

      console.log(today, month, year);

      // prev month to find day
      for (let i = day; i > 0; i--) {
        days += `<td class="day prev-date">${prevday - i + 1}</td>`;

        count++;
      }
      // current month
      for (let i = 1; i <= lastdate; i++) {
        if (count % 7 == 0) {
          let row = document.createElement("tr");
          row.classList.add("days", "has-text-centered");
          console.log(row);
          row.innerHTML = days;
          console.log(row);
          allday.appendChild(row);
          days = "";
        }
        // if today
        if (
          i === new Date().getDate() &&
          year === new Date().getFullYear() &&
          month === new Date().getMonth()
        ) {
          activityDay = i;
          this.getactiveday(i);

          // if event found on today
          days += `<td class="day today active">${i}</td>`;
        }
        // if event found on other day
        else {
          if (this.findday == 1 && i == today) {
            this.getactiveday(i);
            days += `<td class="day finding">${i}</td>`;
            this.findday = 0;
          } else {
            days += `<td class="day">${i}</td>`;
          }
        }

        count++;
      }

      // next month to find day
      for (let i = 1; i <= nextday + 1; i++) {
        if (count % 7 == 0 || i == nextday + 1) {
          let row = document.createElement("tr");
          row.classList.add("days", "has-text-centered");
          row.innerHTML = days;
          allday.appendChild(row);
          days = "";
        }

        days += `<td class="day next-date">${i}</td>`;
        count++;
      }
    },
    prevdaymonth() {
      this.month -= 1;

      if (this.month < 0) {
        this.month = 11;
        this.year -= 1;
      }
      this.getallday();
    },
    nextdaymonth() {
      this.month += 1;

      if (this.month > 11) {
        this.month = 0;
        this.year += 1;
      }

      this.getallday();
    },
    gototoday() {
      this.today = new Date();
      this.month = this.today.getMonth();
      this.year = this.today.getFullYear();
      this.getallday();
    },
    godayselect(numberinx) {
      let dateval =
        document.getElementsByClassName("input-date")[numberinx].value;
      const valdate = dateval.split("-");
      this.today = valdate[2] * 1; //get index from split
      this.month = valdate[1] * 1 - 1; // use index to array
      this.year = valdate[0] * 1;
      this.findday = 1;
      let days = valdate[2] * 1;
      this.getallday();
      this.getactiveday(days);
    },
    shortHeader(name) {
      if (name.length > 14) {
        return name.substring(0, 14) + "...";
      }
      return name;
    },
    getactiveday(date) {
      let eventday = document.getElementsByClassName("event-day")[0];
      let eventdate = document.getElementsByClassName("event-date")[0];
      const day = new Date(this.year, this.month, date);
      const dayname = day.toString().split(" ")[0];
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      eventday.innerText = dayname;
      eventdate.innerText = date + " " + months[this.month] + " " + this.year;

      let ans = "";
      if (date < 10 && this.month + 1 < 10) {
        ans = this.year + "-0" + (this.month + 1) + "-0" + date;
      } else if (date < 10) {
        ans = this.year + "-" + (this.month + 1) + "-0" + date;
      } else if (this.month + 1 < 10) {
        ans = this.year + "-0" + (this.month + 1) + "-" + date;
      } else {
        ans = this.year + "-" + (this.month + 1) + "-" + date;
      }

      this.ansdate = ans;
    },
    putmodal(state) {
      const modal = document.getElementById("modal");

      if (state == "open") {
        modal.classList.add("is-active");
      } else {
        modal.classList.remove("is-active");
      }
    },
    addEvents() {
      axios
        .post("/add/event/song", {
          events: this.events,
          dates: this.dates,
          start_time: this.start_time,
          end_time: this.end_time,
          user_id: this.user.user_id
        })
        .then((res) => this.$router.push({ name: "songpage" }))
        .catch((e) => console.log(e.response));
    },
    getEvents(dates) {
      axios
        .get(`/eventssong`)
        .then((response) => {
          this.eventmusic = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.textsmall {
  font-family: "Roboto", sans-serif;
}

.headertext {
  font-family: "Prompt", sans-serif;
}

.quotes {
  font-family: "Mitr", sans-serif;
}

.calendar {
  position: relative;
  width: 100%;
  height: 100%;
  color: #878895;
  border-radius: 5px;
  background-color: white;
}

.calendar .month {
  padding: 0 50px;
  text-transform: capitalize;
}

.calendar .month .prev,
.calendar .month .next {
  cursor: pointer;
}

.calendar .month .prev:hover,
.calendar .month .next:hover {
  color: hsl(0, 0%, 29%);
}

.calendar .weekdays {
  padding: 0 20px;
  font-size: 1rem;
  text-transform: capitalize;
}

.calendar .days {
  padding: 0 20px;
  margin-bottom: 20px;
}

.calendar .days .day {
  cursor: pointer;
}

.calendar .day:not(.prev-date, .next-date):hover {
  color: #fff;
  background-color: #826b5d;
}

.calendar .days .prev-date,
.calendar .days .next-date {
  color: #878895;
}

#calendar .days .active {
  position: relative;
  border: black;
  font-size: 1.5rem;
  color: white;
  background-color: #dda15e;
}

.calendar .days .today {
  font-size: 1.5rem;
  color: #fff;
  background-color: #3f3027;
}

.calendar .days .finding {
  color: #fff;
  background-color: #e17c3d;
}

.calendar .days .event {
  position: relative;
}

.calendar .days .event::after {
  content: "";
  position: absolute;
  bottom: 10%;
  left: 50%;
  width: 75%;
  height: 5px;
  border-radius: 30px;
  transform: translateX(-50%);
  background-color: #878895;
}

.calendar .active.event::after {
  background-color: #fff;
  bottom: 20%;
}

.calendar .active.event {
  padding-bottom: 20px;
}

.events {
  width: 100%;
  height: 70%;
  overflow-x: hidden;
  overflow-y: auto;
}

.events .event {
  width: 95%;
  cursor: pointer;
}

.events .event:hover {
  background-color: lightseagreen;
}
</style>