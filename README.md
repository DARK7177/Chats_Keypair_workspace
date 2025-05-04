# 🛡️ Anonymous Chat (Session-Style) – MERN Stack + Libsodium

This is a privacy-focused anonymous chat application inspired by https://getsession.org, built using the MERN stack (MongoDB, Express, React, Node.js) and libsodium-wrappers for end-to-end encryption.

No signup, no phone number — just anonymous key-based identity.

## 📦 Features

- 🔐 End-to-end encrypted messaging with Curve25519 keypairs  
- 👤 Anonymous user identity using generated Session IDs (public keys)  
- 🧠 Keypair stored in localStorage — no account required  
- 💬 Encrypted messages stored in MongoDB  
- 🌐 Built with React, Express, MongoDB  

## 🖼️ Demo Preview

_(Insert screenshots or link to deployed demo if available)_

## 🚀 Tech Stack

- Frontend: React, libsodium-wrappers  
- Backend: Express.js, MongoDB, Mongoose  
- Crypto: Curve25519 keypairs via libsodium (same used by Session)  

## 🔧 Installation & Setup

1. Clone the repo  
   git clone https://github.com/your-username/anonymous-session-chat.git  
   cd anonymous-session-chat

2. Backend  
   cd server  
   npm install  
   npm start  
   (Runs on http://localhost:5000)

3. Frontend  
   cd ../client  
   npm install  
   npm start  
   (Runs on http://localhost:3000)

## ✅ How It Works

1. On first visit, the React app generates a Curve25519 keypair and stores it in localStorage.  
2. The public key acts as the user's Session ID.  
3. Messages are encrypted on the client and sent to the server for storage.  
4. Decryption happens entirely on the client using the sender’s private key and the recipient’s public key.  

## 🛡️ Security Notes

- All encryption is done in-browser using libsodium-wrappers.  
- The server does not store private keys — only encrypted messages.  
- This project is for educational/demonstration purposes. For real-world use, consider onion routing (like Session/Oxen) and metadata protection.  

## 📄 License

MIT License

## 👨‍💻 Author

Your Name  
GitHub: https://github.com/DARK7177
