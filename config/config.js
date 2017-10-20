const path = require("path");
const rootPath = path.normalize(__dirname + "/..");
const DB = process.env.DB;
const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;


module.exports = {
  development: {
    db: "mongodb://localhost/ntwitter",
    root: rootPath,
    app: {
      name: "Node Twitter"
    },
    github: {
      clientID: "e3930cf94c772ba10ef1",
      clientSecret: "fb1284b1874444a9c0c55c963092f836596ecc56",
      callbackURL: "http://localhost:3000/auth/github/callback"
    }
  },
  test: {
    db: "mongodb://root:volvo76@ds039078.mongolab.com:39078/ntwitter",
    root: rootPath,
    app: {
      name: "Nodejs Express Mongoose Demo"
    },
    github: {
      clientID: "c2e0f478634366e1289d",
      clientSecret: "0bfde82383deeb99b28d0f6a9eac001a0deb798a",
      callbackURL: "http://localhost:3000/auth/github/callback"
    }
  },
  production: {
    db: DB,
    root: rootPath,
    app: {
      name: "Nodejs Express Mongoose Demo"
    },
    github: {
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: "http://nitter.herokuapp.com/auth/github/callback"
    }
  }
};
