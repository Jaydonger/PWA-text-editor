import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const textEditorDb = await openDB('jate', 1);
  const tx = textEditorDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });

  const result = await request;
  console.log('Data saved to the database', result);
};

// logic for a method that gets all the content from the database
export const getDb = async () => {
  const textEditorDb = await openDB('jate', 1);
  const tx = textEditorDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();

  const result = await request;
  result? console.log('Data retrived from the database', result.value): console.log('Data not found in the database');
};

initdb();