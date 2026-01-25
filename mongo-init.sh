#!/bin/bash
set -e

mongosh <<EOF
use $MONGO_INITDB_DATABASE

db.createCollection('initial_collection')
db.initial_collection.insertOne({ initialized: true })

db.createUser({
  user: '$MONGO_INITDB_ROOT_USERNAME',
  pwd: '$MONGO_INITDB_ROOT_PASSWORD',
  roles: [
    { role: 'readWrite', db: '$MONGO_INITDB_DATABASE' }
  ]
});
EOF