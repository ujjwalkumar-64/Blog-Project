import { stringify } from "postcss";

const conf ={
    appWriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appWriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appWriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    tinyMceKey: String(import.meta.env.VITE_TINY_MCE_API_KEY),
    appWriteContactCollectionId: String(import.meta.env.VITE_APPWRITE_CONTACT_COLLECTION_ID)
}

export default conf;