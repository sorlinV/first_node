let fs = require('fs');

fs.writeFile('toto.txt', 'Salut Toto !', function(err) {
    if (err) {
        return console.log(err);
    }
});

let files = fs.readdirSync(__dirname);
console.log('synchrone : \n');
for (let file of files) {
    console.log(file);
}

fs.readdir(__dirname, function(err, files) {
    if (err) {
        return console.log(err);
    }
    console.log('\nasynchrone : \n');
    for (let file of files) {
        console.log(file);
    }
})