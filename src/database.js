import '@babel/polyfill'
import 'mutationobserver-shim'
import './plugins/bootstrap-vue'
import PouchDB from 'pouchdb'
import PouchFind from 'pouchdb-find'
import PouchLiveFind from 'pouchdb-live-find'
import PouchDBAuthentication from 'pouchdb-authentication';

import "./main"
PouchDB.plugin(require('pouchdb-users'));
PouchDB.plugin(PouchFind);
PouchDB.plugin(PouchLiveFind);
PouchDB.plugin(PouchDBAuthentication);
PouchDB.plugin(require("pouchdb-security-helper"));

//var dbName = "http://localhost:5984/";
//var db = new PouchDB(dbName);
const db = new PouchDB("http://admin:admin@localhost:5984/projectpain");
const security = db.security();

/***
 * Thanks alot to pouchdb-community for login and security code
 * https://github.com/pouchdb-community/pouchdb-authentication/blob/master/docs/api.md#dbsignupadminusername-password--options--callback
 *
 * Thank you to tyler-johnson for pouchdb-security-helper for admin creations on new databases
 * https://github.com/tyler-johnson/pouchdb-security-helper
 *
 */


/***
 * Saves to the database with .put which gives time in milliseconds as _id
 * @param json - includes all pain information
 */
export function saveToDB(json) {
    db.put(JSON.parse(json)).then(function (response) {
        //handle response
        console.log("SaveToDB Response")
        console.log(response)
    }).catch(function (err) {
        console.error(err);
    });
    console.log(json);
    db.info();
}

/***
 * checks if user has access to the database
 * @param username - user
 */

export function hasAccess(username){
    const user = { name: username, roles: [ "admin" ] };
    security.fetch().then(() => {
        if (!security.userHasAccess(user)) {
            throw new Error("User does not have access.");
        }
    }).catch(e => {
        console.log(e);
    });
}

// This point and below need to be checked and fixed, create user errors and login errors, and connecting to DB errors
 /***
 * creates a new database with server admin
 * @param dbName - database name
 */

export function createDataBase(username, password){
    let database = "http://admin:admin@localhost:5984/";
    database = database + username.toString();
    console.log('dbName: ' + username);
    console.log(database);
    let newDataBase = new PouchDB(database);
    newDataBase.signUpAdmin(username, password, username)
    let secure = newDataBase.security();
    secure.fetch().then(()=>{
        console.log("Inside fetch");
        secure.members.roles.add(username);
        secure.admins.roles.add(username);
        return secure.save();
    }).catch(e =>{
        console.error(e);
    });
    db.info();
    //dbName += username
}


/***
 * Logs user in with their correct database
 * Currently does "not?" work
 * @param username
 * @param password
 */

export function logIn(username,password) {
    console.log("Login LInj1")
    db.logIn(username, password).then(function (batman) {
        console.log(batman);
        console.log("Logged in");
    }).catch(function (err) {
        console.log("logInError")
        console.error(err);
    });
    console.log("Login linje2")
    db.getSession(function (err, response) {
        if (err) {
            // network error
        } else if (!response.userCtx.name) {
            // nobody's logged in
        } else {
            // response.userCtx.name is the current user
            console.log(response.userCtx.name + " is the user")
        }
    });
    hasAccess(username);
    console.log("this is the db: " + db)

}

/***
 * Gives all data from database
 * To be implemented and tested
 */

export function getAllDataFromDB(){
    db.allDocs({
        include_docs: true,
        attachments: true
    }).then( function (result) {
        //handle result, need to return
        console.log(result);
        return result;
    }).catch(function (err){
        console.error(err);
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
        console.error(err);
    })
}

/***
 * creates a new user and gives that user a database
 * @param username - gives new user username
 * @param password -
 */
export function createUser(username,password) {
    createDataBase(username, password, username);
    db.signUp(username,password, function (err, response){
        if (err){
            if (err.name == 'conflict'){
                console.log(username + " already exists, choose another")
            } else if (err.name == 'forbidden'){
                console.log(username + " is invalid, choose another")
            }else{
                console.log("createUser error");
                console.error(err)
            }
        }
        console.log(response);
    });
    console.log(db);
    logIn(username,password);
}






