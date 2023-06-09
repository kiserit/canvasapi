import terser from "@rollup/plugin-terser";
import pluginCommonjs from "@rollup/plugin-commonjs";
import pluginNodeResolve from "@rollup/plugin-node-resolve";
//import pluginTypescript from "@rollup/plugin-typescript";
//import { babel } from "@rollup/plugin-babel";
//import * as path from "path";
import pkg from "./package.json";

const moduleName = pkg.name.replace(/^@.*\//, "");
const author = pkg.author;
const banner = `
  /**
   * @license
   * author: ${author}
   * ${moduleName}.js v${pkg.version}
   * Released under the ${pkg.license} license.
   */
`;

export default [
  {
    input: "src/target-browser.js",
    output: [
      {
        name: moduleName,
        file: pkg.browser,
        format: "iife",
        sourcemap: false, //"inline"
        banner,
      },
      {
        name: moduleName,
        file: pkg.browser.replace(".js", ".min.js"),
        format: "iife",
        sourcemap: false, //"inline"
        banner,
        plugins: [terser()],
      },
    ],
    plugins: [
      //pluginTypescript(),
      pluginCommonjs({
        extensions: [".js", ".ts"],
      }),
      /*babel({
        babelHelpers: "bundled",
        configFile: path.resolve(__dirname, ".babelrc.js"),
      }),*/
      pluginNodeResolve({
        browser: true,
      }),
    ],
  },

  // ES
  {
    input: "src/target-module.js",
    output: [
      {
        file: pkg.module,
        format: "es",
        sourcemap: false, //"inline"
        banner,
        exports: "default",
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
    ],
    plugins: [
      //pluginTypescript(),
      pluginCommonjs({
        extensions: [".js", ".ts"],
      }),
      /*babel({
        babelHelpers: "bundled",
        configFile: path.resolve(__dirname, ".babelrc.js"),
      }),*/
      pluginNodeResolve({
        browser: false,
      }),
    ],
  },

  // CommonJS
  {
    input: "src/target-main.js",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: false, //"inline"
        banner,
        exports: "default",
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
    ],
    plugins: [
      //pluginTypescript(),
      pluginCommonjs({
        extensions: [".js", ".ts"],
      }),
      /*babel({
        babelHelpers: "bundled",
        configFile: path.resolve(__dirname, ".babelrc.js"),
      }),*/
      pluginNodeResolve({
        browser: false,
      }),
    ],
  },
  
];