const preguntarEliminar = async () => {
  const eliminarCarrito = await Swal.fire({
      html: '<h2>Está seguro que quiere eliminar el carrito?</h2>',
      icon: 'warning',
      position: 'center',
      backdrop: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      confirmButtonText: 'Confirmar',
      showConfirmButton: true,
      confirmButtonColor: 'red',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
  })
  if(eliminarCarrito) {
      sessionStorage.removeItem('productosElegidos');
      location.reload();
  }
}

let productosElegidos = JSON.parse(sessionStorage.getItem("productosElegidos"));

const mostrarAlerta = () => {
  $("#alertaDiv");
  let alerta = `
    <div class="col-10 mx-auto alert alert-danger" role="alert">
        <h4 class="alert-heading">El Carrito está vacío!</h4>
        <p>Vuelve al inicio y agrega productos</p>
        <hr>
        <a href="index.html" class="btn btn-secondary mb-0">Volver a la tienda</a>
    </div>
    `;
  alertaDiv.innerHTML = alerta;
};

const mostrarCarrito = () => {
  $("#carritoDiv");
  let tabla = '<table class="table table-hover text-center table-bordered">';
  tabla =
    tabla +
    `
    <thead class='table-success '>
    <tr id="headTabla">
    <th scope="col">ID</th>
    <th scope="col">Nombre</th>
    <th scope="col">Unidades</th>
    <th scope="col">Precio por unidad</th>
    <th scope="col">Precio Total</th>
    </tr>
    </thead>
    `;
  for (const producto of productosElegidos) {
    tabla =
      tabla +`
        <tbody class='table-light'><tr>
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>${producto.cant}</td>
        <td>${producto.precio}$</td>
        <td>${producto.precio * producto.cant}$</td>
        </tr></tbody>`;
  }
  let suma = 0;
  for (const producto of productosElegidos) {
    suma += producto.precio * producto.cant;
  }
  tabla =
    tabla +
    `
    <tfoot class='table-success'>
    <tr>
    <td></td><td></td><td></td>
    <th class="bg-success bg-gradient">TOTAL</th>
    <th class="bg-success bg-gradient">${suma}$ USD</th>
    </tr>
    </tfoot>
    `;
  console.log(`El total de la compra es de ${suma}$ USD`);
  let botones = `
        <button onclick='eliminarCarrito()' class="btn btn-danger">Eliminar Carrito</button>
        <a href="comprar.html" class="btn btn-success">Comprar</a>
    `;
  carritoDiv.innerHTML = tabla;
  botonesDiv.innerHTML = botones;
};

const mostrarDolar = () => {
  const url = "https://api.bluelytics.com.ar/v2/latest";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.blue.value_sell);
      $("#dolar");
      dolar.innerHTML = `
                <div class="bg-light col-5 mx-auto text-center align-items-center">
                    <h2 class="pt-3">Dolar</h2>
                    <hr>
                    <h3 class="p-2">Venta: $${data.blue.value_sell}</h3>
                    <p class="p-2">Ultima Actualización: ${data.last_update}</p>
                </div>
            `;
    });
};

const mostrar = () => {
  if (productosElegidos) {
    mostrarCarrito();
    mostrarDolar();
  } else {
    mostrarAlerta();
  }
};
const eliminarCarrito = () => {
  preguntarEliminar();
};
console.log(productosElegidos);
mostrar();
