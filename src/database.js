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

const db = new PouchDB("http://admin:admin@localhost:5984/projectpain");
const security = db.security();

/***
 * returns the length of the database
 *
 */
export function lengthOfDatabase() {
    console.log("inn i funksjonen");
    let number = 0;
    db.allDocs({
        include_docs: true,
        attachments: true,
    }).then(function (result) {
        console.log(result);
        number = result.total_rows;
        number ++;
        console.log(" wow number " + number); // number blir en mer enn result.total_rows
        return "2222";
    }).catch(function (err) {
        console.log("wops there was an error");
        console.log(err);
    });
    console.log("Ut av funksjonen")
    return number;
}

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
    newDataBase.signUpAdmin(username, password, username);
    let secure = newDataBase.security();
    //secure.members.roles.add(username);
    //secure.admins.roles.add(username);
    secure.fetch().then(()=>{
        console.log("Inside fetch");
        secure.members.roles.add(username);
        secure.admins.roles.add(username);
        return secure.save();

    }).catch(e =>{
        console.error(e);
    });
    db.info();
    logIn(username,password);
}

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

/***
 * Logs user in with their correct database
 * Currently does not work
 * @param username
 * @param password
 */

export function logIn(username,password) {
    console.log("Login LInj1")
    db.logIn(username, password).then(function (batman) {
        console.log(batman)
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
            // response.userCtx.name is the current use
            console.log(response.userCtx.name + " is the user")
        }
    });
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
                console.log("createUser error")
                console.error(err)
            }
        }
        console.log(response);
    });
    hasAccess(username);
    console.log(db)
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
        console.error(err);
    });
    console.log(json);
    db.info();
    //num++;
}




