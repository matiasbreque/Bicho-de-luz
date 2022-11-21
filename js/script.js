const alertaFormCompraIncompleto = () => {
    Swal.fire({
        html: '<h4>Faltan datos</h4><br><p>Todos los campos son obligatorios</p>',
        allowOutsideClick: false,
        backdrop: false,
        grow: 'column',
        position: 'bottom',
        showConfirmButton: false,
        showCancelButton: false,
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
            content: 'content-class'
        }
    })
}

/* REGISTRO / INGRESO */

class Usuario {
    constructor(nombre, clave){
        this.nombre = nombre;
        this.clave = clave ;
    }
}

function procesoIngreso(){
    const nombreUser = nombreFormIngreso.value ;
    const chequeoUsuario = usuarios.find(e => e.nombre === nombreUser);
    if (chequeoUsuario === undefined){
        alertaUserNoExiste();
    }
    if (nombreUser){
        const chequeoClave = claveFormIngreso.value ;
        if (chequeoClave === chequeoUsuario.clave){
            saludoAlUser = document.createElement("strong");
            saludoAlUser.innerHTML = "Bienvenido/a de nuevo, " + chequeoUsuario.nombre;
            document.getElementById("saludoTienda").appendChild(saludoAlUser);
            tienda.style.display          = "block";
            formIngreso.style.display     = "none";
            formRegistro.style.display    = "none";
            botones.style.display         = "none";
            btnCerrarSesion.style.display = "block";
            bannerAcceso.style.display    = "none";
            bannerTienda.style.display    = "block";
        }
    }
}

function procesoRegistro(){
    const nombre = nombreFormRegistro.value;
    const clave  = claveFormRegistro.value;
    const usuario = new Usuario(nombre, clave);
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    saludoCapo = document.createElement("strong");
    saludoCapo.innerHTML = "Bienvenido/a por primera vez, " + nombre;
    document.getElementById("saludoTienda").appendChild(saludoCapo);
    tienda.style.display          = "block";
    formIngreso.style.display     = "none";
    formRegistro.style.display    = "none";
    botones.style.display         = "none";
    btnCerrarSesion.style.display = "block";
    bannerAcceso.style.display    = "none";
    bannerTienda.style.display    = "block";
}

$("#btnCompraFinal").on("click", function(e){
    e.preventDefault();
    comprobarForm()
});

function comprobarForm(){
    if(
        inputNombreFormCompra.value === "" ||
        inputApellidoFormCompra.value === "" ||
        inputMailFormCompra.value === "" ||
        inputTelefonoFormCompra.value === "" 
    ){
        alertaFormCompraIncompleto();
    }else{
        comprar();
    }
};

const comprar = async() => {
    const alerta = await Swal.fire({
        html: '<h4>Gracias por tu compra!</h4>',
        icon:'success',
        backdrop: true,
        position: 'center',
        allowOutsideClick: false,
        allowEscapeKey: true,
        allowEnterKey: false,
        stopKeydownPropagation: false,
        showConfirmButton: false,
        showCancelButton: false,
        showCloseButton: true,
    })
    if(alerta){
        sessionStorage.removeItem('productosElegidos');
        location.href="index.html"
    }
}

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

botones.style.display         = "block";
formIngreso.style.display     = "none" ;
formRegistro.style.display    = "none" ;
tienda.style.display          = "none" ;
btnCerrarSesion.style.display = "none" ;
bannerAcceso.style.display    = "block";
bannerTienda.style.display    = "none" ;

$("#botonIngreso").on("click", function(e){
    e.preventDefault();
    formRegistro.style.display = "none";
    formIngreso.style.display  = "block";
    $("#tituloIngreso").fadeIn(1000)
    .fadeOut(1000)
    .fadeIn(1000)
    .show();
});

$("#botonFormIngreso").on("click", function(e){
    e.preventDefault();
    procesoIngreso();
});

$("#botonRegistro").on("click", function(e){
    e.preventDefault();
    formIngreso.style.display  = "none";
    formRegistro.style.display = "block";    
    $("#tituloRegistro").fadeIn(1000)
        .fadeOut(1000)
        .fadeIn(1000)
        .show();
});

$("#botonFormRegistro").on("click", function(e){
    e.preventDefault();
    procesoRegistro();
});

/* ALERTS */

const alertaUserNoExiste = () => {
    Swal.fire({
        html: '<h4>El nombre y usuario que ha introducido no existe, Regístrese!</h4>',
        allowOutsideClick: false,
        backdrop: false,
        grow: 'column',
        position: 'bottom',
        showConfirmButton: false,
        showCancelButton: false,
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
            content: 'content-class'
        }
    })
}

