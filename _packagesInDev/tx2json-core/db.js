


import lowdb from 'lowdb'




export const initDB = ( 
	dbAdapter = "Memory", 
	args = {
		dbSource: null,
		defaults: { 
			tokens: testDatasets.tokens, 
			context: {}
		}
}) => {


  // LowDB initialization
  switch (dbAdapter) {

    case "Memory":
      var Memory = require('lowdb/adapters/Memory')
      dbAdapter = new Memory()
      break

    case "LocalStorage": // Browser
      var LocalStorage = require('lowdb/adapters/LocalStorage')
      dbAdapter = new LocalStorage( args.dbSource )
      break

    case "FileAsync": // Server-side
      var FileAsync = require('lowdb/adapters/FileAsync')
      dbAdapter = new FileAsync( args.dbSource )
      break
  
    default:
      break
  }


  var db = lowdb( dbAdapter )

  db.defaults( args.defaults ).write()


  return db
}