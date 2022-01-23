// import fs from 'fs';

// /**
//  * Returns an sorted by time array of a user's tasks
//  * Requires the userId to be present in users.json
//  */
// export function getUserTasks(userId) {
//   var usersPath = 'database/users.json'; 
//   var usersRead = fs.readFileSync(usersPath); 
//   var users = JSON.parse(usersRead); 
//   var tasks = users[userId]; 
//   tasks.sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()); 
//   return tasks; 
// }

/**
 * @param {string} url - url to ubc ssc course section page
 * @param {int} maxCalls - max number of calls
 * @returns {array} [course title, remaining seats]
 */
// import { createRequire } from "module"; 
// const require = createRequire(import.meta.url); 
// import { initializeApp, cert } from 'firebase-admin/app';
// import { getFirestore, QuerySnapshot } from "firebase-admin/firestore"; 
// const serviceAccount = require("./kare-bear-firebase-adminsdk-5cqfu-188f66f65b.json"); 
// const myApp = initializeApp({
//     credential: cert(serviceAccount)
// });
// const db = getFirestore(); 
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore";
const serviceAccount = require("./kare-bear-firebase-adminsdk-5cqfu-188f66f65b.json");
if (getApps().length < 1) {
  initializeApp({
    credential: cert(serviceAccount)
  });
}
const db = getFirestore();

export function getUserTasks(userId) {
  return new Promise((resolve, reject) => {
    var tasks = []; 
    // console.log(userId); 
    db.collection("discordUsers").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            // console.log("cool data: ", doc.data()); 
            if (doc.id == userId) {              
              tasks = doc.data().tasks; 
            }
        });
        tasks.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
        // console.log("sheeeesh tasks: ", tasks); 
        resolve(tasks); 
    });    

    // var docRef = db.collection("discordUsers");
    // docRef.get().then((doc) => {
    //   console.log(doc);
    //   if (doc.exists) {
    //     var tasks = doc.data().tasks;
        
    //     resolve(tasks);
    //   } else {
    //     console.log("No such document with list");
    //     reject("No such document");
    //   }
    // }).catch((error) => {
    //   console.log("Error getting document:", error);
    //   reject("Error getting document:", error);
    // }); 
  });
}