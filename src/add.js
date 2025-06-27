import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './Firebase';
import { useNavigate } from 'react-router-dom';

function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'tasks'), {
        title,
        description,
        completed
      });
      alert('タスクを追加しました');
      navigate('/');
    } catch (error) {
      alert('追加に失敗しました: ' + error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">タスクを追加</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">タイトル：</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block">詳細：</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border px-2 py-1 w-full"
          ></textarea>
        </div>
        <div>
          <label className="block">完了状況：</label>
          <select
            value={completed}
            onChange={(e) => setCompleted(e.target.value === 'true')}
            className="border px-2 py-1"
          >
            <option value="false">未完了</option>
            <option value="true">完了</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          追加
        </button>
      </form>
    </div>
  );
}

export default AddTask;
