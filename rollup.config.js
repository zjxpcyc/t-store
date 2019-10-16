export default {
  input: './src/index',
  output: [
    {
      file: './dist/index.es.js',
      format: 'es'
    },
    {
      file: './dist/index.js',
      format: 'umd',
      name: 'TStore'
    },
  ]
}
