"use strict";
exports.__esModule = true;
var yargs = require("yargs");
var axios_1 = require("axios");
var argv = yargs.option({
    url: {
        description: "Url to search in",
        "default": "https://anatta.io"
    },
    words: {
        description: "Enter words to search for",
        demand: true,
        type: 'string'
    }
}).parseSync();
console.log(argv.words);
var AxiosInstance = axios_1["default"].create(); // Create a new Axios Instance
// Send an async HTTP Get request to the url
AxiosInstance.get(argv.url)
    .then(// Once we have data returned ...
function (// Once we have data returned ...
response) {
    var html = response.data; // Get the HTML from the HTTP request
    //   html = html.replace(/<script(.*)>(.*)<\/script>/g, '')
    //   html = html.replace(/<style(.*)>((.|\n)*)<\/style>/g, '')
    html = html.replace(/<[^>]+>/g, '');
    //   console.log(html);
    //   let count = (html.match(/is/g) || []).length;
    var words = argv.words.split(",");
    words.forEach(function (w) {
        var re = new RegExp(w, "ig");
        // const count = [...html].filter(x => x === w).length;
        var count = (html.match(re) || []).length;
        console.log(w + ': ' + count);
    });
    //   console.log(words)
})["catch"](console.error); // Error handling
