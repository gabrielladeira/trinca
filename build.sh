cd backend
docker build -t barbecue-api .

cd ../frontend
npm run build
docker build -t barbecue-web .

cd ..
docker-compose up