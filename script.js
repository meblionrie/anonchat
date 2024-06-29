// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
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
