const express = require("express");
const router = express.Router();
const { userData, userSearch } = require("../controller/user");
const form = require("express-form");
const field = form.field;

router
    .get("/", userData.get)
    .get("/user/ajax", userSearch.ajax)
    .get("/search-user", userSearch.get)



router
    .post('/user',  
    form(
        field('name')
            .trim()
            .required(),
        field('salary')
            .trim()
            .required()
            .isInt(),
        field('name')
            .trim()
            .required()
            ,
    ), userData.post)

module.exports = router;