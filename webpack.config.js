module.exports = {
  entry: {
    main: './src/Interpreter.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: 'ts-loader' }],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  target: 'node',
  output: {
    libraryTarget: 'umd',
  },
  devtool: 'source-map',
};
