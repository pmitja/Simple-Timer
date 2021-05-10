'use strict';

const secondsBox = document.querySelector('.seconds');
const minutesBox = document.querySelector('.minutes');
const hoursBox = document.querySelector('.hours');

const startBtn = document.querySelector('.btn--1');
const stopBtn = document.querySelector('.btn--2');
const restartBtn = document.querySelector('.btn--3');

const btnRealClock = document.querySelector('.clock');
const btnTimer = document.querySelector('.timer');
const btnCountdown = document.querySelector('.countdown');

const hoursField = document.querySelector('.hours');
const minutesField = document.querySelector('.minutes');
const secondsField = document.querySelector('.seconds');

const startBtnCount = document.querySelector('.btn--count1');
const stopBtnCount = document.querySelector('.btn--count2');
const restartBtnCount = document.querySelector('.btn--count3');

const underText = document.querySelector('.under-text');

let seconds = 0;
let minutes = 0;
let hours = 0;

startBtnCount.classList.add('hidden');
restartBtnCount.classList.add('hidden');
stopBtnCount.classList.add('hidden');

// My functions

const settingTime = function () {
  seconds = 0;
  minutes = 0;
  hours = 0;
  stopBtn.classList.remove('hidden');
  startBtn.classList.remove('hidden');
  restartBtn.classList.remove('hidden');
};

const displayingNumbersTimer = function () {
  const secondsString = String(seconds);
  const minutesString = String(minutes);
  const hoursString = String(hours);
  secondsBox.textContent = secondsString.padStart(2, 0);
  minutesBox.textContent = minutesString.padStart(2, 0);
  hoursBox.textContent = hoursString.padStart(2, 0);
};

const startTimer = function () {
  startBtn.addEventListener('click', function () {
    const time = setInterval(function () {
      seconds++;
      if (seconds >= 60) {
        minutes++;
        seconds = 0;
        if (minutes >= 60) {
          hours++;
          minutes = 0;
          seconds = 0;
        }
      }
      displayingNumbersTimer();

      btnCountdown.addEventListener('click', function () {
        clearInterval(time);
      });
    }, 1000);
    stopBtn.addEventListener('click', function () {
      clearInterval(time);
    });
    restartBtn.addEventListener('click', function () {
      seconds = 0;
      minutes = 0;
      hours = 0;
      displayingNumbersTimer();
    });
  });
};

btnRealClock.addEventListener('click', function () {
  underText.textContent = 'Enjoy in real time.';
  const now = new Date();
  hours = now.getHours();
  minutes = now.getMinutes();
  seconds = now.getSeconds();
  const time = setInterval(function () {
    seconds++;
    if (seconds >= 60) {
      minutes++;
      seconds = 0;
      if (minutes >= 60) {
        hours++;
        minutes = 0;
        seconds = 0;
      }
    }
    displayingNumbersTimer();
    return time;
  }, 1000);

  stopBtn.classList.add('hidden');
  startBtn.classList.add('hidden');
  restartBtn.classList.add('hidden');

  btnTimer.addEventListener('click', function () {
    underText.textContent = `This is Simple Timer, its timing your time spent here.`;
    clearInterval(time);
    settingTime();
    displayingNumbersTimer();
  });

  btnCountdown.addEventListener('click', function () {
    underText.textContent = `Click on numbers to set your time. (Hours : Minutes : Seconds)`;
    clearInterval(time);
    settingTime();
    displayingNumbersTimer();
  });
});

btnCountdown.addEventListener('click', function () {
  underText.textContent = `Click on numbers to set your time. (Hours : Minutes : Seconds)`;
  startBtnCount.classList.add('zindex');
  restartBtnCount.classList.add('zindex');
  stopBtnCount.classList.add('zindex');
  startBtnCount.classList.remove('hidden');
  restartBtnCount.classList.remove('hidden');
  stopBtnCount.classList.remove('hidden');
  let put = false;

  const time = setInterval(function () {
    seconds++;
    if (seconds >= 60) {
      minutes++;
      seconds = 0;
      if (minutes >= 60) {
        hours++;
        minutes = 0;
        seconds = 0;
      }
    }
    displayingNumbersTimer();
    console.log('1');
    return time;
  }, 1000);

  clearInterval(time);

  settingTime();
  displayingNumbersTimer();

  hoursField.addEventListener('click', function () {
    hours = Number(prompt('Please enter hours (between 0-24): '));
    console.log(hours);
    if (hours >= 0 && hours <= 24) {
      const userHour = String(hours);
      hoursField.textContent = userHour.padStart(2, 0);
    }
    put = true;
  });

  minutesField.addEventListener('click', function () {
    minutes = Number(prompt('Please enter minutes (between 0-60): '));
    if (minutes >= 0 && minutes <= 60) {
      const userMinutes = String(minutes);
      minutesField.textContent = userMinutes.padStart(2, 0);
    }
    put = true;
  });

  secondsField.addEventListener('click', function () {
    seconds = Number(prompt('Please enter seconds (between 0-60): '));
    if (seconds >= 0 && seconds <= 60) {
      const userSeconds = String(seconds);
      secondsField.textContent = userSeconds.padStart(2, 0);
    }
    put = true;
  });

  startBtnCount.addEventListener('click', function () {
    if (seconds === 0 && minutes === 0 && hours === 0) {
      alert('Click on numbers to set a time!');
    }

    if (put) {
      const time = setInterval(function () {
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          if (minutes > 0 && minutes != 59) minutes--;
          if (minutes < 0) minutes = 59;
        }
        if (minutes === 0 && seconds === 0 && hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        if (hours > 1 && minutes === 0 && seconds === 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        displayingNumbersTimer();
        if (seconds === 0 && minutes === 0 && hours === 0) {
          clearInterval(time);
        }
        stopBtnCount.addEventListener('click', function () {
          clearInterval(time);
        });
        restartBtnCount.addEventListener('click', function () {
          clearInterval(time);
          seconds = 0;
          minutes = 0;
          hours = 0;
          displayingNumbersTimer();
        });
        return time;
      }, 1000);
    }
  });

  btnTimer.addEventListener('click', function () {
    underText.textContent = `This is Simple Timer, its timing your time spent here.`;
    startBtnCount.classList.remove('zindex');
    restartBtnCount.classList.remove('zindex');
    stopBtnCount.classList.remove('zindex');
    startBtnCount.classList.add('hidden');
    restartBtnCount.classList.add('hidden');
    stopBtnCount.classList.add('hidden');
    clearInterval(time);
    settingTime();
    displayingNumbersTimer();
  });
});

//Function calls
startTimer();
