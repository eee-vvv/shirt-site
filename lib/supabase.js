import { createClient } from '@supabase/supabase-js';
import { StorageClient } from '@supabase/storage-js';

const supabaseUrl = process.env.SUPABASE_URL;
const STORAGE_URL = `${supabaseUrl}/storage/v1`;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, SERVICE_KEY);

const storageClient = new StorageClient(STORAGE_URL, {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
});

const getStorageClient = () => {
  return storageClient;
};

const listBuckets = async () => {
  const storageClient = getStorageClient();
  const { data, error } = await storageClient.listBuckets();
};

const getBucket = async (bucketName) => {
  const storageClient = getStorageClient();
  const { data, error } = await storageClient.getBucket(bucketName);
  if (error) return { error };
  return data;
};

const getMainProductImage = async (productId) => {
  const storageClient = getStorageClient();
  const { data, error } = await supabase.storage
    .from('product-images')
    .download(`${productId}/1.jpg`);
  if (error) return { error };
  return data;
};

export {
  getStorageClient,
  testStorageStuff,
  listBuckets,
  getBucket,
  getMainProductImage,
};
