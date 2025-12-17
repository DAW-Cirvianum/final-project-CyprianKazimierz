# ubuntuDown.sh 

#Access to server folder set up the server#
cd ./server
pkill -f vite || echo "No Vite process"
./vendor/bin/sail down

#Access to client folder to set up the client view#
cd ../client
pkill -f vite || echo "No Vite process"
