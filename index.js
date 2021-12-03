function format24hrto12hr(currentTime) {
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return { hours, minutes, seconds, ampm };
}

function displayCurrentTime() {
  const currentTime = new Date();
  const hourEl = document.getElementById('hour');
  const minuteEl = document.getElementById('minute');
  const secondsEl = document.getElementById('seconds');
  const meridianEl = document.getElementById('ampm');

  const { hours, minutes, seconds, ampm } = format24hrto12hr(currentTime);

  hourEl.innerText = hours;
  minuteEl.innerText = minutes;
  secondsEl.innerText = seconds;
  meridianEl.innerText = ampm;
}

setInterval(displayCurrentTime, 1000);

const handleClick = () => {
  const midContainer = document.querySelector('.mid-container');
  const selectedTimeBox = document.querySelector('.selected-time-box');

  const wakeUpTime = document.querySelector('#select-wake-up-time').value;
  const lunchTime = document.querySelector('#select-lunch-time').value;
  const napTime = document.querySelector('#select-nap-time').value;

  if (selectedTimeBox) {
    selectedTimeBox.remove();
  }

  midContainer.insertAdjacentHTML(
    'afterend',
    `<div class="selected-time-box">
  <div class="selected-time-period">
    <div>Wake up time</div>
    <div class="selected-wake-up-time">${wakeUpTime}</div>
  </div>
  <div class="selected-time-period">
    <div>Lunch time</div>
    <div class="selected-lunch-time">${lunchTime}</div>
  </div>
  <div class="selected-time-period">
    <div>Nap time</div>
    <div class="selected-nap-time">${napTime}</div>
  </div>
  </div>`
  );
  setImage();
};

const setImage = () => {
  const currentTimeImage = document.querySelector('.current-time-image');
  const currentTimeTitle = document.querySelector('.current-time-title');

  const wakeUpTime = document.querySelector('.selected-wake-up-time').innerText;
  const lunchTime = document.querySelector('.selected-lunch-time').innerText;
  const napTime = document.querySelector('.selected-nap-time').innerText;

  const [wakeUpTimeStart, wakeUpMeridian, , wakeUpTimeEnd] =
    wakeUpTime.split(' ');
  const [lunchTimeStart, lunchTimeMeridian, , lunchTimeEnd] =
    lunchTime.split(' ');
  const [napTimeStart, napTimeMeridian, , napTimeEnd] = napTime.split(' ');

  const currentTime = new Date();
  const { hours, minutes, seconds, ampm } = format24hrto12hr(currentTime);

  if (
    hours >= wakeUpTimeStart &&
    hours <= wakeUpTimeEnd &&
    ampm === wakeUpMeridian
  ) {
    currentTimeImage.src = './assets/wakeup_image.svg';
    currentTimeTitle.innerText = 'GOOD MORNING';
  } else if (
    hours >= lunchTimeStart &&
    hours <= lunchTimeEnd &&
    ampm === lunchTimeMeridian
  ) {
    currentTimeImage.src = './assets/lunch_image.svg';
    currentTimeTitle.innerText = 'GOOD AFTERNOON';
  } else if (
    hours >= napTimeStart &&
    hours <= napTimeEnd &&
    ampm === napTimeMeridian
  ) {
    currentTimeImage.src = './assets/goodnight_image.svg';
    currentTimeTitle.innerText = 'GOOD NIGHT';
  } else {
    currentTimeImage.src = './assets/playful_cat.svg';
    currentTimeTitle.innerText = 'DEFAULT IMAGE';
  }
};
