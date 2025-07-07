const productos = [
  { id: 1, nombre: "Gorra Roja", precio: 25000, img: "img/1.jpg" },
  { id: 2, nombre: "Gorra Vinotinto", precio: 25000, img: "img/2.jpg" },
  { id: 3, nombre: "Gorra Verde", precio: 25000, img: "img/3.jpg" },
  { id: 4, nombre: "Gorra Azul", precio: 25000, img: "img/4.jpg" },
  { id: 5, nombre: "Gorra Negra", precio: 25000, img: "img/5.jpg" },
  { id: 6, nombre: "Gorra Blanca", precio: 25000, img: "img/6.jpg" },
];

let carrito = [];
const catalogo = document.getElementById("catalogo");
const carritoLista = document.getElementById("carrito-lista");
const totalElem = document.getElementById("total");
const pagarBtn = document.getElementById("pagar-btn");
const botonCarrito = document.getElementById("boton-carrito");
const carritoPanel = document.getElementById("carrito");
const cerrarCarrito = document.getElementById("cerrar-carrito");

// Mostrar productos
productos.forEach(p => {
  const div = document.createElement("div");
  div.className = "producto";
  div.innerHTML = `
    <img src="${p.img}" alt="${p.nombre}">
    <h3>${p.nombre}</h3>
    <p>Precio: $${p.precio.toLocaleString()}</p>
    <div class="agregado-exito">
      <button onclick="agregarAlCarrito(${p.id}, this)">Agregar al carrito</button>
      <span class="chulito">✓</span>
    </div>
  `;
  catalogo.appendChild(div);
});

function agregarAlCarrito(id, boton) {
  const index = carrito.findIndex(item => item.producto.id === id);
  if (index !== -1) {
    carrito[index].cantidad += 1;
  } else {
    const producto = productos.find(p => p.id === id);
    carrito.push({ producto, cantidad: 1 });
  }
  mostrarCarrito();

  // Animación de chulito ✓
  const contenedor = boton.parentElement;
  const chulito = contenedor.querySelector(".chulito");
  chulito.classList.add("mostrar");
  setTimeout(() => chulito.classList.remove("mostrar"), 1000);
}

function eliminarDelCarrito(id) {
  const index = carrito.findIndex(item => item.producto.id === id);
  if (index !== -1) {
    if (carrito[index].cantidad > 1) {
      carrito[index].cantidad -= 1;
    } else {
      carrito.splice(index, 1);
    }
    mostrarCarrito();
  }
}

function mostrarCarrito() {
  carritoLista.innerHTML = "";
  let total = 0;
  carrito.forEach(({ producto, cantidad }) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${producto.nombre} x${cantidad} - $${(producto.precio * cantidad).toLocaleString()}
      <button onclick="eliminarDelCarrito(${producto.id})" style="margin-left:10px; background:red;">Eliminar</button>
    `;
    carritoLista.appendChild(li);
    total += producto.precio * cantidad;
  });
  totalElem.textContent = `Total: $${total.toLocaleString()}`;
}

// Abrir/cerrar carrito
botonCarrito.addEventListener("click", () => {
  carritoPanel.classList.add("abierto");
});
cerrarCarrito.addEventListener("click", () => {
  carritoPanel.classList.remove("abierto");
});

pagarBtn.addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const telefono = document.getElementById("telefono").value.trim();

  if (!nombre || !direccion || !telefono) {
    alert("Por favor completa todos los datos del formulario.");
    return;
  }

  let mensaje = `Hola, hice una compra en TuGorra y este es mi pedido:%0A`;
  carrito.forEach(({ producto, cantidad }) => {
    mensaje += `- ${producto.nombre} x${cantidad} - $${(producto.precio * cantidad).toLocaleString()}%0A`;
  });
  let total = carrito.reduce((sum, { producto, cantidad }) => sum + producto.precio * cantidad, 0);
  mensaje += `%0ATotal: $${total.toLocaleString()}%0A`;
  mensaje += `%0ADatos del cliente:%0ANombre: ${nombre}%0ADirección: ${direccion}%0ACelular: ${telefono}`;

  const whatsappUrl = `https://wa.me/573122284474?text=${mensaje}`;

  alert("Serás redirigido al pago. Después confírmalo por WhatsApp.");
  window.open("https://link.mercadopago.com.co/tugorra", "_blank");

  setTimeout(() => {
    carrito = [];
    mostrarCarrito();
    carritoPanel.classList.remove("abierto");
    window.location.href = whatsappUrl;
  }, 1000);
});
