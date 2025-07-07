const productos = [
  { id: 1, nombre: "Gorra Roja", precio: 25000, img: "img/1.jpg" },
  { id: 2, nombre: "Gorra Vinotinto", precio: 25000, img: "img/2.jpg" },
  { id: 3, nombre: "Gorra Verde", precio: 25000, img: "img/3.jpg" },
  { id: 4, nombre: "Gorra Azul", precio: 25000, img: "img/4.jpg" },
  { id: 5, nombre: "Gorra Negra", precio: 25000, img: "img/5.jpg" },
  { id: 6, nombre: "Gorra Blanca", precio: 25000, img: "img/6.jpg" },
];

const carrito = [];
const catalogo = document.getElementById("catalogo");
const carritoLista = document.getElementById("carrito-lista");
const totalElem = document.getElementById("total");
const pagarBtn = document.getElementById("pagar-btn");

// Mostrar productos
productos.forEach(p => {
  const div = document.createElement("div");
  div.className = "producto";
  div.innerHTML = `
    <img src="${p.img}" alt="${p.nombre}">
    <h3>${p.nombre}</h3>
    <p>Precio: $${p.precio.toLocaleString()}</p>
    <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
  `;
  catalogo.appendChild(div);
});

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  mostrarCarrito();
}

function mostrarCarrito() {
  carritoLista.innerHTML = "";
  let total = 0;
  carrito.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio.toLocaleString()}`;
    carritoLista.appendChild(li);
    total += item.precio;
  });
  totalElem.textContent = `Total: $${total.toLocaleString()}`;
}

pagarBtn.addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const telefono = document.getElementById("telefono").value.trim();

  if (!nombre || !direccion || !telefono) {
    alert("Por favor completa todos los datos del formulario.");
    return;
  }

  let mensaje = `Hola, hice una compra en TuGorra y este es mi pedido:%0A`;
  carrito.forEach(p => {
    mensaje += `- ${p.nombre} - $${p.precio.toLocaleString()}%0A`;
  });
  let total = carrito.reduce((sum, p) => sum + p.precio, 0);
  mensaje += `%0ATotal: $${total.toLocaleString()}%0A`;
  mensaje += `%0ADatos del cliente:%0ANombre: ${nombre}%0ADirección: ${direccion}%0ACelular: ${telefono}`;

  const whatsappUrl = `https://wa.me/573122284474?text=${mensaje}`;

  alert("Serás redirigido al pago. Después confírmalo por WhatsApp.");
  window.open("https://link.mercadopago.com.co/tugorra", "_blank");

  setTimeout(() => {
    carrito.length = 0;
    mostrarCarrito();
    window.location.href = whatsappUrl;
  }, 1000);
});
