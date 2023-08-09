#!/bin/sh
# wait-for-db.sh

set -e

db_host="$1"

shift
cmd="$@"

until nc -z $db_host 3306; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "MySQL is up - Executing command"

echo $cmd
exec $cmd
