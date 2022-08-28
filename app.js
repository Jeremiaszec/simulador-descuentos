/* 
Simulador de descuentos:
Se considera una empresa que ofrece servicios en vez de productos y que ofrece descuentos y promociones a su clientes en base a las siguientes variantes.

variantes a considerar:
-forma de pago: tarjeta, efectvo, credito
-precio servicio
-cantidad de servicios que incorpora cada cliente
*/ 

const precioMensual = 589 /*mas IVA*/

const descuentoEfectivo = 0.85
const descuentoSemestral = 0.9
const descuentoAnual = 0.8

function precioFinal(precio, meses, formaDePago){    
    precioPrevio = descuento(precio, meses, formaDePago);
    return precioPrevio*1.21;
}

function descuentoPeriodo(precio, periodo){
    let auxiliar = 0;

    if(periodo == 1){
        auxiliar = precio*periodo;
    }
    else if(periodo >= 6 && periodo < 12){
        auxiliar = precio*periodo*descuentoSemestral;
    }
    else if (periodo >= 12){
        auxiliar = precio*periodo*descuentoAnual;
    }
    return auxiliar;
}

function descuentoForma(precio, formaDePago){
    switch (formaDePago){
        case 'tarjeta':
            return precio;
        break;

        case 'efectivo':
            return precio*descuentoEfectivo;
        break;

        default:
            console.log("Error: la forma de pago elegida es incorrecta")
            return 0;
        break;
    }
}

function descuento (precio, periodo, formaDePago){ 
    return descuentoForma(descuentoPeriodo(precio, periodo), formaDePago);
}

console.log("Bienvenido a la a LaEmpresa")
let cantidadMeses = Number(prompt("ingrese la cantidad de meses que desea suscrbirse"))
let formaDePago = prompt("ingrese una forma de pago: tarjeta|efectivo")
console.log(`El precio final es: ${precioFinal(precioMensual, cantidadMeses, formaDePago)}`)








