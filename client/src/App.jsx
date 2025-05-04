import React, { useState, useEffect } from 'react'
import sodium from 'libsodium-wrappers'
import './App.css'

function App() {
  const [sessionId, setSessionId] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [message, setMessage] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  useEffect(() => {
    (async () => {
      await sodium.ready;

      const keyPair = sodium.crypto_box_keypair();
      const publicKey = sodium.to_base64(keyPair.publicKey);
      const privateKey = sodium.to_base64(keyPair.privateKey)

      setSessionId(publicKey);
      setPrivateKey(privateKey)

      localStorage.setItem('sessionId', publicKey);
      localStorage.setItem('privateKey', privateKey)
    })();
  }, [])

  const sendMessage = async () => {
    await sodium.ready;

    const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);
    const messageBytes = sodium.from_string(message);

    const receiverPublicKey = sodium.from_base64(receiverId);
    const senderPrivateKey = sodium.from_base64(privateKey);

    const cipherText = sodium.crypto_box_easy(messageBytes, nonce, receiverPublicKey, senderPrivateKey);
    const payload = {
      senderId: sessionId,
      receiverId,
      content: Json.stringify({
        nonce: sodium.to_base64(nonce),
        cipher: sodium.to_base64(cipherText)
      })
    }

    await fetch('http://localhost:5000/api/messages', {
      method: 'POST',
      headers: { 'Context-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    setMessage('');
    alert(`Message sent (encrypted)`)
  }


  return (
    <div style={{ padding: '2rem' }}>
      <h1>Anonymous Chat (Session-style)</h1>
      <p><strong>Your Session ID:</strong> {sessionId}</p>

      <input
        type="text"
        placeholder="Recipient Session ID"
        value={receiverId}
        onChange={(e) => setRecipientId(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <textarea
        rows="4"
        placeholder="Your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <button onClick={sendMessage}>Send Encrypted Message</button>
    </div>
  );
}

export default App
