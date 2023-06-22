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
    },
  ],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env']
    }),
    terser(),
    // 拷贝类型文件
    copy({
      targets: [
        { src: 'src/index.d.ts', dest: 'dist/types' },
      ],
      verbose: true, // 可选配置，用于在控制台输出详细信息
    }),
  ],
};


