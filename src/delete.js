import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './Firebase';

function DeleteTask() {
  const [tasks, setTasks] = useState([]);

  // Firestoreからタスク一覧を取得
  const fetchTasks = async () => {
    const tasksCol = collection(db, 'tasks');
    const taskSnapshot = await getDocs(tasksCol);
    const taskList = taskSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setTasks(taskList);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // タスク削除関数
  const deleteTask = async (id) => {
    const confirmDelete = window.confirm('本当にこのタスクを削除しますか？');
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'tasks', id));
      alert('削除しました');
      fetchTasks(); // 更新されたタスクリストを再取得
    } catch (error) {
      alert('削除に失敗しました: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-center p-6">
      <h2 className="text-2xl font-bold mb-4">タスク削除ページ</h2>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div className="text-left">
              <div><strong>タイトル:</strong> {task.title}</div>
              <div><strong>詳細:</strong> {task.description}</div>
              <div><strong>状態:</strong> {task.completed ? '完了' : '未完了'}</div>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeleteTask;
