module.exports = {
  apps: [
    {
      name: 'MagicMockServer',
      script: 'node build/app.js',
      watch: true,
      env: {
        APP_ENV: 'prod'
      }
    }
  ]
};
