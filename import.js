var admin = require("firebase-admin");
var fs = require('fs');
var serviceAccount = require("./serviceAccountKey.json");

var fileName = process.argv[2];

// You should replae databaseURL with your own
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ionic-firestore-dn.firebaseio.com"
});

var db = admin.firestore();

var collectionName = '';


fs.readFile(fileName, 'utf8', function(err, data){
  if(err){
    return console.log(err);
  }

  // Turn string from file to an Array
  dataArray = JSON.parse(data);

  for(var index in dataArray){
    collectionName = index;
    for(var doc in dataArray[index]){
      if(dataArray[index].hasOwnProperty(doc)){
        db.collection(collectionName).doc(doc)
        .set(dataArray[index][doc])
        .then(() => {
          console.log('Document is successed adding to firestore!');
        })
        .catch(error => {
          console.log(error);
        });
      }
    }
  }

})
