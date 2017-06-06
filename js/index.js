var time;
var duracion;
var tiempoRestante; 
var relojActivo = false;
var timerCoso;

function timer(){
  time = document.getElementById('tiempoFaltante');
  duracion = document.getElementById('duracionPomo').textContent;
  tiempoRestante = duracion * 60000; //convierto minutos a milisegundos 

  //no funciona bien con la conversión a minutos, el reloj muestra 0 antes de tiempo

  //si el reloj está activo y se volvió a clickear, se termina, y no se puede continuar después, pero podés configurar
  // y pasás relojActivo a false
   if(relojActivo){ //es porque el timerCoso está funcionando y no está indefinido
		clearInterval(timerCoso);
		relojActivo = false;
    } else {
    	relojActivo = true;
        var falta = tiempoRestante;//para poder resetear el contador cada vez que se clikea, no es lo que se pide, pero ya vamos a llegar
	    time.textContent = falta;//msAMinutos(tiempoRestante); //convertir a minutos:segundos lo que se muestra en time, pero mantener tiempoRestante en milisegundos para hacer los cálculos
	    timerCoso = setInterval(function actualizar(){
			falta -= 1000;
			time.textContent = falta;//msAMinutos(tiempoRestante);
			var ahora = Date.now();
			console.log("falta");
			if (falta < 1000){
				clearInterval(timerCoso);
				relojActivo = false;
				console.log("stop");
				alert("Listo");
				//deberías pasar al descanso, donde el reloj estaría nuevamente activo pero en otro estado...
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