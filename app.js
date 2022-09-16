/* 
Simulador de descuentos:
Se considera una empresa que ofrece servicios en vez de productos y que ofrece descuentos y promociones a su clientes en base a las siguientes variantes.

variantes a considerar:
-forma de pago: tarjeta, efectvo, credito
-precio servicio
-cantidad de servicios que incorpora cada cliente
*/ 

function Carrito(){
    this.servicios = [];
    this.pagado = false;

    this.agregar = function(servicio){
        this.servicios.push(servicio);
    }

    this.total = function(){
        let total=0;
        this.servicios.forEach(function(servicio){
            total = total + servicio.precioFinal();
        })
        return total;
    }

    this.pagar = function(){
        pagado = true;
    }
}

class Servicio{
    #public;
    constructor(nombre, img,  precio, descuentoSemestral, descuentoAnual, descuentoEfectivo){
        this.nombre = nombre;
        this.img = img;
        this.precio = precio;
        this.descuentoSemestral = descuentoSemestral;
        this.descuentoAnual = descuentoAnual;
        this.descuentoEfectivo = descuentoEfectivo;
        this.formaDePago;
        this.periodo;
    }

    contratar(periodo, formaDePago){
        this.periodo = periodo;
        this.formaDePago = formaDePago;
    }

    descuento(){ 
        return this.descuentoForma(this.descuentoPeriodo());
    }
 
    precioFinal(){    
        let precioPrevio = this.descuento(this.periodo, this.formaDePago);
        return precioPrevio*1.21;
    }
     
    
    descuentoForma(precio){
        switch (this.formaDePago){
            case 'tarjeta':
                return precio;
            break;
    
            case 'efectivo':
                return precio*this.descuentoEfectivo;
            break;
    
            default:
                console.log("Error: la forma de pago elegida es incorrecta")
                return 0;
            break;
        }
    }
    descuentoPeriodo(){
        let auxiliar = 0;
    
        if(this.periodo < 6){
            auxiliar = this.precio*this.periodo;
        }
        else if(this.periodo >= 6 && this.periodo < 12){
            auxiliar = this.precio*this.periodo*this.descuentoSemestral;
        }
        else if (this.periodo >= 12){
            auxiliar = this.precio*this.periodo*this.descuentoAnual;
        }
        return auxiliar;
    }
}


/******************** Comienzo del programa *************************/

let servicioA = new Servicio("Instalacion de camaras IP", "img/camara_IP_262x262.png", 589, 0.9, 0.8, 0.85); 
let servicioB = new Servicio("Monitorizacion de calderas", "img/caldera_262x262.png", 0.95, 0.9, 0.85);
let servicioC = new Servicio("Instalacion de Motores", "img/motor_dc_262x262.png", 0.95, 0.9, 0.85);

// servicioA.contratar(14, 'efectivo'); //se contrata por 14 meses y se paga en efectivo
// servicioB.contratar(6, 'tarjeta');  //se contrata por 6 meses y se paga con tarjeta

// let carrito = new Carrito();

// carrito.agregar(servicioA);
// carrito.agregar(servicioB);

// console.log("Bienvenido a la a LaEmpresa");
// console.log(`El precio final del carrito es: ${carrito.total()}`);

// carrito.pagar();

let servicios = [servicioA, servicioB, servicioC];

let padre = document.getElementById("cards")
padre.className = "row"

let html_text = ""; 
for (servicio of servicios) {
    html_text = html_text +
    `<div class="card m-2" style="width: 18rem;">
        <img src=${servicio.img} class="card-img-top" alt="osito de peluche">
        <div class="card-body">
            <h5 class="card-title">${servicio.nombre}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" id = "btn-${servicio.nombre}" class="btn btn-primary">Agregar a el carrito</a>
        </div>
    </div>`;
}
padre.innerHTML = html_text;


/***************************** FIN **********************************/

