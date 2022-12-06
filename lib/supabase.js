import { StorageClient } from '@supabase/storage-js';

const STORAGE_URL = `${process.env.SUPABASE_URL}/storage/v1`;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

const storageClient = new StorageClient(STORAGE_URL, {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
});

const getStorageClient = () => {
  return storageClient;
};

const listBuckets = async () => {
  const { data, error } = await storageClient.listBuckets()
  return data
}

export { getStorageClient, listBuckets }
