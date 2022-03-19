const path = require("path");
const inflection = require("inflection");

module.exports = {
  helpers: {
    path: path,
    dir: dir,
    importPath: (name, target, skipName = false) => {
      return path.relative(dir(name, skipName), target);
    },
    name: (name, lowFirstLetter = false) => {
      return inflection.camelize(path.basename(name), lowFirstLetter);
    },
  },
};

function dir(name, skipName = false, prefix = "src/modules") {
  if (skipName) {
    const result = path.normalize(path.join(prefix, `${path.dirname(name)}`));
    return result;
  } else {
    const result = path.normalize(
      path.join(
        prefix,
        `${path.dirname(name)}/${inflection.camelize(
          path.basename(name),
          true
        )}`
      )
    );
    return result;
  }
}
