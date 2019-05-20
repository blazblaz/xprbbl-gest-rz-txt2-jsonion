import { Request, Response } from "express";
import * as cookie from "cookie";
/*


 request.cookies.auth



*/


import bcrypt from 'bcryptjs'; // hash passwords
import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import uid from 'uid-safe'

const db = new lowdb(new FileSync('db.json'))


const resolvers = {};


// To be replaced with backend services' inputs
db.defaults(
{ 
	users: [],
	sessions: [],
	uploads: []
}).write()

db.get('users')
  .push({userId: 1, username: "test", pwd: "lol"})
  .write()

db.get('sessions')
  .push({userId: 1, active: true})
  .write()


resolvers.isLogin = (args) => {
	return typeof db.get('sessions').find({ userId: 1 }).value() !== 'undefined'
}

resolvers.signup = (args) => {
	console.log(args.username);

  if (db.get('users').find({ username: args.username }).value()) {
    throw new Error('Another User with same username exists.');
  };

  db.get('users').push({
  	userId: uid.sync(10),
  	username: args.username,
    pwd: bcrypt.hashSync(args.pwd, 10),
  }).write();

	console.log(db.get('users').find({ username: args.username }).value());
  
  return true;
};

resolvers.getUploads = () => db.get('uploads').value();
resolvers.uploadSingleFile = (file) => processUpload(file);
resolvers.uploadMultipleFiles = (files) => Promise.all(files.map(processUpload));

resolvers.login = (args) => {
  const user = db.get('users').find({ username: args.username }).value();
  if (user) {
    if (bcrypt.compareSync(args.pwd, user.pwd)) {
      /*req.session.user = {
        ...user
      };*/
      return true;
    }

    throw new Error('Incorrect password.');
  }

  throw new Error('No Such User exists.');
}

export default resolvers;