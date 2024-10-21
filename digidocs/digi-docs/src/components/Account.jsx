// src/components/Account.jsx
import React, { useState, useEffect } from "react";
import { storage, db } from "../firebase"; // Adjust according to your project structure
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import getDownloadURL
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth"; // Ensure signOut is imported
import "../styles.css";

const Account = () => {
  const [files, setFiles] = useState([]);
  const [fileList, setFileList] = useState([]);
  const auth = getAuth(); // Get the current authenticated user

  const handleFileChange = (e) => {
    setFiles([...e.target.files]); // Update the files state with selected files
  };

  const handleUpload = async () => {
    const user = auth.currentUser; // Get the current user
    if (!user) {
      alert("You must be logged in to upload files.");
      return;
    }

    for (const file of files) {
      const fileRef = ref(storage, `documents/${file.name}`); // Create a reference in Storage
      await uploadBytes(fileRef, file); // Upload the file to Storage

      // Get the download URL for the uploaded file
      const downloadURL = await getDownloadURL(fileRef);

      // Save file metadata to Firestore with user UID
      await addDoc(collection(db, "files"), {
        name: file.name, // Name of the file
        url: downloadURL, // Save the download URL directly
        createdAt: new Date(), // Timestamp
        userId: user.uid, // Store the user's UID
      });
    }
    alert("Files uploaded successfully!");
    fetchFiles(); // Fetch the updated file list after upload
  };

  const fetchFiles = async () => {
    const user = auth.currentUser; // Get the current user
    if (!user) return;

    // Query to get files belonging to the current user
    const q = query(collection(db, "files"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const fileArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFileList(fileArray); // Set the state with the fetched file data
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      alert("You have logged out successfully!");
      window.location.href = "/login"; // Change this to your login route if needed
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    fetchFiles(); // Fetch files on component mount
  }, []);

  return (
    <div className="container">
      <h1>Your Account</h1>
      <p>Upload your documents here:</p>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <h2>Uploaded Files</h2>
      <ul>
        {fileList.map((file) => (
          <li key={file.id}>
            <a
              href={file.url} // Use the saved download URL directly
              download // Adding the download attribute
              target="_blank"
              rel="noopener noreferrer"
            >
              {file.name}
            </a>
          </li>
        ))}
      </ul>
      <button onClick={handleLogout}>Logout</button> {/* Logout button */}
    </div>
  );
};

export default Account;
