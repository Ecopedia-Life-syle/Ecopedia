const express = require('express');
const router = express.Router();
const authRouter = require("./auth");
const carbonRoutes = require("./carbon");
// const productsRouter = require("./products");


const defaultRoute = [
{
    path:"/auth",
    router:authRouter, 

},
{
    path:"/carbon",
    router:carbonRoutes,   
},
// {
//     path:"/profile",
//     router:profileRouter,
// }
];

defaultRoute.forEach((route) => {
    router.use(route.path, route.router);
});


module.exports = router;