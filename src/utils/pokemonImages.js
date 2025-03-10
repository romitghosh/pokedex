const fetchImages = (context) => {
  const images = {};
  const cache = {};
  function importAll(r) {
    r.keys().forEach((key) => (cache[key] = r(key)));
  }
  importAll(context);
  Object.entries(cache).forEach((module) => {
    let key = module[0].split("");
    key.splice(0, 2);
    key.splice(-4, 4);
    images[[key.join("")]] = module[1];
  });
  return images;
};

const images = fetchImages(
  require.context("../assets/pokemons/shiny", false, /\.(png|jpe?g|svg)$/)
);
const defaultImages = fetchImages(
  require.context("../assets/pokemons/default", false, /\.(png|jpe?g|svg)$/)
);

export { images, defaultImages };
