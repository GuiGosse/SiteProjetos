<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Portfólio</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .header {
            background: #007BFF;
            color: white;
            text-align: center;
            padding: 15px;
        }
        .container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background: white;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
        }
        .footer {
            text-align: center;
            padding: 15px;
            background: #222;
            color: white;
            position: fixed;
            bottom: 0;
            width: 100%;
        }
        a {
            color: black;
            text-decoration: none;
            font-weight: bold;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <header class="header">
        <h1>Meu Portfólio</h1>
    </header>

    <div class="container">
        <h2>Sobre Mim</h2>
        <p>Sou um desenvolvedor apaixonado por tecnologia e inovação.</p>

        <h2>Projetos</h2>
        <ul>
            <li>📌 <strong>Projeto 1:</strong> Calculadora</li>
            <li>📌 <strong>Projeto 2:</strong> Jogo da Velha</li>
            <li>📌 <strong>Projeto 3:</strong> Aplicação Mobile</li>
        </ul>

        <h2>Contato</h2>
        <p>📧 <a href="mailto:guilhermegosse@gmail.com">guilhermegosse@gmail.com</a></p>
    </div>

    <footer class="footer">
        <p>&copy; {{ date('Y') }} Guilherme Gosse. Todos os direitos reservados.</p>
    </footer>
</body>
</html>
