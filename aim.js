var scored = 0;
var coordWidth = 1200;
var coordHeight = 470;
var scoredMax = 0;

var timerId; // идентификатор таймера
var startTimestamp; // время старта таймера
var milliseconds = 0;
var seconds = 0;

//cx = 30 cy = 30
//max  cx 1200 = cy = 470
console.log("width " + window.screen.width);
console.log("height " + window.screen.height);
var audioArr = ["assets/sound/sniper.mp3", "assets/sound/target.mp3","aseets/sound/loose.mp3"];

var flag = false;
function fire(event) {
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
      elementTime.textContent = pad(seconds,2) + ":" + pad(milliseconds,3);
    } 
    
    // var audio = new Audio(audioArr[3]);
    // audio.volume = 0.3;
    // audio.play();
    
    circle.setAttribute("cx", 600);
    circle.setAttribute("cy", 235);
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
    var minutes = Math.floor(currentTime / 60000);
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
    return  Math.floor(Math.random() * (this.coordHeight - 30 + 1) + 30);
  }
  console.log(getRandomCoordX(coordWidth));
  console.log(getRandomCoordY(coordHeight));
}
