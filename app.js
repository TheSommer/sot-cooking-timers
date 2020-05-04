var timer = new Vue({
  el: '#timer',
  data: {
    timerActive: false,
    paused: true,
    timeLeft: -1,
    timestampEnd: -1,
    intervalUpdater: undefined,
    displayTimeLeft: -1
  },
  methods: {
    startTimer: function (seconds){
      if(this.intervalUpdater != undefined){
        this.removeTimer();
        console.log("Cleared timer to make room for new one");
      }

      this.timestampEnd = Math.floor(new Date().getTime() / 1000) + seconds;
      this.paused = false;
      this.timerActive = true;
      this.displayTimeLeft = seconds;

      this.intervalUpdater = setInterval(function(){
        timer.updateDisplayTimeLeft();
        console.log("interval running");
      }, 200);

      console.log("Started a " + ( this.timestampEnd - (new Date().getTime() / 1000) ) + " second timer");
    },
    removeTimer: function(){
      this.timerActive = false;
      this.paused = true;
      this.timeLeft = -1;
      this.timestampEnd = -1;
      this.displayTimeLeft = -1
      clearInterval(this.intervalUpdater);
      this.intervalUpdater = undefined;
      console.log("attempted to clear intervalUpdater: ", this.intervalUpdater);
    },
    updateDisplayTimeLeft: function(){
      if(this.paused){
        this.displayTimeLeft = this.timeLeft;
      }
      else{
        this.displayTimeLeft = Math.round(this.timestampEnd - (new Date().getTime() / 1000));
      }
    },
    pause: function(){
      this.paused = true;
      this.timeLeft = Math.ceil(this.timestampEnd - (new Date().getTime() / 1000));

      this.timerActive = true;
      this.timestampEnd = -1;

      clearInterval(this.intervalUpdater);
      this.intervalUpdater = undefined;
      console.log("attempted to clear intervalUpdater: ", this.intervalUpdater);

      console.log("Paused timer");
    },
    unpause: function(){
      this.startTimer(this.timeLeft)
      this.timeLeft = -1;
      this.paused = false;
      console.log("Unpaused timer");
    }
  }
})
