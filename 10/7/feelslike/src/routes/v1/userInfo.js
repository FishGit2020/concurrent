'use strict';

export const saveInfo = (req, res) => {
    console.log("This is saveUserInfo");
    res.send("Hi");
};

export const getInfo = (req, res) => {
    console.log("This is getInfo");
    res.send("Hi");
};

export const getAll = (req, res) => {
    console.log("This is getAll");
    res.send("Hi");
};

export const cacheUser = (req, res, next) => {
    console.log("This is cacheUserInfo");
    // res.send("Hi");
    next();
};
