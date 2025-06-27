import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './Firebase';
import Navigation from './components/Navigation';

function FindTaskPage() {
  const [tasks, setTasks] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksCol = collection(db, 'tasks');
      const taskSnapshot = await getDocs(tasksCol);
      const taskList = taskSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(taskList);
      setFilteredTasks(taskList);
    };

    fetchTasks();
  }, []);

  const handleSearch = (e) => {
    const kw = e.target.value;
    setKeyword(kw);

    const filtered = tasks.filter(task =>
      task.title.toLowerCase().includes(kw.toLowerCase()) ||
      task.description.toLowerCase().includes(kw.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  return (
    <div className="p-6">
      <Navigation />
      <h2 className="text-2xl font-bold mb-4">タスク検索ページ</h2>
      <input
        type="text"
        placeholder="タイトルまたは詳細で検索"
        value={keyword}
        onChange={handleSearch}
        className="border px-2 py-1 mb-4 w-full max-w-md"
      />
      <ul className="space-y-2">
        {filteredTasks.map(task => (
          <li key={task.id} className="bg-white p-4 rounded shadow">
            <div><strong>タイトル:</strong> {task.title}</div>
            <div><strong>詳細:</strong> {task.description}</div>
            <div><strong>状態:</strong> {task.completed ? '完了' : '未完了'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FindTaskPage;
