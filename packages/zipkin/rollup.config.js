import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import {terser} from 'rollup-plugin-terser';
import autoExternal from 'rollup-plugin-auto-external';

const basePlugins = [
  commonjs(),
  babel({
    exclude: 'node_modules/**',
    extensions: ['.js', '.ts'],
  }),
  resolve(),
  autoExternal(),
];

export default [
  // CommonJS
  {
    input: 'src/index.ts',
    output: {file: 'lib/index.js', format: 'cjs'},
    plugins: basePlugins,
  },

  // ES
  {
    input: 'src/index.ts',
    output: {file: 'es/index.js', format: 'es'},
    plugins: basePlugins,
  },

  // UMD Development
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/zipkin.js',
      format: 'umd',
      name: 'Zipkin',
    },
    plugins: basePlugins.concat([
      replace({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ]),
  },

  // UMD Production
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/zipkin.min.js',
      format: 'umd',
      name: 'Zipkin',
    },
    plugins: basePlugins.concat([
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ]),
  }
];
