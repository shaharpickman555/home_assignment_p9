#!/bin/bash

# Variables
DB_USER="admin"
DB_PASSWORD="admin"
DB_NAME="tasksdb"
DB_HOST="postgresql-tasksdb-postgresql"
DB_PORT="5432"

# Export password so you don't get prompted
export PGPASSWORD=$DB_PASSWORD

# Execute the SQL script
psql -U $DB_USER -d $DB_NAME -h $DB_HOST -p $DB_PORT -a -f /docker-entrypoint-initdb.d/init_db.sql
# Unset the password for security
unset PGPASSWORD
