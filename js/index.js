/* falta mostrar minutos y segundos en vez de milisegundos*/

var time;
var duracionPomo;
var duracionDescanso;
var tiempoRestante; 
var timerPomo;
var relojActivo = false;
var etapa;
var descanso = false;
var reloj;

function timer(){
  if (relojActivo){
      clearInterval(timerPomo);
      relojActivo = false;
   } else {
        relojActivo = true;
        clearInterval(timerPomo);
	reloj = document.getElementById('reloj');
        etapa = document.getElementById('etapa');
        etapa.textContent = "Session";
        duracionPomo = document.getElementById('duracionPomo').textContent * 60000; //paso a milisegundos
        duracionDescanso = document.getElementById('duracionDescanso').textContent * 60000; //paso a milisegundos
        var desc = duracionDescanso;
        var pomo = duracionPomo;
        time = document.getElementById('tiempoFaltante');
        //time.textContent = pomo;// ¿hace falta este?  me parece que no hace falta
        timerPomo = setInterval(function (){
          if(pomo >= 0){
            etapa.textContent = "Session";
	    reloj.style.background = 'red';
            //console.log(etapa.textContent);
            console.log("pomo: " + time.textContent);
            time.textContent = aMinutosYSegundos(pomo);
            pomo -= 1000;
          } else {
            //time.textContent = desc;//¿este para qué? me parece que no hace falta
            if(desc >= 0){
              etapa.textContent = "Break";
	      reloj.style.background = 'green';
              //console.log(etapa.textContent);
              console.log("desc: " + time.textContent);
              time.textContent = aMinutosYSegundos(desc);
              desc -= 1000;
            } else {
              //vuelvo a resetear todo
              pomo = duracionPomo;
              desc = duracionDescanso;
              etapa = document.getElementById('etapa');
              etapa.textContent = "Session";
	      reloj.style.background = 'red';
            }
         }
        }, 1000);//para testear más rápido voy a poner un cuarto de segundo
  }
}

//faltaría un detallecito, que en vez de 0:59, sea 00:59
// y que en vez de 25:0 sea 25:00
function aMinutosYSegundos(ms){
	var minutos = msAMinutos(ms);
        var segundos = ((ms % 60000)/1000); //.toPrecision(2) .toFixed(2);
	if (minutos < 10) {
		minutos = '0' + String(minutos);
	}

	if (segundos < 10) {
		segundos = '0' + String(segundos);;		
	}
	var res = String(minutos) + ":" + String(segundos);
	return res;//con toFixed tal vez no hace falta castear a string
}

function msAMinutos(ms){
	var res =  Math.floor(ms/60000);
	return res;
//.toFixed(2); to fixed es para decimales, tal vez sea necesario hablar de cifras significativas
//tampoco, porque en vez de 00:59 muestra 0.0:59
//tal vez si le pongo toFixed(0), no sé...
//o agregar un if minutos o segundos === 0 reemplazar por 00
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
