import { StorageClient } from '@supabase/storage-js';
import { createContext } from 'react';

const STORAGE_URL = `${process.env.SUPABASE_URL}/storage/v1`;
let SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SERVICE_KEY) {
  SERVICE_KEY = 'nokey'
}

const storageClient = new StorageClient(STORAGE_URL, {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
});

const StorageContext = createContext(storageClient)

export { StorageContext }
