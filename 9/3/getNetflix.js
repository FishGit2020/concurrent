'use strict';

var http = require("https");

var options = {
        "method": "GET",
        "hostname": "unogs-unogs-v1.p.rapidapi.com",
        "port": null,
        "path": "/api.cgi",
    "headers": {
                "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
                "x-rapidapi-key": "1afa5fea80msh3f9e6e5dc391b2fp1ee8a7jsnd3e216b32a52",
                "useQueryString": true

    }

};

var req = http.request(options, function (res) {
        var chunks = [];

    res.on("data", function (chunk) {
                chunks.push(chunk);

    });

    res.on("end", function () {
                var body = Buffer.concat(chunks);
                console.log(body.toString());

    });

});

req.end();

