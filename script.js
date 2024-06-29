// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgYXaV59Nvf-YUyj9OqcTlwlkWLs1_334",
  authDomain: "anonchat-d469f.firebaseapp.com",
  projectId: "anonchat-d469f",
  storageBucket: "anonchat-d469f.appspot.com",
  messagingSenderId: "647520645360",
  appId: "1:647520645360:web:7aa654cb50b3eec67d5235",
  measurementId: "G-NKXGVEDL5H"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Assign a random name to the user
const username = `User${Math.floor(Math.random() * 1000)}`;

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    const timestamp = new Date().toLocaleTimeString();
    const message = {
      user: username,
      msg: input.value,
      timestamp: timestamp
    };
    database.ref('messages').push(message);
    input.value = '';
  }
});

database.ref('messages').on('child_added', function(snapshot) {
  const data = snapshot.val();
  var item = document.createElement('li');
  item.textContent = `${data.timestamp} - ${data.user}: ${data.msg}`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});
