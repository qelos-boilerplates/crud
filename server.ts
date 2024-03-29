import {start} from '@qelos/plugin-play'
import './endpoints'

start({
  manifest: {
    description: 'Description for the entire app',
    appUrl: process.env.APP_URL || 'https://127.0.0.1:2040'
  },
  config: {
    port: Number(process.env.PORT || '2040'),
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'demo-secret',
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'refresh-token-secret',
    qelosUrl: process.env.QELOS_URL || 'http://127.0.0.1:3000',
    qelosUsername: process.env.QELOS_USER || 'test@test.com',
    qelosPassword: process.env.QELOS_PASSWORD || 'admin',
  },
});
