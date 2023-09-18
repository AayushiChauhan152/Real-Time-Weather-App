const temp = document.querySelector(".weather1");
const city = document.querySelector(".weather2 p");
const date = document.querySelector(".weather2 span");
const emoji = document.querySelector(".weather3 img");
const weather = document.querySelector(".weather3 span");
const search = document.querySelector(".search");
const form = document.querySelector("form");

let target = "delhi";

const fetchData = async (target) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=8933f2ebcb4b4ec68a5172133232508&q=${target}`;
    const response = await fetch(url);
    const data = await response.json();
    //destructuring the data
    const {
      current: {
        temp_c,
        condition: { text, icon },
      },
      location: { name, localtime },
    } = data;
    updateData(temp_c, name, localtime, icon, text);
  } catch (err) {
    alert("Location is not found");
  }
};

function updateData(t, c, time, e, text) {
  temp.innerText = `${t}°C`;
  city.innerText = c;
  emoji.src = e;
  weather.innerText = text;

  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];
  const exactDay = new Date(exactDate).getDay();
  const day = getNmae(exactDay);
  date.innerText = `${exactTime} - ${day} ${exactDate}`;
}
fetchData(target);

function getNmae(num) {
  switch (num) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  target = search.value;
  fetchData(target);
});
