import { File } from './file' 
import { User } from './user' 

export interface Article extends File,User{ 
	 title: string 
	 content: string 
	 file: File 
	 user: User 
	 createdAt : string
} 

