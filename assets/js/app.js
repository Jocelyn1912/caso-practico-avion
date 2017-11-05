//Estructura de datos, declarar un array que representará los asientos de nuestro avión con false indicando que estos están vacios.
// es decir qu e un asiento ocupado = true
//Asientos
var airlineSeats = [
false,
false,
false,
false,
false,
false,
false,
false,
false,
false,
];

//Contador que nos ayudará a rastrear el número de asientos ocupados
var buySeats = 0;

//Declara función que nos pinte el color del asiento dependiendo de su clase
var paintSeats = function(array){
	var containerSeats = document.getElementById('seats');

	for (var i = 0; i < array.length; i++) {
		var seat = document.createElement('div');
		seat.className ='seats';

		//del primer elemento al cuartp en nuestro arreglo, va a ser primera clase, del indice 0 al 3
		if(i < 4){
			seat.style.background = 'purple';
		} else {
			seat.style.background = 'yellow';
		}
		containerSeats.appendChild(seat);
	}
};

//Evento que se le da al botón reservar asiento
var reserve = function(){
	var btn = document.getElementById('btn');
	btn.addEventListener('click', chooseZone);
};

//Función que nos dará el mensaje de la opciones para el cliente 1 o 2
var chooseZone = function(){
	var choice = prompt(
		'En que zona prefieres reservar \n 1. Primera Clase \n 2. Económica \n \n Por favor ingresa el número de tu preferencia'
	);

	//Verificamos que ingrese una opción válida, si no lo hace le enviamos una alerta
	if (choice == 1){
		checkFirstClassZone();
	} else if(choice == 2){
		checkEconomicZone();
	} else{
		alert('Por favor ingresa un número valido');
	}
};

//Creamos función para selección de asientos en primera clase
var checkFirstClassZone = function(){
	var zone = 'Primera Clase';

	//Recorre del elemento 0 al 3 y verifica cuales están disponibles
	for (var index = 0; index < 4; index++){
		if (airlineSeats[index] == false) {
			airlineSeats[index] = true;
			//Reservar el asiento
			reverveSeat(index);
			//
			paintTicket(index, zone);
			//contador
			buySeats++;
			//al reservar nuestro asiento no necesitamos seguir recorriendo nuestro arreglo
			break;
		} else if (index == 3 && airlineSeats[index] == true)
		reasignEconomicZone();
	}
};
 //Creamos función para selección de asientos en Económica
var checkEconomicZone = function(){
	var zone = 'Económica';
	for (var index = 4; index < 10; index++) {
		if (airlineSeats[index] == false) {
			airlineSeats[index] = true;
			reverveSeat(index);
			paintTicket(index, zone);
			buySeats++;
			break;
		} else if (index == 9 && airlineSeats[index] == true) {
			reasingFirstClassZone();
		}
	}
};

//Mostrando visiblemente que asientos han sido reservados
var reverveSeat = function(indexToPaint){
	var seat = document.getElementsByClassName('seats');
	seat[indexToPaint].textContent = 'Ocupado';
};


//Si no quedan asientos disponibles en primera clase se debe dar la opción de comprar en Económica siempre que hayan disponibles y que el cliente lo desee
var reasignEconomicZone = function(zone){
	//Si no hay asientos disponible se lo indicamos al usuario y le enviamos un mensaje con el estimado del próximo vuelo
	if(buySeats == 10){
		noSeats();
		nexFlight();
		//En el caso de que quedasen asientos reasignamos
	} else {
		var reasing = confirm(
			'Ya no quedan asientos disponibles en ' +
			zone +
			':( \n Quieres reservar en zona Económica?'
			);

		if (reasing == true) {
			checkEconomicZone();
		} else{
			nexFlight();
		}
	}
};

//De no quedar asientos disponibles en Económica, se debe  dar la opción de comprar en Primera clase y verificar que efectivamente quedan asientos disponibles en esta.
var reasingFirstClassZone = function(zone){
	if(buySeats == 10){
		noSeats();
		nexFlight();
	} else{
		var reasing = confirm(
			'Ya no quedan asientos disponibles en ' +
			zone +
			':( \n Quieres reservar en Primera Clase '
			);
		if (reasing == true) {
			checkFirstClassZone();
		} else{
			nexFlight();
		}
	}
};

var paintTicket = function(index, zone){
	var containerTickets = document.getElementById('tickets');
	var ticket = document.createElement('div');
	ticket.className = 'seats';
	var title = document.createElement('p');
	var reserverSeating = document.createElement('p');
	var zoneClass = document.createElement('p');
	title.textContent = 'Pase de abordar';
	reserverSeating.textContent = 'No. de asiento: ' + (index + 1);
	zoneClass.textContent = zone;
	ticket.appendChild(title);
	ticket.appendChild(reserverSeating);
	ticket.appendChild(zoneClass);
	containerTickets.appendChild(ticket);
};

//De  no querer comprar en otra clase se envía alerta indicando en cuanto sale el próximo vuelo
var nexFlight = function(){
	alert('Nuestro próximo vuelo sale en 3 horas!')
};

var noSeats = function(){
	alert('Lo sentimos: \n Ya no quedan asientos disponibles en este avión.')
};

paintSeats(airlineSeats);
reserve();
