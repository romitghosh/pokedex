const fs = require('fs');
const path = require('path');
const https = require('https');

// Ensure directories exist
const publicDir = path.join(__dirname, '..', 'public');
const assetsDir = path.join(publicDir, 'assets');
const typesDir = path.join(assetsDir, 'types');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir);
}
if (!fs.existsSync(typesDir)) {
  fs.mkdirSync(typesDir);
}

// List of Pokémon types
const types = [
  'bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting',
  'fire', 'flying', 'ghost', 'grass', 'ground', 'ice',
  'normal', 'poison', 'psychic', 'rock', 'steel', 'water'
];

// URLs for type icons (replace with actual URLs)
const typeIconUrls = {
  bug: 'https://archives.bulbagarden.net/media/upload/9/9c/Bug_icon_SwSh.png',
  dark: 'https://archives.bulbagarden.net/media/upload/d/d5/Dark_icon_SwSh.png',
  dragon: 'https://archives.bulbagarden.net/media/upload/7/70/Dragon_icon_SwSh.png',
  electric: 'https://archives.bulbagarden.net/media/upload/7/7b/Electric_icon_SwSh.png',
  fairy: 'https://archives.bulbagarden.net/media/upload/c/c6/Fairy_icon_SwSh.png',
  fighting: 'https://archives.bulbagarden.net/media/upload/3/3b/Fighting_icon_SwSh.png',
  fire: 'https://archives.bulbagarden.net/media/upload/a/ab/Fire_icon_SwSh.png',
  flying: 'https://archives.bulbagarden.net/media/upload/b/b5/Flying_icon_SwSh.png',
  ghost: 'https://archives.bulbagarden.net/media/upload/0/01/Ghost_icon_SwSh.png',
  grass: 'https://archives.bulbagarden.net/media/upload/a/a8/Grass_icon_SwSh.png',
  ground: 'https://archives.bulbagarden.net/media/upload/2/27/Ground_icon_SwSh.png',
  ice: 'https://archives.bulbagarden.net/media/upload/1/15/Ice_icon_SwSh.png',
  normal: 'https://archives.bulbagarden.net/media/upload/9/95/Normal_icon_SwSh.png',
  poison: 'https://archives.bulbagarden.net/media/upload/8/8d/Poison_icon_SwSh.png',
  psychic: 'https://archives.bulbagarden.net/media/upload/7/73/Psychic_icon_SwSh.png',
  rock: 'https://archives.bulbagarden.net/media/upload/1/11/Rock_icon_SwSh.png',
  steel: 'https://archives.bulbagarden.net/media/upload/0/09/Steel_icon_SwSh.png',
  water: 'https://archives.bulbagarden.net/media/upload/8/80/Water_icon_SwSh.png'
};

// Download function
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filepath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download ${url}, status code: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file if there's an error
      reject(err);
    });
  });
};

// Download all type icons
async function downloadAllTypeIcons() {
  console.log('Downloading type icons...');
  
  for (const type of types) {
    if (typeIconUrls[type]) {
      const filepath = path.join(typesDir, `${type}.png`);
      try {
        await downloadImage(typeIconUrls[type], filepath);
        console.log(`Downloaded ${type} icon`);
      } catch (error) {
        console.error(`Error downloading ${type} icon:`, error);
      }
    }
  }
  
  console.log('Finished downloading type icons');
}

downloadAllTypeIcons();
