var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');
module.exports = {
  development: {
    db: 'mongodb://root:volvo76@ds039078.mongolab.com:39078/ntwitter',
    root: rootPath,
    app: {
      name: 'Node Twitter'
    },
    facebook: {
      clientID: "680920985255957",
      clientSecret: "2d5c19f6b02432195afa3ab01b36d405",
      callbackURL: "http://ntwitter.nodejitsu.com/auth/facebook/callback"
    },
    github: {
      clientID: '6396a71f53863e556b11',
      clientSecret: '6396a71f53863e556b11',
      callbackURL: 'http://ntwitter.nodejitsu.com/auth/github/callback'
    }
  },
  test: {
    db: 'mongodb://root:volvo76@ds039078.mongolab.com:39078/ntwitter',
    root: rootPath,
    app: {
      name: 'Nodejs Express Mongoose Demo'
    },
    facebook: {
      clientID: "680920985255957",
      clientSecret: "2d5c19f6b02432195afa3ab01b36d405",
      callbackURL: "http://ntwitter.nodejitsu.com/auth/facebook/callback"
    },
    github: {
      clientID: '6396a71f53863e556b11',
      clientSecret: '6396a71f53863e556b11',
      callbackURL: 'http://ntwitter.nodejitsu.com/auth/github/callback'
    }
  },
  production: {
    db: 'mongodb://root:volvo76@ds039078.mongolab.com:39078/ntwitter',
    root: rootPath,
    app: {
      name: 'Nodejs Express Mongoose Demo'
    },
    facebook: {
      clientID: "680920985255957",
      clientSecret: "2d5c19f6b02432195afa3ab01b36d405",
      callbackURL: "http://ntwitter.nodejitsu.com/auth/facebook/callback"
    },
    github: {
      clientID: '6396a71f53863e556b11',
      clientSecret: '6396a71f53863e556b11',
      callbackURL: 'http://ntwitter.nodejitsu.com/auth/github/callback'
    }
  }
};
