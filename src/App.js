import React, { useEffect, useState } from 'react';
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from './config/firebase';

export default function ToDoList() {
  const [dataList, setDataList] = useState([]);
  const [value, setValue] = useState('');

  const handleDelete = async (itemId) => {
    const itemRef = doc(db, 'to-do', itemId);
    await deleteDoc(itemRef);
  };

  const handleInsert = async () => {
    const collectionRef = collection(db, 'to-do');
    const data = {
      name: value,
      timestamp: new Date().getTime(),
    };
    await addDoc(collectionRef, data);
    setValue('');
  };

  useEffect(() => {
    const querySnapshot = query(collection(db, 'to-do'));
    const unsubscribe = onSnapshot(querySnapshot, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const sortedData = data.sort((a, b) => a.timestamp - b.timestamp);
      setDataList(sortedData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>To-Do List</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="txt_data"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter task..."
        />
        <button onClick={handleInsert}>Add Task</button>
      </div>
      <ul
        style={{
          listStyle: 'none',
          padding: '0',
          width: '300px',
          margin: '0 auto',
        }}
      >
        {dataList.map((item) => (
          <li
            key={item.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px',
              border: '1px solid #ccc',
              padding: '10px',
            }}
          >
            <span>{item.name}</span>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
