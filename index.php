<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <style>
        body {
            background: url('<?= $this->url->get('./public/img/Spider-Man.png') ?>') no-repeat center center fixed;
            background-size: cover;
            height: 100vh;
            display: flex;
            flex-direction: column;
            margin: 0 !important;
            font-family: 'Arial', sans-serif;
        }

        body::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.01);
            backdrop-filter: blur(10px);
            z-index: -1;
        }

        .navbar {
            background: rgba(255, 255, 255, 0.9);
            box-shadow: 0 2px 4px rgba(46, 2, 83, 0.1);
        }

        .login-container {
            background: rgba(95, 94, 94, 0.7);
            color: white;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            padding: 30px;
            width: 100%;
            max-width: 400px;
            margin: auto;
            animation: fadeIn 1s ease-out;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .login-container h3 {
            font-size: 2rem;
            margin-bottom: 20px;
            font-weight: bold;
        }

        .form-group {
            position: relative;
            margin-bottom: 25px;
        }

        .form-group input {
            width: 100%;
            padding: 10px;
            font-size: 1.1rem;
            border: 2px solid #ccc;
            border-radius: 5px;
            background: rgba(255, 255, 255, 0.9);
            color: #333;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .form-group input:focus {
            border-color: #476eb2;
            box-shadow: 0 0 8px rgba(42, 92, 177, 0.6);
            outline: none;
        }

        .form-group label {
            position: absolute;
            top: 12px;
            left: 10px;
            font-size: 1.1rem;
            color: #666;
            transition: all 0.3s ease;
            pointer-events: none;
        }

        .form-group input:focus + label,
        .form-group input:not(:placeholder-shown) + label {
            top: -10px;
            left: 5px;
            font-size: 0.9rem;
            color: #476eb2;
            background: rgba(255, 255, 255, 0.9);
            padding: 0 5px;
        }

        .btn-primary {
            width: 100%;
            padding: 12px;
            font-size: 1.2rem;
            background-color: #476eb2;
            border: none;
            border-radius: 5px;
            transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .btn-primary:hover {
            background-color: #3a5a8a;
            transform: translateY(-2px);
        }

        .btn-primary:active {
            transform: translateY(0);
        }

        .breadcrumb {
            background: none;
            color: white !important;
            padding: 0;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>

    <!-- Menú responsivo -->
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Mi Proyecto</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="/login">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/about">Acerca de</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/contact">Contacto</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Contenedor del login -->
    <div class="login-container text-center">
        <!-- Breadcrumbs dinámicos -->
        <nav>
            <ol class="breadcrumb" id="breadcrumb-container"></ol>
        </nav>
        <h3>Iniciar Sesión</h3>
        <form id="loginForm">
            <div class="form-group">
                <input type="text" id="username" name="username" placeholder=" " required>
                <label for="username">Ingrese su usuario</label>
            </div>
            <div class="form-group">
                <input type="password" id="password" name="password" placeholder=" " required>
                <label for="password">Ingrese su contraseña</label>
            </div>
            <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
        </form>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Datos de los breadcrumbs
        const breadcrumbsData = {
            "/": "Inicio",
            "/login": "Login",
            "/about": "Acerca de",
            "/contact": "Contacto"
        };

        // Función para generar breadcrumbs
        function generateBreadcrumbs() {
            const path = window.location.pathname; // Obtiene la ruta actual
            const breadcrumbContainer = document.getElementById('breadcrumb-container');
            
            if (!breadcrumbContainer) {
                console.error("No se encontró el contenedor de breadcrumbs.");
                return;
            }

            breadcrumbContainer.innerHTML = ''; // Limpia el contenedor

            // Genera los breadcrumbs
            Object.keys(breadcrumbsData).forEach((route, index) => {
                const isActive = route === path; // Verifica si es la ruta actual
                const breadcrumbItem = document.createElement('li');
                breadcrumbItem.classList.add('breadcrumb-item');

                if (isActive) {
                    breadcrumbItem.classList.add('active');
                    breadcrumbItem.setAttribute('aria-current', 'page');
                    breadcrumbItem.textContent = breadcrumbsData[route];
                } else {
                    const breadcrumbLink = document.createElement('a');
                    breadcrumbLink.href = route;
                    breadcrumbLink.textContent = breadcrumbsData[route];
                    breadcrumbItem.appendChild(breadcrumbLink);
                }

                breadcrumbContainer.appendChild(breadcrumbItem);
            });
        }

        // Genera los breadcrumbs al cargar la página
        generateBreadcrumbs();
    </script>
</body>
</html>