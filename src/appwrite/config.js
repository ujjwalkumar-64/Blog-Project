import conf from '../conf/conf'
import {Client  , Databases, Storage  , ID, Query} from 'appwrite';

export class Service{
    client = new Client()
    databases;
    bucket;  // storage

    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);

    }

    async createPost({title, slug, content , featuredImage , status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,

                }


            )
        } catch (error) {
            console.log("Appwrite Service :: createPost ::error ",error)
        }
    }

    async updatePost(slug,{title, content, featuredImage, status}){
        try {
             return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                   title,
                    content,
                    featuredImage,
                    status,
                }
            )
           
        } catch (error) {
            console.log("Appwrite Service :: updatePost ::error ",error);
             
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deletePost ::error ",error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
             

        } catch (error) {
            console.log("Appwrite Service :: getPost ::error ",error);
            return false;
        }
    }

    // get those post which is active

    async getPosts(query = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                query

            )
        } catch (error) {
            console.log("Appwrite Service :: getPosts ::error ",error)
        }
    }

    // file upload services  , 
    // not put file name use actual blob file
    // in featured image we pass image id 

    async uploadFile(file){
        try {
           return  await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service :: uploadFile ::error ",error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId,
               
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deleteFile ::error ",error);
            
        }
    }

    getpreviewFile(fileId){
        return this.bucket.getFilePreview(
            conf.appWriteBucketId,
            fileId,
            0,
            0,
            0,
            50

        )
    }

    async submitContact({name,email, comment}){
        try {
            await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteContactCollectionId,
                ID.unique(),
                {
                    name,
                    email,
                    comment,
                }

            )
        } catch (error) {
            console.log("Appwrite Sevice :: submitContact ::error",error)
        }
    }


}

const service= new Service();
export default service