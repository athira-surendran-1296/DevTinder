# Back end for Dev Tinder
=========================
# authRouter
- POST /signup
- POST /login
- POST /logout

# profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

* Note : Available Status ---> ignore, intrested, accepted, rejected

# connectionRequestRouter
- POST /request/send/:status/:toUserId  
    status: intrested, ignored

- POST /request/review/:status/:requestId
    status: accepted, rejected

# userRouter
- GET /user/requests/received
- GET /user/connections
- GET /user/feed

