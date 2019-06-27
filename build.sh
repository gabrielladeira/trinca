cd backend
docker build -t barbecue-api .

cd ../frontend
yarn install
yarn build
docker build -t barbecue-web .

cd ..
docker-compose up