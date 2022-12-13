// const { override, fixBabelImports } = require('customize-cra');

//  module.exports = override(
//    fixBabelImports('import', {
//      libraryName: 'antd-mobile',
//      libraryDirectory: 'es',
//      style: 'css',
//    }),
//  );
const path = require('path');
const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra');

module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@brand-primary': '#1cae82', '@brand-primary-tap': '#1DA57A' },
  }),
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