/* 
Simulador de descuentos:
Se considera una empresa que ofrece servicios en vez de productos y que ofrece descuentos y promociones a su clientes en base a las siguientes variantes.

variantes a considerar:
-forma de pago: tarjeta, efectvo, credito
-precio servicio
-cantidad de servicios que incorpora cada cliente
*/ 


/* a esto se lo llama funcion constructora y es una de las formas de definir un objeto */
function Carrito(){
    this.servicios = []; //objetos servicios y no nombres
    this.pagado = false;

    this.agregar = function(servicioPorAgregar){
        this.servicios.push(servicioPorAgregar);
        localStorage.removeItem(usuarioActual);
        localStorage.setItem(usuarioActual, JSON.stringify(this.servicios));
    }

    this.quitar = function(servicioPorRemover){
        
        var index = this.servicios.findIndex(function(servicioEnCarrito){
            return servicioPorRemover.id === servicioEnCarrito.id;
        }); 

        if(index > -1){
            this.servicios.splice(index, 1);
        }

        localStorage.removeItem(usuarioActual);
        localStorage.setItem(usuarioActual, JSON.stringify(this.servicios));
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

/* Esta es la forma clasica de definir un objeto */
class Servicio{
    #public;

    constructor(id, nombre, img, resumen ,precio, descuentoSemestral, descuentoAnual, descuentoEfectivo){
        this.id = id;
        this.nombre = nombre;
        this.img = img;
        this.resumen = resumen;
        this.precio = precio;
        this.descuentoSemestral = descuentoSemestral;
        this.descuentoAnual = descuentoAnual;
        this.descuentoEfectivo = descuentoEfectivo;
        this.formaDePago;
        this.periodo;
    }


    enCarrito(){
        for (let i = 0; i < carrito.servicios.length; i++) {
            if (carrito.servicios[i].id === this.id) {
            return true;
            }
        }
        return false;
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

//servicioA.contratar(14, 'efectivo'); //se contrata por 14 meses y se paga en efectivo
//servicioB.contratar(6, 'tarjeta');  //se contrata por 6 meses y se paga con tarjeta

//creamos el carrito como variable global con la que vamos a trabajar
let carrito = new Carrito();

//creamos los servicios disponibles que ofrece la empresa y agregamos los servicios dfinidos
let servicios = [
    new Servicio(1, "Toyota Hilux DX/SR", "img/hilux2_262x262.png", "Camioneta 2x4 doble cabina color gris, 40 mil kilometros perfecto estado, color gris oscuro", 589, 0.9, 0.8, 0.85),
    new Servicio(2, "Sprinter 8.4lts 2x4", "img/sprinter262x262.jpg.png", "Camioneta 2x4 18 pasajeros, 80 mil kilometros nueva, aire acondicionado", 0.95, 0.9, 0.85),
    new Servicio(3, "Toyota Hilux 5MT 4x2", "img/hilux3_262x262.png", "Camioneta 2x4 doble cabina color gris, 140 mil kilometros perfecto estado, color gris claro", 0.95, 0.9, 0.85),
    new Servicio(4, "Toyota Hilux DX/SR", "img/hilux2_262x262.png", "Camioneta 2x4 doble cabina color gris, 40 mil kilometros perfecto estado, color gris oscuro", 589, 0.9, 0.8, 0.85),
    new Servicio(5, "Sprinter 8.4lts 2x4", "img/sprinter262x262.jpg.png", "Camioneta 2x4 18 pasajeros, 80 mil kilometros nueva, aire acondicionado", 0.95, 0.9, 0.85),
    new Servicio(6, "Toyota Hilux 5MT 4x2", "img/hilux3_262x262.png", "Camioneta 2x4 doble cabina color gris, 140 mil kilometros perfecto estado, color gris claro", 0.95, 0.9, 0.85),
    new Servicio(7, "Toyota Hilux DX/SR", "img/hilux2_262x262.png", "Camioneta 2x4 doble cabina color gris, 40 mil kilometros perfecto estado, color gris oscuro", 589, 0.9, 0.8, 0.85),
    new Servicio(8, "Sprinter 8.4lts 2x4", "img/sprinter262x262.jpg.png", "Camioneta 2x4 18 pasajeros, 80 mil kilometros nueva, aire acondicionado", 0.95, 0.9, 0.85),
    new Servicio(9, "Toyota Hilux 5MT 4x2", "img/hilux3_262x262.png", "Camioneta 2x4 doble cabina color gris, 140 mil kilometros perfecto estado, color gris claro", 0.95, 0.9, 0.85)
];



let usuarioActual = "";

//iniciamos la sesion del usuario actual para cargar los valores guardados
initSession();

//carrito.agregar(servicioA);
//carrito.agregar(servicioB);

// console.log("Bienvenido a la a LaEmpresa");
// console.log(`El precio final del carrito es: ${carrito.total()}`);

// carrito.pagar();



//creamos el HTML segun los servicios que estamos ofreciendo, y el estado actual del carrito
let padre = document.getElementById("cardsContainer")
padre.className = "row"

for (servicio of servicios) {
    let html_card = document.createElement("div")
    html_card.className = "card m-2";
    html_card.style.width = "18rem";
    html_card.innerHTML =
    `
    <img src=${servicio.img} class="card-img-top" alt="osito de peluche">
    <div class="card-body">
        <h5 class="card-title">${servicio.nombre}</h5>
        <p class="card-text">${servicio.resumen}</p>
        <a onclick="respuestaClick(this, ${servicio.id})" class="btn btn-primary">${textoBotonCard(servicio)}</a>
    </div>
    `;

    //let button = html_card.querySelector("div a");
    
    padre.appendChild(html_card)
}

//funcion auxiliar para colocar los textos segun el carrito de la sesion 
function textoBotonCard(servicio){
    if(servicio.enCarrito()){
        return "Agregado";
    }
    return "Agregar a el carrito";
}

//funcion que inicializa la sesion del usuario actual, trabajamos con los datos del carrito
function initSession(){
    
    usuarioActual = prompt('Ingrese nombre de usuario');

    // el local storage, ejemplo:
    //Jeremias, [{"servicio":"camaras", "tiempo": 12}, {"servicio: "motores, "tiempo": 5}];
    //Marcos, [{"servicio":"camaras", "tiempo": 12}, {"servicio: "motores, "tiempo": 5}];

    // aca se utilizan los operadores de orden superior para que los servicios del carrito no queden en null
    carrito.servicios = JSON.parse(localStorage.getItem(usuarioActual)) || [];
}

/************************ EVENTOS HANDLERS **************************/

async function respuestaClick(node, id) {  
    
    let servicio = servicios.find((element) => element.id === id);

    if(servicio.enCarrito()){
        carrito.quitar(servicio);
        node.textContent = "Agregar a el carrito";
    }
    else{
        node.textContent = "Agregado";
        carrito.agregar(servicio);
        //Podemos usar este efecto de la libreria sweetalert2
        // Swal.fire({
        //     title: '¡Agregado!',
        //     text: 'El servicio se agrego correctamente',
        //     icon: 'success',
        //     confirmButtonText: 'continuar'
        // })


        //o podemos usar este otro de la libreria toastify
        Toastify({
            text: "agregado al carrito",
            duration: 2000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} // Callback after click
        }).showToast();
    }
}
/***************************** FIN **********************************/
