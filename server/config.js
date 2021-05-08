exports.PORT = process.env.PORT || 3001

exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production' 
  ? process.env.CLIENT_ORIGIN
  : 'http://localhost:3000'

// const dbName = 'sendEmail';
// const dbUser = 'dbuser';
// const dbPassword = 'dbpassword';

exports.DB_URL = process.env.NODE_ENV === 'production' 
  ? process.env.DB_URL 
  : 'mongodb://dbuser:dbpassword@localhost:27017/productsDB'


// db.createUser({user: "dbuser",pwd: "dbpassword",roles: [ { role: "dbOwner", db: "sendEmail" } ]});
