#Access to server folder set up the server#
echo === STARTING SERVER ===
cd ./server
npm install # obtain the node_modules
./vendor/bin/sail up -d # start up laravel

echo "Wait 2 seconds to mysql accept connections.."
until ./vendor/bin/sail shell -c "mysqladmin ping -h mysql -u root --silent"; do #connect with the db and we log in
    sleep 2
done
./vendor/bin/sail artisan migrate #migrate all tables
./vendor/bin/sail artisan db:seed --class=DatabaseSeeder #introduce the user into the table
npm run dev & # execute the bootstrap or tailwind

#Access to client folder to set up the client view#
echo === STARTING CLIENT ===
cd ../client
npm install # obtain the node_modules
npm run dev & # execute the bootstrap or tailwind