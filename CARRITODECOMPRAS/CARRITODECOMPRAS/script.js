const productos = [
  { id:1, nombre:"Mouse Gamer", precio:120, stock:5, descripcion:"Mouse RGB inalámbrico", imagen:"img/mouse-gamer.png", categoria:"gaming"},
  { id:2, nombre:"Teclado Mecánico", precio:80, stock:2, descripcion:"Teclado RGB mecánico", imagen:"img/teclado-mecanico.jpg", categoria:"gaming" },
  { id:3, nombre:"Laptop Gamer", precio:2500, stock:0, descripcion:"Laptop de alto rendimiento", imagen:"img/laptop-gamer.jpg", categoria:"laptops" },
  { id:4, nombre:"Monitor Full HD", precio:700, stock:3, descripcion:"Monitor para gaming y oficina", imagen:"img/monitor-full-hd.jpg", categoria:"monitores" },
  { id:5, nombre:"Audifonos Gamer", precio:150, stock:4, descripcion:"Audifonos RGB con microfono", imagen:"img/audifonos-gamer.jpg", categoria:"audio" },
  { id:6, nombre:"Webcam HD", precio:95, stock:1, descripcion:"Webcam para videollamadas", imagen:"img/webcam-hd.jpg", categoria:"accesorios" },
  { id:7, nombre:"SSD 1TB", precio:320, stock:8, descripcion:"Disco sólido", imagen:"img/ssd-1tb.jpg", categoria:"accesorios"  },
  { id:8, nombre:"Silla Gamer", precio:850, stock:3, descripcion:"Silla ergonómica", imagen:"img/silla-gamer.jpg", categoria:"gaming"  },
  { id:9, nombre:"Microfono USB", precio:180, stock:5, descripcion:"Microfono para streaming", imagen:"img/microfono-usb.jpg", categoria:"audio" },
  { id:10, nombre:"Router WiFi 6", precio:240, stock:6, descripcion:"Router", imagen:"img/router-wifi-6.jpg" , categoria:"accesorios"},
  { id:11, nombre:"Memoria RAM 16GB", precio:290, stock:7, descripcion:"RAM DDR4", imagen:"img/ram-16gb.jpg" , categoria:"accesorios"},
  { id:12, nombre:"Tablet Android", precio:950, stock:4, descripcion:"Tablet", imagen:"img/tablet-android.jpg" , categoria:"accesorios"},
  { id:13, nombre:"Impresora Multifuncional", precio:450, stock:5, descripcion:"Impresora", imagen:"img/impresora-multifuncional.jpg" , categoria:"accesorios"},
  { id:14, nombre:"Disco Externo 2TB", precio:380, stock:6, descripcion:"Disco externo", imagen:"img/disco-externo-2tb.jpg", categoria:"accesorios" },
  { id:15, nombre:"Mouse Pad RGB", precio:75, stock:10, descripcion:"Mouse Pad", imagen:"img/mouse-pad-rgb.jpg" , categoria:"gaming" },
  { id:16, nombre:"Mando Inalambrico", precio:220, stock:4, descripcion:"Control para PC", imagen:"img/mando-inalambrico.jpg" , categoria:"gaming"},
  { id:17, nombre:"Smartwatch", precio:390, stock:5, descripcion:"Reloj inteligente", imagen:"img/smartwatch.jpg" , categoria:"accesorios" },
  { id:18, nombre:"Parlante Bluetooth", precio:160, stock:8, descripcion:"Parlante", imagen:"img/parlante-bluetooth.jpg" , categoria:"audio" },
];

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contenedor = document.getElementById("contenedor-productos");

window.onload = function(){

  let usuario = localStorage.getItem("usuario");

  mostrarProductos(productos);
  actualizarCarrito();

  if(usuario){

    document.getElementById("btnLogin").style.display = "none";
    document.getElementById("btnCerrar").style.display = "inline-block";

    document.querySelector(".carrito").style.display = "block";

  }else{

    document.getElementById("btnLogin").style.display = "inline-block";
    document.getElementById("btnCerrar").style.display = "none";

    document.querySelector(".carrito").style.display = "none";

  }
}

