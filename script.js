document.addEventListener("DOMContentLoaded", () => {
   let counters = document.querySelectorAll(".counter");
   let hoursCounter = document.querySelector(".timer__hours");
   let minutesCounter = document.querySelector(".timer__minutes");
   let secondsCounter = document.querySelector(".timer__seconds");
   let millisecondsCounter = document.querySelector(".timer__milliseconds");
   let startTimerButton = document.querySelector(".start");
   let pauseTimerButton = document.querySelector(".pause");
   let resetTimerButton = document.querySelector(".reset");
   let lapsTimerButton = document.querySelector(".laps");
   let splitsContainer = document.querySelector(".splits");
   let hours, minutes, seconds, milliseconds;
   let startTime, updateTime, newTime, difference;
   let splitDifference, splitsArray = [], lapsArray = [], splitsArrayConverted = [], lapsArrayConverted = [];
   let savedTime = 0;

   // Stopwatch States
   let running = 0;
   let paused = 0;
   let expanded = 0;



   startTimerButton.addEventListener('click', () => {
      if (!running) startTimer()
   });

   pauseTimerButton.addEventListener('click', () => {
      if (running) pauseTimer()
   })

   resetTimerButton.addEventListener('click', () => {
      if (paused) resetTimer()
   });

   lapsTimerButton.addEventListener('click', () => {
      if (running) splitsLaps()
   })



   function startTimer() {
      running = 1;
      paused = 0;
      buttonsState();

      startTime = new Date().getTime();
      updateTime = setInterval(updateTimeFunc, 1);
   }

   function pauseTimer() {
      running = 0;
      paused = 1;
      buttonsState();

      savedTime = difference;
      clearInterval(updateTime);
   }

   function resetTimer() {
      running = 0;
      paused = 0;
      savedTime = 0;
      buttonsState();

   
      counterActiveStyles(minutesCounter);
      counterActiveStyles(hoursCounter);

      millisecondsCounter.innerHTML = '00';
      secondsCounter.innerHTML = '00';
      minutesCounter.innerHTML = '00';
      hoursCounter.innerHTML = '00';

      splitsArray = [];
      lapsArray = [];
      splitsArrayConverted = [];
      lapsArrayConverted = [];
      splitsContainer.innerHTML = '';
      clearInterval(updateTime);
   }

   function splitsLaps() {
      splitsArray.push(difference)

      if ((splitsArray[splitsArray.length - 2]) === undefined) {
         lapsArray.push(difference);
      } else {
         splitDifference = splitsArray[splitsArray.length - 1] - splitsArray[splitsArray.length - 2]
         lapsArray.push(splitDifference);
      }
      
      differenceConverted(splitsArray[splitsArray.length - 1]);
      splitsArrayConverted.push(`${hours}:${minutes}:${seconds}.${milliseconds}`);
      //console.log(`Split: ${splitsArrayConverted[splitsArrayConverted.length - 1]}`);

      differenceConverted(lapsArray[lapsArray.length - 1]);
      lapsArrayConverted.push(`${hours}:${minutes}:${seconds}.${milliseconds}`);
      //console.log(`Lap: ${lapsArrayConverted[lapsArrayConverted.length - 1]}`);


      let splitItem = document.createElement('div');
      splitItem.classList.add('split__item');

      let splitItemContent = `
      <div class="splits__item">
         <div class="splits__index">${splitsArrayConverted.length}</div>
         <div class="splits__main">
            <div class="splits__split">${splitsArrayConverted[splitsArrayConverted.length - 1]}</div>
            <div class="splits__lap">${lapsArrayConverted[lapsArrayConverted.length - 1]}</div>
         </div>
      </div>`;
      splitItem.innerHTML = splitItemContent;
      splitsContainer.prepend(splitItem);
      splitsContainer.scrollTo({ top: 0, behavior: 'smooth' })
   }


   function updateTimeFunc() {
      newTime = new Date().getTime();

      difference = (newTime - startTime) + savedTime;
      differenceConverted(difference);

      millisecondsCounter.innerHTML = milliseconds;
      secondsCounter.innerHTML = seconds;
      minutesCounter.innerHTML = minutes;
      hoursCounter.innerHTML = hours;

      counterActiveStyles(minutesCounter);
      counterActiveStyles(hoursCounter);
   }


   function differenceConverted(difference) {
      milliseconds = Math.floor((difference % 1000) / 10);
      milliseconds = 
      (milliseconds < 10) ? "0" + milliseconds : 
      (milliseconds);

      seconds = Math.floor((difference % (1000 * 60)) / 1000);
      seconds = (seconds < 10) ? ("0" + seconds) : (seconds);

      minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      minutes = (minutes < 10) ? ("0" + minutes) : (minutes);

      hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      hours = (hours < 10) ? ("0" + hours) : (hours);
   }


   function counterActiveStyles(counter) {
      if (counter.innerHTML !== "00") {
         counter.style.color = '#fff'
         counter.style.opacity = '1'
      } else {
         counter.style.color = ''
         counter.style.opacity = ''
      }
   }

   function buttonsState() {
      if (!running && !paused) {
         resetTimerButton.classList.add('inactive');
         resetTimerButton.classList.add('display');
         lapsTimerButton.classList.remove('display');
         startTimerButton.classList.add('display');
         pauseTimerButton.classList.remove('display');
      } else if (running && !paused) {
         resetTimerButton.classList.remove('inactive');
         resetTimerButton.classList.remove('display');
         lapsTimerButton.classList.add('display');
         startTimerButton.classList.remove('display');
         pauseTimerButton.classList.add('display');
      } else if (!running && paused) {
         resetTimerButton.classList.add('display');
         lapsTimerButton.classList.remove('display');
         startTimerButton.classList.add('display');
         pauseTimerButton.classList.remove('display');
      }
   }


})