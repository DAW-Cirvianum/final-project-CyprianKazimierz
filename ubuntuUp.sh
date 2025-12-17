#Access to server folder set up the server#
cd ./server
npm install
./vendor/bin/sail up -d
npm run dev &

#Access to client folder to set up the client view#
cd ../client
npm install
npm run dev &