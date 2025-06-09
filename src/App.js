// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import AddUser from './add';
import DeleteUser from './delete';
import FindUser from './find';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './Firebase';
function App() {
const [users, setUsers] = useState([]);
useEffect(() => {
// Firestoreからusersコレクションを取得
const fetchUsers = async () => {
const usersCol = collection(db, 'date');
const userSnapshot = await getDocs(usersCol);
const userList = userSnapshot.docs.map(doc => ({
id: doc.id,
...doc.data()
}));
setUsers(userList);
};
fetchUsers();
}, []);
return (
  <Router>
   <Navigation />{/* ← ナビゲーションをここ䛻表示 */}
   <Routes>
    <Route path="/" element={
  <div>
  <h1 className="bg-gray-100 pt-6 text-center">Users from Firestore</h1>
  <table>
    <tr>
      <th>id</th>
      <td>name</td>
      <td>mail</td>
      <td>dorm</td>
    </tr>
  {users.map(user => (
  <tr>
    <th className="bg-gray-100 pt-6 text-center"key={user.id}>{user.id}</th>
    <td className="bg-gray-100 pt-6 text-center">{user.name}</td>
    <td className="bg-gray-100 pt-6 text-center">{user.mail}</td>
    <td >{user.dorm ? "寮生" : "通学"}</td>
  </tr>
  ))}
  </table>
  </div>
    }/>
       <Route path="/add" element={<AddUser />} />{/* ← /add䛾時Add.jsを表示 */}
      <Route path="/delete" element={<DeleteUser />} />
     <Route path="/find" element={<FindUser />} />
   </Routes>
  </Router>
  );
  }
  
  export default App;