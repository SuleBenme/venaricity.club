const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  jwtSecret: process.env.JWT_SECRET || "",
  mongoUri: '',
  stripe_connect_test_client_id: '',
  stripe_test_secret_key: '',
  stripe_test_api_key: ''
}

export default config