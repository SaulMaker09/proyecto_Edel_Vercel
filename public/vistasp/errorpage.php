<?php
// Página de error personalizada en caso de un error 404
http_response_code(404);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Página no encontrada</title>
    <!-- Bootstrap CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa;
        }
        .error-container {
            margin-top: 10%;
            text-align: center;
        }
        .error-container h1 {
            font-size: 120px;
            font-weight: bold;
            color: #dc3545;
        }
        .error-container p {
            font-size: 20px;
            color: #6c757d;
        }
        .error-container a {
            font-size: 18px;
            text-decoration: none;
            color: #007bff;
        }
        .error-container a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="error-container">
            <h1>404</h1>
            <p>¡Lo sentimos! La página que buscas no existe.</p>
            <p><a href="/" class="btn btn-primary">Volver a la página principal</a></p>
        </div>
    </div>

    <!-- Bootstrap JS y jQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
