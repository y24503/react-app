import { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from './Firebase';
import Navigation from './components/Navigation';

function EditTaskPage() {
  const [tasks, setTasks] = useState([]);
  const [editedTasks, setEditedTasks] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksCol = collection(db, 'tasks');
      const taskSnapshot = await getDocs(tasksCol);
      const taskList = taskSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(taskList);

      // 初期の編集内容をセット
      const initialEdited = {};
      taskList.forEach(task => {
        initialEdited[task.id] = {
          title: task.title,
          description: task.description
        };
      });
      setEditedTasks(initialEdited);
    };

    fetchTasks();
  }, []);

  const handleChange = (id, field, value) => {
    setEditedTasks(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const handleSave = async (id) => {
    const taskRef = doc(db, 'tasks', id);
    const updated = editedTasks[id];

    try {
      await updateDoc(taskRef, {
        title: updated.title,
        description: updated.description
      });
      alert('更新しました');
    } catch (error) {
      console.error("更新エラー:", error);
      alert('更新に失敗しました');
    }
  };

  return (
    <div className="p-6">
      <Navigation />
      <h2 className="text-2xl font-bold mb-4">タスク編集ページ</h2>
      <ul className="space-y-4">
        {tasks.map(task => (
          <li key={task.id} className="bg-white p-4 rounded shadow">
            <div className="mb-2">
              <label className="block font-bold">タイトル:</label>
              <input
                type="text"
                value={editedTasks[task.id]?.title || ''}
                onChange={(e) => handleChange(task.id, 'title', e.target.value)}
                className="border px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block font-bold">詳細:</label>
              <input
                type="text"
                value={editedTasks[task.id]?.description || ''}
                onChange={(e) => handleChange(task.id, 'description', e.target.value)}
                className="border px-2 py-1 w-full"
              />
            </div>
            <button
              onClick={() => handleSave(task.id)}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            >
              保存
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EditTaskPage;
