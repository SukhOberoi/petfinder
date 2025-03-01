FROM mariadb:10.4

# Set environment variables for the database
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=pets
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=password

# Copy the SQL dump into the initialization folder so it runs on container startup
COPY pets.sql /docker-entrypoint-initdb.d/

EXPOSE 3306