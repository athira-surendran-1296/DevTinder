# Notes

Middlewares and Error Handlres
==============================
* Route handlers must send back response.
* Otherwise the request will time out / hang.
* One route can also have multiple route handler.

app.use("/user",
    (req, res) => {
        res.send("Res 1!");
    },
    (req, res) => {
        res.send("Res 2!");
    }
);

Result: Res 1!

* Now, suppose first handler does not send a response
* This will simply hang. Express does not send the 2nd response explicitly. We need to use next()

app.use("/user",
    (req, res) => {
        // nothing
    },
    (req, res) => {
        res.send("Res 2!");
    }
);

* In this case output is - Res 2!
app.use("/user",
    (req, res) => {
        next();
    },
    (req, res) => {
        res.send("Res 2!");
    }
);

* What if we send response in the first handler and use next

app.use("/user",
    (req, res, next) => {
        res.send("Res 1!");
        next();
    },
    (req, res) => {
        res.send("Res 2!");
    }
);

Output: Res 1
with error : Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

The error comes because the second handler executes

* What will happen here?

app.use("/user",
    (req, res, next) => {
        next();
        res.send("Res 1!");
    },
    (req, res) => {
        res.send("Res 2!");
    }
);

Output:
Res 2!
with error Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

The error comes because as next is encountered, the second handler executes. After its execution, res.send("Res 1!") runs

* What will happen in this case?

app.use("/user",
    (req, res, next) => {
        next();
    },
    (req, res, next) => {
        // res.send("Res 2!");
        next();
    }
);

Cannot GET /user

* We can wrap the handlres with in an array
app.use("/user",
    [ 
        (req, res, next) => {
            console.log("First handler");
            next();
        },
        (req, res) => {
            console.log("Second handler");
            res.send("Res 2!");
        }
    ]
);

* We can also mix and match, array + fns

app.use("/user",
    [ // We can wrap the handlres with in an array
        (req, res, next) => {
            console.log("First handler");
            next();
        },
        (req, res, next) => {
            console.log("Second handler");
            next();
        }
    ],
    (req, res) => {
        console.log("Third handler");
        res.send("Res 3!");
    }
);

* Summary

app.use("/", rh1, rh2, rh3);
app.use("/", [rh1, rh2, rh3]);
app.use("/", [rh1, rh2, rh3, [rh4, rh5], rh6]);

* Instead of having multiple route handlers in a single route we can have them separately as well
app.use("/user",
    (req, res, next) => {
        console.log("This is my first route handler!");
        next();
    }
);
app.use("/user",
    (req, res, next) => {
        console.log("This is my second route handler!");
        res.send("Res 2!");
    }
);

# Middlewares
* The function that sends the response back is the "route handler"
* Rest of the functions are all "middelewares"
* So when a API call is made express actially checks for a matiching route, then goes through the 
middle ware chain until it meets a request handler that actually senda the response back to client
* Application of middleware - Auth

# Error handling
* Its always recommended to write in try catch block
* But we can also handle it in wild carrd route, always keep it towards the end

app.use("/", (error, req, res, next) => {
    if(error) {
        res.status(500).send("Something went wrong!")
    }
});