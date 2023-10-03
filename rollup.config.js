import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/index.mjs',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',
    },
    {
      file: 'dist/index.js',
      format: 'esm',
      // sourcemap: true,
    },
  ],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
    }),
    terser(),
    copy({
      targets: [
        { src: 'src/index.d.ts', dest: 'dist/types' },
      ],
      verbose: true, // 可选配置，用于在控制台输出详细信息
    }),
  ],
};


