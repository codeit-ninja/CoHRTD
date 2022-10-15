import {node} from '../../.electron-vendors.cache.json';
import {join, resolve} from 'path';

const PACKAGE_ROOT = __dirname;

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  envDir: process.cwd(),
  resolve: {
    alias: {
      '/@/': join(PACKAGE_ROOT, 'src') + '/',
      'core': join(PACKAGE_ROOT, 'src') + '/core.ts',
      'contracts/': join(PACKAGE_ROOT, 'contracts') + '/',
      'App/Core/Exceptions/': join(PACKAGE_ROOT, 'src', 'exceptions') + '/',
      'config': join(PACKAGE_ROOT, 'config') + '/',
      'App/Core/Config':  resolve(PACKAGE_ROOT, '..', '..', 'types') + '/settings.d.ts' //'../../types/'
    },
  },
  build: {
    ssr: true,
    sourcemap: 'inline',
    target: `node${node}`,
    outDir: 'dist',
    assetsDir: '.',
    minify: process.env.MODE !== 'development',
    lib: {
      entry: 'src/index.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].cjs',
      },
    },
    emptyOutDir: true,
    reportCompressedSize: false,
  },
};

export default config;
