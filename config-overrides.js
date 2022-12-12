// const { override, fixBabelImports } = require('customize-cra');

//  module.exports = override(
//    fixBabelImports('import', {
//      libraryName: 'antd-mobile',
//      libraryDirectory: 'es',
//      style: 'css',
//    }),
//  );
const path = require('path');
const { override, fixBabelImports, addLessLoader, addWebpackAlias, adjustStyleLoaders, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { '@brand-primary': '#1cae82', '@brand-primary-tap': '#1DA57A' },
    }
  }),
  /** After update to the Create-React-App 5.1 
   * Ref: https://github.com/arackaf/customize-cra/issues/315 
   *  https://github.com/arackaf/customize-cra/issues/314 
   * less-loader breaking changes in update.
   * Ref: https://stackoverflow.com/questions/61686398/webpack-less-loader-javascriptenabled-error */
  adjustStyleLoaders(({ use: [, , postcss] }) => {
    const postcssOptions = postcss.options;
    postcss.options = { postcssOptions };
  }),
  /** Upgrade to Webpack 5. Images need a loader. */
  addWebpackModuleRule(
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/,
      use: ['url-loader'],
    }
  ),
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: true,
  }),
  addWebpackAlias({
    Components: path.resolve(__dirname, 'src/components/'),
    Containers: path.resolve(__dirname, 'src/containers/'),
  })
);