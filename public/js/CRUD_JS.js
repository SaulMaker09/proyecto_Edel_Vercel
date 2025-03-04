const API_URL = "https://ghostwhite-wasp-985227.hostingersite.com/api.php";

document.addEventListener("DOMContentLoaded", cargarUsuarios);



function mostrarMensajeError(input, mensaje) {
let error = input.nextElementSibling;
if (!error || !error.classList.contains("invalid-feedback")) {
error = document.createElement("div");
error.classList.add("invalid-feedback");
input.parentNode.appendChild(error);
}
error.textContent = mensaje;
}

function limpiarError(input) {
input.classList.remove("is-invalid");
let error = input.nextElementSibling;
if (error && error.classList.contains("invalid-feedback")) {
error.remove();
}
}


function mostrarNotificacion(mensaje, tipo) {
    Swal.fire({
        title: mensaje,
        icon: tipo,
        timer: 3000,
        showConfirmButton: false,
        toast: true,
        position: "top-end"
    });
}

function abrirModal() {
    document.getElementById("usuarioId").value = "";
    document.getElementById("usuarioNombre").value = "";
    document.getElementById("usuarioEmail").value = "";
    document.getElementById("usuarioEdad").value = "";
    new bootstrap.Modal(document.getElementById("modalUsuario")).show();
}

async function cargarUsuarios() {
    const respuesta = await fetch(API_URL);
    const usuarios = await respuesta.json();
    const tabla = document.getElementById("tablaUsuarios");
    tabla.innerHTML = "";
    usuarios.forEach(user => {
        tabla.innerHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.nombre}</td>
                <td>${user.email}</td>
                <td>${user.edad}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarUsuario(${user.id})">Editar ✏</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${user.id})">Eliminar 🗑</button>
                </td>
            </tr>`;
    });
}

async function guardarUsuario() {
    const id = document.getElementById("usuarioId").value;
    const nombre = document.getElementById("usuarioNombre").value.trim();
    const email = document.getElementById("usuarioEmail").value.trim();
    const edad = document.getElementById("usuarioEdad").value.trim();
    const metodo = id ? "PUT" : "POST";
    // Validación de campos vacíos
if (!nombre || !email || !edad) {
Swal.fire({
    title: "Error",
    text: "Todos los campos son obligatorios",
    icon: "error",
    confirmButtonText: "OK"
});
return; // Detiene la ejecución si hay campos vacíos
}

    try {
        await fetch(API_URL, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, nombre, email, edad })
        });
        document.querySelector("#modalUsuario .btn-close").click();
        mostrarNotificacion("Usuario guardado con éxito ✅", "success");
        cargarUsuarios();
    } catch (error) {
        mostrarNotificacion("Error al guardar usuario ❌", "error");
    }
}

async function editarUsuario(id) {
    const respuesta = await fetch(`${API_URL}?id=${id}`);
    const usuario = await respuesta.json();
    document.getElementById("usuarioId").value = usuario.id;
    document.getElementById("usuarioNombre").value = usuario.nombre;
    document.getElementById("usuarioEmail").value = usuario.email;
    document.getElementById("usuarioEdad").value = usuario.edad;
    new bootstrap.Modal(document.getElementById("modalUsuario")).show();
}

async function eliminarUsuario(id) {
    Swal.fire({
        title: "¿Seguro que deseas eliminar este usuario?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await fetch(API_URL, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id })
                });
                mostrarNotificacion("Usuario eliminado con éxito ✅", "success");
                cargarUsuarios();
            } catch (error) {
                mostrarNotificacion("Error al eliminar usuario ❌", "error");
            }
        }
    });
}

document.getElementById("guardarUsuario").addEventListener("click", guardarUsuario);