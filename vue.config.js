module.exports = {
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'src/background/main.ts',
      rendererProcessFile: 'src/main.ts',
    },
  },
}