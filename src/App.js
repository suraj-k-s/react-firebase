import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from './config/firebase';

export default function App() {
  const [value, setValue] = useState('');
  const collectionRef = collection(db, 'to-do');
  const data =  {
    name: value,
  }
  

  const saveData = async () => {
    await addDoc(collectionRef,data)
    setValue('');
  };
  return (
    <div>
      <table align="center">
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                name="txt_data"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </td>
            <td>
              <input type="submit" name="btn_save" onClick={saveData} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
