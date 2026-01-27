# Notes

Logical DB Query & Compound Indexes
===================================

# connectionRequestRouter
- POST /request/send/intrested/:userId
- POST /request/send/ignored/:userId

    * The above APIs can be combined to a single API
        - POST /request/send/:stustus/:toUserId

Status: ignore, intrested, accepted, rejected

# Schema pre methods

connectionRequestSchema.pre("save", async function () {
  const connectionRequest = this;
  // use equals method as id is object id and not just string
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send request to yourself!");
  }
});

# $or and $and
The $or operator has the following syntax:
{ $or: [ { <expression1> }, { <expression2> }, ... , { <expressionN> } ] }

The $and has the following syntax:
{ $and: [ { <expression1> }, { <expression2> } , ... , { <expressionN> } ] }

# Indexes
- Suppose we have 1000 users in our system and these users are sending hundreds of connection request
- In this case the connection request table grows and queries will become expensive
- For that we can use indexing.
- If you index a field, Mongo DB handles it efficiently to optimise the query
- If we keep a field unique, by default its indexed
- Its not recommended to index all the field as it will negetively impact the performance

emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
    if(!validator.isEmail(value)) {
        throw new Error("Invalid email id!");
    }
    }
},

# Compund indexes
- When we need more than one index
- Here we are finding data with help of both fromUserId and toUserId, hence its suggested to make them both indexes, otherwise the optimisation wont work
        const existingConnection = await ConnectionRequest.findOne({ 
            $or: [ 
                { fromUserId, toUserId }, 
                { fromUserId: toUserId, toUserId: fromUserId } 
            ] 
        });
- available values: 1 | -1 | '2d' | '2dsphere' | 'geoHaystack' | 'hashed' | 'text'
- https://mongoosejs.com/docs/api/schema.html#Schema.prototype.index()




