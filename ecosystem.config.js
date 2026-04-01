module.exports = {
  apps: [
    {
      name: 'asra3',
      script: '.next/standalone/server.js',
      cwd: '/www/wwwroot/asra3.com',
      env: {
        NODE_ENV: 'production',
        PORT: 3008,
        DATABASE_URL: 'file:/www/wwwroot/asra3.com/db/custom.db',
        UPLOADS_DIR: '/www/wwwroot/asra3.com/public/uploads',
      },
      // Auto-restart if crashes
      autorestart: true,
      max_restarts: 10,
      restart_delay: 3000,
      // Logging
      out_file: '/root/.pm2/logs/asra3-out.log',
      error_file: '/root/.pm2/logs/asra3-error.log',
      merge_logs: true,
    },
  ],
};
