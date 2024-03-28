import { openDB } from 'idb';

const initdb = async () =>
  openDB('jateDB', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database

export const putDb = async (id, content) => {
  console.log('PUT to the database jateDB');
  const todosDb = await openDB('jateDB', 1);
  const tx = todosDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: id, todo: content });
  const result = await request;
  console.log('Data saved to the database jateDB', result);
};


// TODO: Add logic for a method that gets all the content from the database
//export const getDb = async () => console.error('getDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // Database and version
  const jateDB = await openDB("jateDB", 1);
  // New transaction specifying db and privileges
  const tx = jateDB.transaction("jate", "readonly");
  // Open desired object store
  const store = tx.objectStore("jate");
  // Get all request
  const request = store.getAll();
  // Confirmation and return
  const result = await request;
  console.log("🚀 - data read from database", result);
  return result.value;
};


initdb();
