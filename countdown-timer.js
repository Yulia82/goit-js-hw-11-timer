const refs = {
    day: document.querySelector('[data-value="days"]'),
    hour: document.querySelector('[data-value="hours"]'),
    minute: document.querySelector('[data-value="mins"]'),
    sec: document.querySelector('[data-value="secs"]'),
};

function timerFace({ days, hours, mins, secs }) {
    refs.day.textContent = `${days}`;
    refs.hour.textContent = `${hours}`;
    refs.minute.textContent = `${mins}`;
    refs.sec.textContent = `${secs}`;

 };


class CountdownTimer {
    constructor({onTick, targetDate}) {
        this.onTick = onTick;
        this.targetDate = targetDate;
        this.timerId = null;
    }

    start() {
        this.timerId = setInterval(() => {
            const currentDate = Date.now();
            const time = this.targetDate - currentDate;
            if (time <= 0) {
                clearInterval(this.timerId);
                return;
            };
            const timeComponent = this.getTimeComponent(time);
            this.onTick(timeComponent);
        },
            1000)
    }

    getTimeComponent(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        return {days, hours, mins, secs};
    }        

    pad(value) {
        return String(value).padStart(2, "0");
    }
};

const countdownTimer = new CountdownTimer({
  onTick: timerFace,
  targetDate: new Date('Oct 28, 2021'),
});
// console.log(countdownTimer);

countdownTimer.start();

// const countdownTimer1 = new CountdownTimer({
//   onTick: timerFace,
//   targetDate: new Date('May 28, 2022'),
// });

// countdownTimer1.start();

// const countdownTimer2 = new CountdownTimer({
//   onTick: timerFace,
//   targetDate: new Date(2021, 4, 21, 12),
// });

// countdownTimer2.start();
