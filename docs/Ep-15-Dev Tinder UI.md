# Dev Tinder UI 
===============
- Install CORS middleware to solve the cors error

app.use(cors({
    origin: "http://localhost:5173/",
    credentials: true
}))

- The backend must know where the front end id --> origin
- credentials: true --> Security
