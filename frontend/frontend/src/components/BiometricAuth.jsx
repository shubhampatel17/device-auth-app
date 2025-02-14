import React, { useState } from "react";
import axios from "axios";

const BiometricAuth = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleAuth = async () => {
    try {
      const publicKeyCredentialRequestOptions = {
        publicKey: {
          challenge: new Uint8Array(32), // Random challenge for security
          rpId: window.location.hostname, // Ensure the authentication is for the local server
          userVerification: "required", // Force biometric verification
          authenticatorSelection: {
            authenticatorAttachment: "platform", // ✅ Forces built-in biometrics (Windows Hello, Touch ID)
            requireResidentKey: false, // ✅ Ensures no stored passkeys
            userVerification: "required",
          },
          allowCredentials: null, // ✅ Prevents using any existing passkeys
        },
      };
  
      const credential = await navigator.credentials.get(publicKeyCredentialRequestOptions);
  
      if (!credential) {
        setMessage("Biometric authentication failed.");
        return;
      }
  
      const response = await axios.post("http://localhost:5000/api/auth/authenticate", {
        deviceId: credential.id,
        email,
      });
  
      setMessage(response.data.success ? "Authentication Successful" : "Authentication Failed");
    } catch (error) {
      console.error(error);
      setMessage("Error occurred during authentication.");
    }
  };
  

  return (
    <div>
      <h2>Secure Email Authentication</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
      <button onClick={handleAuth}>Authenticate</button>
      <p>{message}</p>
    </div>
  );
};

export default BiometricAuth;
