const admin = require("firebase-admin");
const fs = require('fs');
const serviceAccount = require("./serviceAccountKey.json");

const fileName = process.argv[2];

let dateArray;

if(process.argv[3]) {
  dateArray = process.argv[3].split(',');
}

// You should replae databaseURL with your own
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ionic-firestore-dn.firebaseio.com"
});

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

fs.readFile(fileName, 'utf8', function(err, data){
  if(err){
    return console.log(err);
  }

  // Turn string from file to an Array
  dataArray = JSON.parse(data);

  udpateCollection(dataArray);

})

async function udpateCollection(dataArray){
  for(const index in dataArray){
    const collectionName = index;
    for(const doc in dataArray[index]){
      if(dataArray[index].hasOwnProperty(doc)){
        await startUpading(collectionName, doc, dataArray[index][doc]);
      }
    }
  }
}

function startUpading(collectionName, doc, data){
  // convert date from unixtimestamp  
  let parameterValid = true;

  if(typeof dateArray !== 'undefined') {        
    dateArray.map(date => {      
      if (data.hasOwnProperty(date)) {
        data[date] = new Date(data[date]._seconds * 1000);
      } else {
        console.log('Please check your date parameters!!!', dateArray);
        parameterValid = false;
      }     
    });    
  }
  
  if(parameterValid) {
    return new Promise(resolve => {
      db.collection(collectionName).doc(doc)
      .set(data)
      .then(() => {
        console.log(`${doc} is imported successfully to firestore!`);
        resolve('Data wrote!');
      })
      .catch(error => {
        console.log(error);
      });
    });
  } else {
    console.log(`${doc} is not imported to firestore. Please check your parameters!`);    
  }

}
