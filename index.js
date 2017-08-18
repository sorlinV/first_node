let fs = require('fs');
let mysql = require('mysql');
let http = require('http');
let url = require('url');

let con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "wqaxszcde123",
    database: "first_db"
});


http.createServer(function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.url.split('?')[0] === "/save") {
        let q = url.parse(req.url, true).query;
        fs.writeFile('pos/'+q.user, q.x + ':' + q.y, function(err) {
            if(err) {
                return console.log(err);
            }
        });
    } else if (req.url.split('?')[0] === "/aff") {
        let files = fs.readdirSync('pos/');
        let out = [];
        for (let file of files) {
            fs.readFile('pos/'+file, 'utf-8', function (err, data) {
                out.push({x: data.split(":")[0], y: data.split(":")[1]});
            });
        }
        console.log(JSON.stringify(out));
        res.write(JSON.stringify(out));
    } else {
        res.write(req.url + ' 404 NOT FOUND');
        res.end(); //end the response
    }
}).listen(8080); //the server object listens on port 8080