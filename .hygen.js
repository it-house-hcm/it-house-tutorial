const path = require("path");
const inflection = require("inflection");

module.exports = {
  helpers: {
    path: path,
    dir: dir,
    importPath: (name, target) => {
      return path.relative(dir(name), target);
    },
    name: (name, lowFirstLetter = false) => {
      return inflection.camelize(path.basename(name), lowFirstLetter);
    },
  },
};

function dir(name, prefix = "src/modules") {
  const result = path.normalize(
    path.join(
      prefix,
      `${path.dirname(name)}/${inflection.camelize(path.basename(name), true)}`
    )
  );
  return result;
}
