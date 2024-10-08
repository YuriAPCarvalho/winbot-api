pm2 stop redis-homolog-api

pm2 delete redis-homolog-api

git pull origin staging

npm install

npm run build

pm2 start dist/server.js --name redis-homolog-api

pm2 save
