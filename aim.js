var scored = 0;
var clientHeight = 0;
var coordWidth = window.innerWidth;
var coordHeight = window.innerHeight;
var scoredMax = 0;

var timerId; // идентификатор таймера
var startTimestamp; // время старта таймера
var milliseconds = 0;
var seconds = 0;
var minutes = 0;

//cx = 30 cy = 30
//max  cx 1200 = cy = 470
console.log("width " + coordWidth);
console.log("height " + coordHeight);
var audioArr = ["assets/sound/sniper.mp3", "assets/sound/target.mp3","aseets/sound/loose.mp3"];

var flag = false;

function SC(){
  let box = document.querySelector('.scored-container');
  let width = box.offsetWidth;
  clientHeight = box.offsetHeight;
  console.log('высота ',clientHeight);
}

function fire(event) {
  SC();
  if(event.target.id === "circle"){  
    playRandomAudio();
    scored+=1;
    console.log("SCORED: " + scored);
    console.log("cx " + getRandomCoordX());
    console.log("cy " + getRandomCoordY());
  circle.setAttribute("cx", getRandomCoordX());
  circle.setAttribute("cy", getRandomCoordY());
  document.getElementById("clicks").innerHTML = scored;
  if(flag == false){
    startTimer();
    flag = true;
  }
  }else{
    flag = false;
    if(scored > scoredMax){
      scoredMax = scored;
      console.log("max scored: " + scoredMax);
      document.getElementById("maxScored").innerHTML = scoredMax;
      var elementTime =  document.getElementById("maxTime");
      elementTime.textContent = pad(minutes, 2) + ":" +  pad(seconds,2) + ":" + pad(milliseconds,3);
    } 
    
    // var audio = new Audio(audioArr[3]);
    // audio.volume = 0.3;
    // audio.play();
    
    circle.setAttribute("cx", coordWidth/2);
    circle.setAttribute("cy", coordHeight/2);
    console.log("SCORED " + scored);    
    stop();
    scored = 0;
    
    
  }

//
  function startTimer() {
    startTimestamp = Date.now(); // сохраняем текущее время в миллисекундах
    timerId = setInterval(updateTimer, 10); // вызываем функцию updateTimer каждые 10 миллисекунд
  }
  
  function updateTimer() {
    var currentTime = Date.now() - startTimestamp; // текущее время с момента старта в миллисекундах
  
    // преобразуем время в формат "чч:мм:сс.мсс"
    minutes = Math.floor(currentTime / 60000);
    seconds = Math.floor((currentTime % 60000) / 1000);
    milliseconds = currentTime % 1000;
    var timerElement = document.getElementById("timer");
    timerElement.textContent = pad(minutes, 2) + ":" + pad(seconds, 2) + ":" + pad(milliseconds, 3);
  }
  
  function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s; // добавляем ведущие нули, если нужно
    return s;
  }
  
  function stop() {
    clearInterval(timerId); // остановка таймера
  }
  
  function reset() {
    var timerElement = document.getElementById("timer");
    timerElement.textContent = "00:00:00.000"; // сброс значения таймера
    clearInterval(timerId); // остановка таймера
  }
//


  function playRandomAudio(){
    var random =  Math.floor(Math.random()*2);
    var audio = new Audio(audioArr[random]);
    audio.volume = 0.1;
    audio.currentTime = 0;
    audio.play();
  }
  

  function getRandomCoordX(coordWidth){
    return  Math.floor(Math.random() * (this.coordWidth - 30 + 1) + 30);
  }

  function getRandomCoordY(coordHeight){
    return  Math.floor(Math.random() * ((this.coordHeight - clientHeight*2) - 30 + 1) + 30);
  }
  console.log(getRandomCoordX(coordWidth));
  console.log(getRandomCoordY(coordHeight));
}
