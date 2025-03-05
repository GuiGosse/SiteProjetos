#!/bin/sh

# Verifica se o arquivo .env existe; se não, copia o .env.example
if [ ! -f ".env" ]; then
    cp .env.example .env
fi

# Instala as dependências do Composer
composer install --no-dev --optimize-autoloader

# Gera a chave da aplicação
php artisan key:generate

# Executa as migrações do banco de dados
php artisan migrate --force

# Limpa e cacheia as configurações
php artisan config:clear
php artisan cache:clear
php artisan config:cache

#link do acesso das imagens
php artisan storage:link

# Define permissões corretas
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Inicia o servidor Apache no primeiro plano
exec apache2-foreground