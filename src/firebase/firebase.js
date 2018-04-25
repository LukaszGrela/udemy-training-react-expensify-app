import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };




// // child_remove
// database.ref('expenses').on('child_removed', (snapshot) => {
//   console.log('removed', snapshot.key, snapshot.val())
// });
// // child_remove
// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log('changed', snapshot.key, snapshot.val())
// });
// // child_added - also called for existing data
// database.ref('expenses').on('child_added', (snapshot) => {
//   console.log('added', snapshot.key, snapshot.val())
// });

// database.ref().set({
//   name: 'Lukasz G. Hardy',
//   age: 39,
//   location: {
//     city: 'Southampton',
//     country: 'United Kingdom'
//   }
// }).then(() => console.log('Saved'))
// .catch(e => console.error(e));

// Create

// // database.ref().set('data');

// // database.ref('age').set(27);

// database.ref('attributes').set({
//   height: '182cm',
//   weight: '62.5kg'
// }).then(() => console.log('Saved'))
// .catch(e => console.error(e));

// Remove
// database.ref('age').remove()
// .then(() => console.log('Removed'))
//   .catch(e => console.error('Not Removed', e));

// UPDATE

// database.ref().update({
//   name: 'Jan Hardy',
//   age: 32
// })
//   .then(() => console.log('Updated'))
//   .catch(e => console.error(e));

// subscription reference to be used later int he 'off' unsubscribe (cancel) method
// const onValueChange = database.ref().on('value', (snapshot) => {
//   const val = snapshot.val();
//   const {age, job, name} = val;
//   console.log(`${name} works as ${job}`);
// }, (e) => {
//   console.log(e);
// });


// const notes = [{
//   id: '12',
//   title: 'First Note',
//   body: 'This is my note'
// },
// {
//   id: 'aa12',
//   title: 'Another Note',
//   body: 'This is my note'
// }];

// database.ref('notes').set(notes);// saves array as indexed object so [a,b,c] => {'0':a,'1':b,'2':c}

// const firebaseNotes = {
//   notes: {
//     'my_unique_id': {
//       title: 'First Note',
//       body: 'This is my note'
//     },
//     'another_unique_id':{
//       title: 'Another Note',
//       body: 'This is my note'
//     }
//   }
// };

// database.ref('notes').push({
//   title:'To Do',
//   body: 'Gain experience with React'
// }).then(({key, path})=>console.log(key, path));

// // U-pdate
// database.ref('notes/-L74BRsEPZ0Ci_xE8xCS').update({
//   body: 'Gain experience with React and ES6'
// }).then(()=>console.log('Updated'))
//   .catch(e => console.error(e));
// R-emove
// database.ref('notes/-L74AHAXpzMUgmOI4J2w').remove()
// .then(()=>console.log('Removed'))
//   .catch(e => console.error(e));

// import expenses from '../tests/fixtures/expenses';
// const dbExpensesRef = database.ref('expenses');
// expenses.forEach(item => {
//   dbExpensesRef.push({
//     description:item.description,
//     note:item.note,
//     amount:item.amount,
//     createdAt:item.createdAt,
//   }).then(({key})=>console.log('Added new expense with ID:',key)).catch(e => console.error(e));
// });

// database.ref('expenses').once('value')
//   .then((snapshot) => {
//     const expenses = [];
//     snapshot.forEach((child) => {
//       expenses.push({
//         id: child.key,
//         ...child.val()
//       })
//     })
//     console.log(expenses);
//   });


// const onValueChange = database.ref('expenses').on('value', (snapshot) => {
//   const expenses = [];
//   snapshot.forEach((child) => {
//     expenses.push({
//       id: child.key,
//       ...child.val()
//     })
//   })
//   console.log(expenses);
// });

