## Installing packages and dependencies:

Make sure you have node installed on your system.

```
cd backend
npm i
```

```
cd frontend
npm i
```

## Setting up mongoDB:

Create an .env file, it should look like this:

```
PORT=5000                // keep it 5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

Your env file should not be inside the backend or the frontend directory, it should be in the main directory.

## Starting the backend server:

```
cd backend
npm start
```

## Starting the frontend server:

```
cd frontend
npm start
```
