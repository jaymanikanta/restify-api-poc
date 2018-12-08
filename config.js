// All the configuration required for the app
module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL: process.env.BASE_URL || 'http://localhost:3000',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://abc123!#:asdf1234@ds215370.mlab.com:15370/restify_api'
}