/* MOSTRAR PRODUCTOS */
function mostrarProductos(lista){
  if (!contenedor) return;
  contenedor.innerHTML="";
  lista.forEach(producto=>{
    contenedor.innerHTML += `
    <div class="card ${producto.stock===0 ? 'agotado':''}">
      <img src="${producto.imagen}">
      <h3>${producto.nombre}</h3>
      <p class="precio">S/${producto.precio}</p>
      <p class="stock">${producto.stock===0 ? 'AGOTADO':'Stock: '+producto.stock}</p>
      <div class="botones">
        <button class="detalle" onclick="verDetalle(${producto.id})">Ver Detalle</button>
        <button class="${producto.stock===0 ? 'no-disponible':'agregar'}" ${producto.stock===0 ? 'disabled':''} onclick="agregarCarrito(${producto.id})">
          ${producto.stock===0 ? 'No disponible':'Agregar'}
        </button>
      </div>
    </div>
    `;
  });
}

/* BUSCADOR */
document.getElementById("buscar").addEventListener("input", e=>{
  const texto = e.target.value.toLowerCase();
  const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto));
  mostrarProductos(filtrados);
});

function filtrarCategoria(categoria){

  const filtrados = productos.filter(
    producto => producto.categoria === categoria
  );

  mostrarProductos(filtrados);
}


/* MODAL DETALLES */
function verDetalle(id){
  const producto = productos.find(p=>p.id===id);
  document.getElementById("modal").style.display="flex";
  document.getElementById("modal-img").src=producto.imagen;
  document.getElementById("modal-nombre").innerText=producto.nombre;
  document.getElementById("modal-desc").innerText=producto.descripcion;
  document.getElementById("modal-precio").innerText="S/"+producto.precio;
}

function cerrarModal(){
  document.getElementById("modal").style.display="none";
}

/* INTERCAMBIO VISTAS LOGIN / REGISTRO */
function cambiarVista(vista){
  if(vista === 'registro'){
    document.getElementById("vista-login").style.display = "none";
    document.getElementById("vista-registro").style.display = "block";
  } else {
    document.getElementById("vista-registro").style.display = "none";
    document.getElementById("vista-login").style.display = "block";
  }
}

function cerrarModalLogin(){
  document.getElementById("modalLogin").style.display = "none";
}

  function abrirLogin(){
  cambiarVista('login');
  document.getElementById("modalLogin").style.display="flex";
}

