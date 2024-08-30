import conf from '../conf/conf'
import {Client  ,Account  , ID} from 'appwrite';

export class AuthService {
    client= new Client()
    account 

    constructor() {

        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId);

        this.account =new Account(this.client);
    }

    async createAccount({email,password,name}){
        try {
          const userAccount= await this.account.create(ID.unique() , email ,password,name)
          if(userAccount){

            // redirect to login page
            return this.login({email,password});

          }
          else{
            userAccount;
          }
        } catch (error) {
            throw error;
            
        }
    }
    
    async  login({email,password}) {
        try {
            return await this.account.createEmailPasswordSession(email,password);

        } catch (error) {
            throw error;
        }
    }

    async logOut(){
        try {
            return  this.account.deleteSessions()
        } catch (error) {
            
        }
    }

    async getCurrentUser(){
        try {
            return this.account.get();
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser ::error ",error);
            
        }

        return console.log("no account found"); // when no account of current user
    }
}

const authservice = new AuthService()   // 

export default authservice ;