const alertaComprar = () => {
Swal.fire({
    html: '<h4>Se ha agregado un producto al carrito</h4>',
    icon:'success',
    allowOutsideClick: false,
    backdrop: false,
    grow: 'column',
    position: 'bottom',
    showConfirmButton: false,
    showCancelButton: false,
    showCloseButton: true,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
        content: 'content-class'
    }
})
}

function agregar(id) {
    console.log('Se agrego el producto ID:', id);
    alertaComprar();
    let productoSeleccionado = productosElegidos.find(elem => elem.id == id);
    if(!productoSeleccionado) {
        let miProd = productos.find(e => e.id == id);
        let mPNombre = miProd.nombre;
        let mPPrecio = miProd.precio;
        let mPImagen = miProd.img;
        productosElegidos.push({
            id: id, cant: 1, nombre:mPNombre, precio: mPPrecio, img:mPImagen
        });
    } else {
        productoSeleccionado.cant = productoSeleccionado.cant + 1;
    }
    console.log(productosElegidos)
    sessionStorage.setItem('productosElegidos', JSON.stringify(productosElegidos));
}

/* ARRAY DE PRODUCTOS */

class Producto{
    constructor(id, nombre, precio, img){
        this.id     = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img    = img;        
    }
}

const productos = [
    {id: 1  ,nombre: "Encastre Animales 20x20" ,precio: 125 ,img: "encastre_animales_20x20.png"},
    {id: 2  ,nombre: "Lápiz Dedos Ocupados"    ,precio: 75  ,img: "lapiz_dedos_ocupados.png"   },
    {id: 3  ,nombre: "Reglas de Lectura"       ,precio: 50  ,img: "reglas_de_lectura.png"      },
    {id: 4  ,nombre: "Globos de Animales"      ,precio: 185 ,img: "globos_de_animales.png"     },
    {id: 5  ,nombre: "Geoplano"                ,precio: 125 ,img: "geoplano.png"               },
    {id: 6  ,nombre: "Engrosadores"            ,precio: 75  ,img: "engrosadores.png"           },
    {id: 7  ,nombre: "Mordillos"               ,precio: 50  ,img: "mordillos.png"              },
    {id: 8  ,nombre: "Bandeja Inflable"        ,precio: 185 ,img: "bandeja_inflable.png"       },
    {id: 9  ,nombre: "Grip Huevo"              ,precio: 125 ,img: "grip_huevo.png"             },
    {id: 10 ,nombre: "Pizarrón 40x30"          ,precio: 75  ,img: "pizarron_40x30.png"         },
    {id: 11 ,nombre: "Encastre Formas 29x20"   ,precio: 50  ,img: "encastre_formas_29x20.png"  },
    {id: 12 ,nombre: "Pelotita Antiestrés"     ,precio: 185 ,img: "pelotita_antiestres.png"    },
];

/* ARRAY DE PRODUCTOS ELEGIDOS */

let productosElegidos = [];

if(sessionStorage.getItem('productosElegidos')) {
    productosElegidos = JSON.parse(sessionStorage.getItem('productosElegidos'));
}

/* CREACION DE CARDS  */

for (const item of productos){
    $("#grilla").append(
        `
        <div class="col mb-5">
            <div id="card" class="card h-100">
                <img class="card-img-top" src="./assets/min__tienda/min__${item.img}" alt="..." />
                <div class="card-body p-4">
                    <div class="text-center"><h5 class="fw-bolder">${item.nombre}<br><br>$${item.precio}</h5></div>
                </div>
                <button type="button" class="btn btn-primary" id="botonCarrito" onclick="agregar(${item.id});" style="padding: 10% 0%">
                    Agregar al Carrito
                </button>
            </div>
        </div> 
        `
    );
    $("#btnDetalles").on("click", function(e){
        e.preventDefault();
    });
}

const card = document.getElementsByClassName("card");

/* EVENTOS Y ANIMACIONES DE LAS CARDS */

for (let item of card) {greg
    item.onmouseover = () =>{
        item.style.width = "225px";
        item.style.transition = "all 0.5s";        
    }
    item.onmouseout = () =>{
        item.style.width = "200px";
        item.style.transition = "all 0.5s";
    }
}

const botonCarrito = document.getElementById("botonCarrito")

$("#botonCarrito").on("click", function(e){
    e.preventDefault(); 
});