/* LÓGICA DE USUARIOS EN LOCALSTORAGE */
function obtenerUsuarios(){
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function registrarUsuario(){
  const nombre = document.getElementById("regNombre").value.trim();
  const correo = document.getElementById("regCorreo").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  if(nombre === "" || correo === "" || password === ""){
    alert("Debe completar todos los campos del registro");
    return;
  }



  let usuarios = obtenerUsuarios();
  
  const existe = usuarios.find(u => u.correo === correo);
  if(existe){
    alert("Este correo electrónico ya se encuentra registrado");
    return;
  }

  usuarios.push({ nombre, correo, password });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("¡Usuario registrado con éxito! Ahora puedes iniciar sesión.");
  
  document.getElementById("regNombre").value = "";
  document.getElementById("regCorreo").value = "";
  document.getElementById("regPassword").value = "";
  cambiarVista('login');
}

function iniciarSesion(){
  const correo = document.getElementById("loginCorreo").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  

  if(correo === "" || password === ""){
    alert("Complete todos los campos");
    return;
  }

  let usuarios = obtenerUsuarios();
  const usuarioValidado = usuarios.find(u => u.correo === correo && u.password === password);

  if(!usuarioValidado){
    alert("Correo o contraseña incorrectos. Si eres nuevo, por favor regístrate.");
    return;
  }
   document.getElementById("btnLogin").style.display = "none";

  document.getElementById("btnCerrar").style.display = "inline-block";

  localStorage.setItem("usuario", JSON.stringify({ correo: correo, nombre: usuarioValidado.nombre }));

  document.getElementById("modalLogin").style.display = "none";
  document.querySelector(".carrito").style.display = "block";

  alert("Sesión iniciada correctamente. ¡Bienvenido/a " + usuarioValidado.nombre + "!");
  
  document.getElementById("loginCorreo").value = "";
  document.getElementById("loginPassword").value = "";
}

/* CARRITO */
function agregarCarrito(id){
  let usuario = localStorage.getItem("usuario");

  if(!usuario){
    cambiarVista('login');
    document.getElementById("modalLogin").style.display = "flex";
    return;
  }

  const producto = productos.find(p=>p.id===id);

  if(producto.stock <= 0){
    alert("Producto agotado");
    return;
  }

  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
  mostrarMensaje();
}

function actualizarCarrito(){
  const lista = document.getElementById("lista-carrito");
  if (!lista) return;
  lista.innerHTML="";
  let total=0;

  carrito.forEach(p=>{
    total += p.precio;
    lista.innerHTML += `<p>• ${p.nombre} - S/${p.precio}</p>`;
  });

  document.getElementById("contador").innerText = carrito.length;
  document.getElementById("total").innerText = total;
}

function mostrarMensaje(){
  const m = document.getElementById("mensaje");
  m.style.display="block";
  setTimeout(()=>{ m.style.display="none"; },2000);
}

function cerrarSesion(){

  localStorage.removeItem("usuario");

  document.getElementById("btnLogin").style.display = "inline-block";
  document.getElementById("btnCerrar").style.display = "none";

  document.querySelector(".carrito").style.display = "none";

  location.reload();
}
 // <-- Corregido el cierre de llave faltante

function toggleCarrito(){
  const carrito = document.getElementById("panel-carrito");

  if(carrito.style.display === "none" || carrito.style.display === ""){
    carrito.style.display = "block";
  }else{
    carrito.style.display = "none";
  }
}

function confirmarCompra(){

  const nombre = document.getElementById("nombreCliente").value.trim();
  const dni = document.getElementById("dniCliente").value.trim();
  const telefono = document.getElementById("telefonoCliente").value.trim();
  const correo = document.getElementById("correoCliente").value.trim();
  const metodo = document.getElementById("metodoPago").value;
  
  let historial = JSON.parse(localStorage.getItem("historial")) || [];

historial.push({
  fecha: new Date().toLocaleString(),
  cliente: nombre,
  total: document.getElementById("total").innerText,
  productos: [...carrito]
});

localStorage.setItem("historial", JSON.stringify(historial));

  if(
    nombre === "" ||
    dni === "" ||
    telefono === "" ||
    correo === "" ||
    metodo === ""
  ){
    alert("Complete todos los datos del cliente");
    return;
  }

  if(carrito.length === 0){
    alert("El carrito está vacío");
    return;
  }

  alert(
    "✅ Compra realizada con éxito\n\n" +
    "Cliente: " + nombre +
    "\nMétodo de Pago: " + metodo +
    "\nProductos: " + carrito.length
  );

  carrito.length = 0;

  localStorage.setItem("carrito", JSON.stringify(carrito));

  actualizarCarrito();

  document.getElementById("nombreCliente").value = "";
  document.getElementById("dniCliente").value = "";
  document.getElementById("telefonoCliente").value = "";
  document.getElementById("correoCliente").value = "";
  document.getElementById("metodoPago").value = "";
}

function verHistorial(){

  const historial = JSON.parse(localStorage.getItem("historial")) || [];

  let html = "";

  historial.forEach(compra => {

    html += `
      <div class="compra">
        <h4>${compra.fecha}</h4>
        <p>Cliente: ${compra.cliente}</p>
        <p>Total: S/${compra.total}</p>
      </div>
    `;

  });

  document.getElementById("listaHistorial").innerHTML = html;
}

// ...todo tu código anterior...

const metodoPago = document.getElementById("metodoPago");
const qrYape = document.getElementById("qrYape");

metodoPago.addEventListener("change", function() {
    if (this.value === "Yape") {
        qrYape.style.display = "block";
    } else {
        qrYape.style.display = "none";
    }
});