A script that help to export and import in Cloud Firestore

# Requirements

You need [NODE](https://nodejs.org/en/download/) or something that can run JAVASCRIPT (JS) file.

Get **serviceAccount** JSON file from *Project Setting > SERVICE ACCOUNTS* in Firebase Console

Change the *databaseURL* when initializeApp with your own

# Setting Up

Download or clone this repository

```
git clone https://github.com/dalenguyen/firestore-import-export.git
```

Install NPM packages

```
npm install
```

# Export database from Firestore

This will help you create a backup of your collection from Firestore to a JSON file name **firestore-export.json**

```
node export.js <your-collection-name>
```

# Import database to Firestore

This will import one collection to Firestore and it will overwrite your current collection if there is a collection with that name in your Firestore

```
node import.js import-to-firestore.json
```

*If you have any recommendation or question, please create an issue. Thanks,*
