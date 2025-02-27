use Phalcon\Mvc\View;
use Phalcon\Loader;
use Phalcon\Di\FactoryDefault;
use Phalcon\Mvc\Application;

// Define paths relativos
define('BASE_PATH', dirname(__DIR__));
define('APP_PATH', __DIR__ . '/app');

// Autocarga de archivos
require BASE_PATH . '/vendor/autoload.php'; // Si usas Composer

// Cargar las rutas
$loader = new Loader();
$loader->registerDirs(
    [
        APP_PATH . '/controllers/',
        APP_PATH . '/models/',
    ]
);
$loader->register();

// Configurar el servicio de vistas
$di = new FactoryDefault();

$di->set(
    'view',
    function () {
        $view = new View();
        $view->setViewsDir(__DIR__ . '/app/views/');
        return $view;
    }
);

// Iniciar la aplicación
$app = new Application($di);

try {
    $response = $app->handle($_SERVER['REQUEST_URI']);
    $response->send();
} catch (\Exception $e) {
    echo 'Exception: ', $e->getMessage();
}
