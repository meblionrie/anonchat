// Initialize Pusher
const pusher = new Pusher('YOUR_APP_KEY', {
  cluster: 'YOUR_APP_CLUSTER'
});

// Subscribe to the 'chat' channel
const channel = pusher.subscribe('chat');

// Listen for new messages
channel.bind('message', function(data) {
  const item = document.createElement('li');
  item.textContent = `${data.timestamp} - ${data.user}: ${data.message}`; // Display message with user and timestamp
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight; // Scroll to the bottom
});

// Form submission handler
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const username = `User${Math.floor(Math.random() * 1000)}`; // Generate a random username

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value.trim()) {
    const now = new Date();
    const timestamp = now.toLocaleTimeString();
    // Send message to the server
    fetch('/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input.value, user: username, timestamp })
    });
    input.value = ''; // Clear the input field
  }
});

// Typing indicator functionality
const typingTimeout = 3000;
let typingTimer;

input.addEventListener('input', () => {
  clearTimeout(typingTimer);
  fetch('/typing', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: username })
  });
  typingTimer = setTimeout(() => {
    fetch('/typing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: '' })
    });
  }, typingTimeout);
});

// Display typing indicator
channel.bind('typing', function(data) {
  const typingElement = document.getElementById('typing');
  if (data.user) {
    typingElement.textContent = `${data.user} is typing...`;
  } else {
    typingElement.textContent = '';
  }
});
