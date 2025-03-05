#!/bin/sh

# Verifica se o arquivo .env existe; se não, copia o .env.example
if [ ! -f ".env" ]; then
    echo "Arquivo .env não encontrado! Criando a partir de .env.example"
    cp .env.example .env
fi

# Instala as dependências do Composer, se necessário
echo "Instalando dependências do Composer..."
composer install --no-dev --optimize-autoloader

# Gera a chave da aplicação, se necessário
echo "Gerando chave da aplicação..."
php artisan key:generate

# Executa as migrações do banco de dados, se necessário
echo "Executando migrações..."
php artisan migrate --force

# Limpa e cacheia as configurações
echo "Limpar e cachear configurações..."
php artisan config:clear
php artisan cache:clear
php artisan config:cache

# Cria o link simbólico de armazenamento de arquivos
echo "Criando link simbólico para o storage..."
php artisan storage:link

# Define permissões corretas
echo "Ajustando permissões de pastas..."
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Inicia o Apache no primeiro plano
echo "Iniciando o servidor Apache..."
exec apache2-foreground
