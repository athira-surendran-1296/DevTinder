const express = require("express");

const app = express();

app.use("/hello/3", (req, res) => { // This route will never be entered
    res.send("Hello world 33333!!");
});

// These are Request handlers
app.use("/hello", (req, res) => {
    res.send("Hello world!!");
});

app.use("/hello/2", (req, res) => { // This route will never be entered
    res.send("Hello world 222222!!");
});

app.use("/dashboard", (req, res) => {
    res.send("This is dashboard!!");
});

app.get("/test", (req, res) => {
    res.send("Test GET working!");
});

app.post("/test", (req, res) => {
    res.send("Test POST working!");
});

// Advanced rounting

// Works in older versions

/*
app.get("/ab?c", (req, res) => { // b is optional //works for ac, abc
     res.send("Test ?");
});

app.get("/a(bc)?d", (req, res) => { // bc is optional //works for ad, abcd
     res.send("Test ?");
});

app.get("/ab+c", (req, res) => { //works for abc, abbbc, abbbbbbbbc, any number of b between ac
     res.send("Test ?");
});

app.get("/ab*cd", (req, res) => { //works for abcd, ab anything in between and ends with cd
     res.send("Test ?");
});

*/

// Regex

/*
app.get(/a/, (req, res) => { // works for /anything_containing-a /a, /can, /man
    res.send("Test reg ex 1?");
});
*/

app.get(/.*fly$/, (req, res) => { // works for /anything_ending_with-fly --> /fly, /sssfly
    res.send("Test reg ex 2?");
});

// http://localhost:7777/user/101/athu

// PARAMS [Object: null prototype] { userId: '1', name: 'athu' }

app.get("/user/:userId/:name", (req, res) => {
    console.log("PARAMS", req.params);
    res.send("GET user");
});


// http://localhost:7777/user?userId=101&name=Athu

// QUERYPARAMS [Object: null prototype] { userId: '101', name: 'Athu' }

/*
app.get("/user", (req, res) => {
    console.log("QUERYPARAMS", req.query);
    res.send("GET user");
});
*/

// Keeping the generic route at end

/*
app.use("/", (req, res) => {
    res.send("Welcome to Dev Tinder!!");
});
*/

app.listen("7777", () => {
    console.log("Server listening on port 7777...");
});