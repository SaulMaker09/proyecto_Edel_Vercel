const API_URL = "https://ghostwhite-wasp-985227.hostingersite.com/api.php";

        document.addEventListener("DOMContentLoaded", cargarUsuarios);

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
            document.getElementById("usuarioFechaNac").value = "";
            document.getElementById("usuarioTelefono").value = "";
            document.getElementById("usuarioDireccion").value = "";
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
                        <td>${user.FechaNacimiento}</td>
                        <td>${user.Telefono}</td>
                        <td>${user.Direccion}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editarUsuario(${user.id})">Editar    <i class="fa-solid fa-pen"></i></button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${user.id})">Eliminar   <i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>`;
            });
        }

        async function agregarUsuario() {
    const nombre = document.getElementById("usuarioNombre").value.trim();
    const email = document.getElementById("usuarioEmail").value.trim();
    const FechaNacimiento = document.getElementById("usuarioFechaNac").value.trim();
    const Telefono = document.getElementById("usuarioTelefono").value.trim();
    const Direccion = document.getElementById("usuarioDireccion").value.trim();

    // Validación: Todos los campos obligatorios
    if (!nombre || !email || !FechaNacimiento || !Telefono || !Direccion) {
        mostrarNotificacion("Todos los campos son obligatorios", "error");
        return;
    }

    // Validación: Email con dominio permitido (@gmail.com, @outlook.com, @hotmail.com)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com)$/;
    if (!emailRegex.test(email)) {
        mostrarNotificacion("El correo debe ser de Gmail, Outlook o Hotmail", "error");
        return;
    }

    // Validación: Fecha de nacimiento (mayores de 18 años)
    const fechaNacimiento = new Date(FechaNacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    const dia = hoy.getDate() - fechaNacimiento.getDate();
    
    if (edad < 18 || (edad === 18 && (mes < 0 || (mes === 0 && dia < 0)))) {
        mostrarNotificacion("El usuario debe ser mayor de 18 años", "error");
        return;
    }

    // Validación: Teléfono (solo números y 10 caracteres)
    const telefonoRegex = /^\d{10}$/;
    if (!telefonoRegex.test(Telefono)) {
        mostrarNotificacion("El teléfono debe tener exactamente 10 números", "error");
        return;
    }

    // Validación: Dirección (formato básico de dirección)
    const direccionRegex = /^[a-zA-Z0-9\s.,#-]+$/;
    if (!direccionRegex.test(Direccion)) {
        mostrarNotificacion("Formato de dirección inválido", "error");
        return;
    }

    try {
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, email, FechaNacimiento, Telefono, Direccion })
        });

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status} - ${respuesta.statusText}`);
        }

        const resultado = await respuesta.json();

        if (resultado.message === "Usuario creado") {
            document.querySelector("#modalUsuario .btn-close").click();
            mostrarNotificacion("Usuario agregado con éxito ✅", "success");
            cargarUsuarios();
        } else {
            throw new Error(resultado.message || "No se pudo agregar el usuario");
        }
    } catch (error) {
        mostrarNotificacion("Error al agregar usuario ❌", "error");
        console.error("Error en agregarUsuario:", error);
    }
}

        async function actualizarUsuario() {
            const id = document.getElementById("usuarioId").value;
            const nombre = document.getElementById("usuarioNombre").value.trim();
            const email = document.getElementById("usuarioEmail").value.trim();
            const FechaNacimiento = document.getElementById("usuarioFechaNac").value.trim();
            const Telefono = document.getElementById("usuarioTelefono").value.trim();
            const Direccion = document.getElementById("usuarioDireccion").value.trim();

            if (!nombre || !email || !FechaNacimiento || !Telefono || !Direccion) {
                mostrarNotificacion("Todos los campos son obligatorios", "error");
                return;
            }

            try {
                const respuesta = await fetch(API_URL, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id, nombre, email, FechaNacimiento, Telefono, Direccion })
                });

                if (!respuesta.ok) {
                    throw new Error(`Error HTTP: ${respuesta.status} - ${respuesta.statusText}`);
                }

                const resultado = await respuesta.json();

                if (resultado.message === "Usuario actualizado") {
                    document.querySelector("#modalUsuario .btn-close").click();
                    mostrarNotificacion("Usuario actualizado con éxito ✅", "success");
                    cargarUsuarios();
                } else {
                    throw new Error(resultado.message || "No se pudo actualizar el usuario");
                }
            } catch (error) {
                mostrarNotificacion("Error al actualizar usuario ❌", "error");
                console.error("Error en actualizarUsuario:", error);
            }
        }

        async function editarUsuario(id) {
            const respuesta = await fetch(`${API_URL}?id=${id}`);
            const usuario = await respuesta.json();
            document.getElementById("usuarioId").value = usuario.id;
            document.getElementById("usuarioNombre").value = usuario.nombre;
            document.getElementById("usuarioEmail").value = usuario.email;
            document.getElementById("usuarioFechaNac").value = usuario.FechaNacimiento;
            document.getElementById("usuarioTelefono").value = usuario.Telefono;
            document.getElementById("usuarioDireccion").value = usuario.Direccion;
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

        document.getElementById("guardarUsuario").addEventListener("click", () => {
            const id = document.getElementById("usuarioId").value;
            if (id) {
                actualizarUsuario();
            } else {
                agregarUsuario();
            }
        });