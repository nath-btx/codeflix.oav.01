const fs = require('fs');
const path = require('path');

// Récupération du nom du fichier
const nomfichier = process.argv[2];


// Récupération du contenu du fichier
var post = fs.readFileSync(nomfichier,'utf8');


// path.extname me permet de savoir si c'est un .ini ou .env
// Pour .ini
if (path.extname(nomfichier) == ".ini"){
    parseIni(nomfichier);
}

// Pour .env
else {
    parseEnv(nomfichier);
}


// Création du fichier
const filename = "php."+ Date.now()+".json";
fs.writeFile(filename, post, () => {
    console.log(`File ${filename} successfully created!`);
  })

function parseEnv(filename)
{
    post = post.replace(/#.+[A-Z]/g, "");
    post = post.replace(/\S+=\S+/g, '"$&",');
    post = post.replace(/[=]/g, '" : "')
    post = post.replace(/(,)\s*$/g, "\n}");
    post = post.replace(/(.+)/, "{\n$1");
    return post
}

function parseIni(filename)
{
    const re = /(;.+)/g;
    const re2 = /(;)/g;



    post = post.replace(re,'');
    post = post.replace(re2,'');


    console.log(post);

}
