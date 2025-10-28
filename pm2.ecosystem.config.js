module.exports = {
  apps: [
    {
      name: 'dooper-server',
      script: './index.js',
      cwd: '/var/www/dooper/server',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
