var admin = require("firebase-admin");
var fs = require('fs');
var serviceAccount = require("./serviceAccountKey.json");

var collectionName = process.argv[2];

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ionic-firestore-dn.firebaseio.com"
});

var db = admin.firestore();

var data = {};
data[collectionName] = {};

var results = db.collection(collectionName)
.get()
.then(snapshot => {
  snapshot.forEach(doc => {
    data[collectionName][doc.id] = doc.data();
  })
  return data;
})
.catch(error => {
  console.log(error);
})

results.then(dt => {
  // Write collection to JSON file
  fs.writeFile("firestore-export.json", JSON.stringify(dt), function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  });
})
