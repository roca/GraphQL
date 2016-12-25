PGPASSWORD=postgres psql -h 192.168.99.100 -Upostgres contest < database/test-pg-data.sql
node --harmony_destructuring database/loadTestMongoData.js