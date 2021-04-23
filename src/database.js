import '@babel/polyfill'
import 'mutationobserver-shim'
import './plugins/bootstrap-vue'
import PouchDB from 'pouchdb'
import PouchFind from 'pouchdb-find'
import PouchLiveFind from 'pouchdb-live-find'
import PouchDBAuthentication from 'pouchdb-authentication';

import "./main"
PouchDB.plugin(require('pouchdb-users'))
PouchDB.plugin(PouchFind);
PouchDB.plugin(PouchLiveFind);
PouchDB.plugin(PouchDBAuthentication);

var db = new PouchDB("http://admin:admin@localhost:5984/projectpain");

// TODO: Implement comment underneath to allow "access" for users to their db
//"http://" + name + ":" + password + "@localhost:5984/" + "dbName"

/***
 * returns the length of the database
 *
 */
export function lengthOfDatabase() {
    console.log("inn i funksjonen")
    db.allDocs({
        include_docs: true,
        attachments: true,
    }).then(function (result) {
        console.log(result);
        var number = result.total_rows;
        number ++;
        console.log(" wow number " + number); // number blir en mer enn result.total_rows
        return "2222";
    }).catch(function (err) {
        console.log("wops there was an error")
        console.log(err)
    });
}

/***
 * creates a new database with server admin
 * @param dbName - database name
 */
export function createDataBase(dbName){
    let database = "http://admin:admin@localhost:5984/";
    database = database + dbName.toString();
    console.log('dbName: ' + dbName)
    console.log(database);
    var db = new PouchDB(database);
    db.info();
}

/***
 * Logs user in with their correct database
 * Currently does not work
 * @param username
 * @param password
 */

export function logIn() {
    //this.$pouch.connect(username,password);
    console.log("Denne er her")
}

/***
 * Gives all data from database
 */

// needs to be improved
export function getAllDataFromDB(){
    db.allDocs({
        include_docs: true,
        attachments: true
    }).then( function (result) {
        //handle result, need to return
        console.log(result);
        return result;
    }).catch(function (err){
        console.log(err);
        }
    )
}

/***
 * "deletes" object from database
 * should set _deleted: true
 * currently does not work
 * @param json - document that will be removed
 */

export function removeFromDB(json){
    db.get(json).then( function (doc) {
        db.remove(doc);
    }).then( function (result) {
        //handle result
        console.log(result)
    }).catch( function (err) {
        console.log(err);
    })
}

/***
 * creates a new user and gives that user a database
 * currently does not work
 * @param username - gives new user username
 * @param password -
 * @param dbName - creates a new database named after username
 */
export function createUser(username,password,dbName) {
    this.$pouch.info()
    //createDataBase(username);
    console.log("wow much fun");
    this.$pouch.createUser(username,password,dbName);
    console.log("wow much fun 2");
    this.$pouch.connect(username,password, dbName);
    createDataBase(dbName);
}
/*
Try to use "this.$pouch.put" when using vue.use

Otherwise use db.use
 */

/***
 * Saves to the database with .post which gives random _id and _rev to document
 * @param json - includes all pain information
 */
export function saveToDB(json) {
    //var id = (new Date().getTime())
    db.put(JSON.parse(json)).then(function (response) {
        //handle respons
        console.log("SaveToDB Response")
        console.log(response)
    }).catch(function (err) {
        console.log(err);
    });
    console.log(json);
    db.info();
    //num++;
}




