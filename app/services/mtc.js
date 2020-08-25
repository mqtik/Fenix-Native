global.Buffer = global.Buffer || require('buffer').Buffer

import PouchDB from '@craftzdog/pouchdb-core-react-native'
import HttpPouch from 'pouchdb-adapter-http'
import replication from '@craftzdog/pouchdb-replication-react-native'
import mapreduce from 'pouchdb-mapreduce'

import SQLite from 'react-native-sqlite-2'
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite'

import APIAuth from 'pouchdb-authentication'
import APIFind from 'pouchdb-find'
import APIUpsert from 'pouchdb-upsert'
import _ from 'lodash'
import Snackbar from 'react-native-snackbar';
import DBDebug from 'pouchdb-debug';


const SQLiteAdapter = SQLiteAdapterFactory(SQLite)

 PouchDB.plugin(HttpPouch)
 .plugin(replication)
 .plugin(mapreduce)
 .plugin(SQLiteAdapter)
 .plugin(APIAuth)
 .plugin(APIFind)
 .plugin(DBDebug)
 .plugin(APIUpsert);

export default PouchDB; 