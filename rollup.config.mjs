import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import packageJson from './package.json' assert { type: 'json' }

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [resolve(), typescript(), terser()],
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'three',
    '@react-three/drei',
    '@react-three/fiber',
  ],
  onwarn(warning, warn) {
    // skip `EVAL` warnings related to Chevrotain
    // https://github.com/Chevrotain/chevrotain/issues/1760
    if (warning.code === 'EVAL' && warning.id?.includes('chevrotain')) return

    // skip `CIRCULAR_DEPENDENCY` warnings related to Chevrotain
    if (
      warning.code === 'CIRCULAR_DEPENDENCY' &&
      warning.message?.includes('chevrotain')
    )
      return

    console.dir(warning)

    // Use default behavior for everything else
    warn(warning)
  },
}
