<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laravel + React + Inertia</title>
    @vite('resources/js/app.jsx') <!-- Referência para o arquivo JS com Vite -->
    @vite('resources/css/app.css') <!-- Referência para o arquivo CSS com Vite -->
</head>
<body>
   @viteReactRefresh 
   @inertia
   @inertiaHead
</body>
</html>
