var time;
var duracionPomo;
var duracionDescanso;
var tiempoRestante; 
var timerPomo;
var relojActivo = false;
var etapa;
var descanso = false;

//me gustaría que cambiara el color de fondo del reloj dependiendo de la etapa

function timer(){
  if (relojActivo){
      clearInterval(timerPomo);
      relojActivo = false;
   } else {
        relojActivo = true;
        clearInterval(timerPomo);
        etapa = document.getElementById('etapa');
        etapa.textContent = "Session";
        duracionPomo = document.getElementById('duracionPomo').textContent * 60000; //paso a milisegundos
        duracionDescanso = document.getElementById('duracionDescanso').textContent * 60000; //paso a milisegundos
        var desc = duracionDescanso;
        var pomo = duracionPomo;
        time = document.getElementById('tiempoFaltante');
        time.textContent = pomo;
        timerPomo = setInterval(function (){
          if(pomo >= 0){
            etapa.textContent = "Session";
            console.log(etapa.textContent);
            console.log("pomo: " + pomo);
            time.textContent = pomo;
            pomo -= 1000;           
          } else {
            time.textContent = desc;
            if(desc >= 0){
              etapa.textContent = "Break";
              console.log(etapa.textContent);
              console.log("desc" + desc);
              time.textContent = desc;
              desc -= 1000;
            } else {
              //vuelvo a resetear todo
              pomo = duracionPomo;
              desc = duracionDescanso;
              etapa = document.getElementById('etapa');
              etapa.textContent = "Session";
            }
         }
        }, 1000);
  }
}

function msAMinutos(ms){
	return Math.round(ms/60000);
}

function restar(obj){
 //si el que llamó a la función es descansarMenos, te fijás si está activo el reloj y si no, entonces actualizás la duración del descanso
 // si llamó pomodoroMenos, te fijás si está activo el reloj y si no actualizás la duración del pomodoro y el display del reloj
  var id = obj.getAttribute('id');
  var lugar = (id == "pomodoroMenos")? "duracionPomo" : "duracionDescanso";
  //alert(id);
  if(!relojActivo){
    var pomo = document.getElementById(lugar);
    var dura = Number(pomo.textContent);
    if (dura > 0){//restar no llega a números negativos
      pomo.textContent = dura - 1;
      //testear si lugar es duracionPomo, en ese caso también actualizás el display del reloj
      if (lugar == "duracionPomo"){ 
      	time = document.getElementById('tiempoFaltante');
      	time.textContent = pomo.textContent;
      }
    }
  }
}

function sumar(obj){
	//averiguar qué botón se clickeó
	var id = obj.getAttribute('id');
	var lugar = (id == "pomodoroMas")? "duracionPomo" : "duracionDescanso";//el div que vas a actualizar
	//alert(id);
	if (!relojActivo){
   		var pomo = document.getElementById(lugar);
   		var dura = Number(pomo.textContent);
   		pomo.textContent = dura + 1;
   		//alert(dura);
   		//testear si lugar es duracionPomo, en ese caso también actualizás el display del reloj
      	if (lugar == "duracionPomo"){ 
      		time = document.getElementById('tiempoFaltante');
      		time.textContent = pomo.textContent;
      	}
   	}
}