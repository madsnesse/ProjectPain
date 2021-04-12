import '@babel/polyfill'
import 'mutationobserver-shim'
import './plugins/bootstrap-vue'
import PouchDB from 'pouchdb-browser'
import PouchFind from 'pouchdb-find'
import PouchLiveFind from 'pouchdb-live-find'

PouchDB.plugin(require('pouchdb-users'))
PouchDB.plugin(PouchFind);
PouchDB.plugin(PouchLiveFind);
PouchDB.plugin(require('pouchdb-authentication'));

// TODO: Implement comment underneath to allow "access" for users to their db
//"http://" + name + ":" + password + "@localhost:5984/" + "dbName"

let mainDB = new PouchDB('http://localhost:5984/')

let db = new PouchDB('http://admin:admin@localhost:5984/projectpain');

/*
export function createNewDB(dbName) {
    var req = new XMLHttpRequest();
    req.open("PUT", db + "/" + dbName,true)
    req.setRequestHeader("Content-Type","application/json")
    console.log("CreatedDB")
}
 */

export function createUser(username,password,dbName) {
    mainDB.put('http://' + username + ':' + password +'@localhost:5984/'+ dbName)
    db = 'http://' + username + ':' + password +'@localhost:5984/'+ dbName;
    console.log(db);
}

export function saveToDB(json){
    db.post(JSON.parse(json), function (err){
        if (err){
            return console.log(err)
        }else{
            console.log("Document saved Successfuly")
        }
    });
    console.log(json)
    db.info(function (err,info) {
        if (err) {
            return console.log(err)
        } else {
            console.log(info)
        }
    })

}




