# Notes

ref, Populate & Thought process of writing APIs
===============================================

# connectionRequestRouter
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

    * The above APIs can be combined to a single API
        - POST /request/review/:status/:requestId
    status: accepted, rejected

Status: ignore, intrested, accepted, rejected

# Thought process to write - /request/review/
- auth middleware is required
- Status value passed in API must be valid. Only [accepted, rejected] are allowed
- requestId should not be null 
- requestId must exist in DB
- The logged in user (the one reviewing the request) must be the toUserId of connection request
- Only a connection request that is currently in "intrested" must be updated using this API

# POST vs GET
- Make sure the user is authorised in both cases
- In post the user tries to put something into a DB. Validation is very imp. Attacker can take this as an opportunity to put unwanted data into the DB
- Get: only give the required/allowed data back to the client
- Do not over fetch

# Thought process of API - /user/requests/received
- The logged in user is the toUserId in the connection request
- We have to fetch the connection requests pending for review - the ones in interested status

# Ref & Populate
- The way to join or make a relationship between tables
- For eg the fromUserId in connectionRequest is from the user table

const connectionRequestSchema = new Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User" // reference to the user collection
    },
    toUserId: {
        ...
    }
    ...
    ...
  })

- While fetching data

const requestsReceived = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
         }).populate("fromUserId", ["firstName", "lastName"]); // AS ARRAY

         OR

const requestsReceived = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", "firstName lastName"); // AS STRING
