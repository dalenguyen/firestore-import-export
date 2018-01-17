A script that help to export and import in Cloud Firestore

# Requirements

You need [NODE](https://nodejs.org/en/download/) or something that can run JAVASCRIPT (JS) file.

Get **serviceAccount** JSON file from *Project Setting > SERVICE ACCOUNTS* in Firebase Console

# Export database from Firestore

This will help you create a backup of your collection from Firestore to a JSON file name **firestore-export.json** 

```
node export.js <your-collection-name>
```

# Import database to Firestore
