import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCxLLkH9dBwylxn4tZEGxc9QiR0wzLpElM",
  authDomain: "site-593cc.firebaseapp.com",
  projectId: "site-593cc",
});

export const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [users, setUsers] = useState([]);

  const db = getFirestore(firebaseApp);
  const usersCollectionRef = collection(db, "users");

  async function criarDado() {
    try {
      const user = await addDoc(collection(db, "users"), {
        name,
        email,
        number,
      });

      console.log("dados salvos com sucessos", user);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  async function deleteUser(id) {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input type="number" 
      placeholder="Telefone" 
      value={number} 
      onChange={(e) => setNumber(e.target.value)}/>

      <button onClick={criarDado}>Criar dado</button>

      <ul>
        {users.map((user) => {
          return (
            <>
              <li>{user.name}</li>
              <li>{user.email}</li>
              <li>{user.number}</li>
              <button onClick={() => deleteUser(user.id)}>Deletar</button>
            </>
          );
        })}
      </ul>
    </div>
  );
};
