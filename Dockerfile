# Usa a imagem oficial do PHP com Apache
FROM php:8.2-apache

# Instala pacotes essenciais
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo pdo_mysql gd

# Instala o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Define o diretório de trabalho
WORKDIR /var/www/html

# Copia os arquivos do projeto para o container
COPY . .

# Instala as dependências do Laravel
RUN composer install --no-dev --optimize-autoloader

# Ajusta permissões das pastas necessárias
RUN chmod -R 777 storage bootstrap/cache

# Modifica a configuração do Apache para apontar para a pasta public/
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|' /etc/apache2/sites-available/000-default.conf

# Habilita o mod_rewrite para o Laravel
RUN a2enmod rewrite

# Cria o link simbólico do storage
RUN php artisan storage:link || true

# Copia o script de entrada
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Expõe a porta 80
EXPOSE 80

# Define o script de entrada
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]