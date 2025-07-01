import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Add from './add';
import Delete from './delete';
import Find from './find';
import Jsx from './jsx';
import EditTaskPage from './EditTaskPage'; // ← 追加
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth, provider } from './Firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksCol = collection(db, 'tasks');
      const taskSnapshot = await getDocs(tasksCol);
      const taskList = taskSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(taskList);
    };

    fetchTasks();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("ログインエラー :", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("ログアウトエラー :", error);
    }
  };

  return (
    <Router>
      <Navigation />
      <div className="p-4 flex justify-end bg-gray-100">
        {user ? (
          <div>
            <span className="mr-4">こんにちは、{user.displayName} さん</span>
            <button onClick={handleLogout} className="p-2 bg-red-500 text-white rounded">ログアウト</button>
          </div>
        ) : (
          <button onClick={handleLogin} className="p-2 bg-blue-500 text-white rounded">Googleでログイン</button>
        )}
      </div>

      <Routes>
        <Route path="/" element={
          <div className="p-6">
            <h1 className="text-2xl text-center font-bold mb-4">タスク一覧</h1>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">タイトル</th>
                  <th className="border px-4 py-2">詳細</th>
                  <th className="border px-4 py-2">ステータス</th>
                </tr>
              </thead>
              {user?(
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id} className="text-center">
                    <td className="border px-4 py-2">{task.id}</td>
                    <td className="border px-4 py-2">{task.title}</td>
                    <td className="border px-4 py-2">{task.description}</td>
                    <td className="border px-4 py-2">{task.completed ? "完了" : "未完了"}</td>
                  </tr>
                ))}
              </tbody>
              ):(
                <tbody>
                <tr><th colSpan={4} className="text-gray-600 mt-4">ログインするとデータが見られます。 </th></tr>
                </tbody>
              )}
            </table>
          </div>
        } />

        {user ? (
          <>
            <Route path="/add" element={<Add />} />
            <Route path="/delete" element={<Delete />} />
            <Route path="/find" element={<Find />} />
            <Route path="/jsx" element={<Jsx />} />
            <Route path="/edit" element={<EditTaskPage />} />
            <Route path="/add" element={<AddUser />} />
            <Route path="/delete" element={<DeleteUser />} />
            <Route path="/find" element={<FindUser />} />
            <Route path="/jsx" element={<JSXUser />} />
            <Route path="/edit" element={<EditTaskPageUser />} />
          </>
        ) : (
          <>
            <Route path="/add" element={<p className="text-center mt-10">ログインしてください</p>} />
            <Route path="/delete" element={<p className="text-center mt-10">ログインしてください</p>} />
            <Route path="/find" element={<p className="text-center mt-10">ログインしてください</p>} />
            <Route path="/jsx" element={<p className="text-center mt-10">ログインしてください</p>} />
            <Route path="/edit" element={<p className="text-center mt-10">ログインしてください</p>} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
