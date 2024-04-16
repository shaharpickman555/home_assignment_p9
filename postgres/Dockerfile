FROM postgres:12
# Set environment variables
ENV POSTGRES_DB tasksdb
ENV POSTGRES_USER admin
ENV POSTGRES_PASSWORD admin
# Copy initialization scripts
COPY init_db.sql /docker-entrypoint-initdb.d/
COPY init.sh /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port
EXPOSE 5432