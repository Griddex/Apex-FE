const { ESLINT_MODES } = require("@craco/craco");

module.exports = {
  eslint: {
    mode: ESLINT_MODES.extends,
  },
  jest: {
    babel: {
      addPresets: true /* (default value) */,
      addPlugins: true /* (default value) */,
    },
    configure: {
      /* Any Jest configuration options: https://jestjs.io/docs/en/configuration. */
    },
    configure: (jestConfig, { env, paths, resolve, rootDir }) => {
      return jestConfig;
    },
  },
};
