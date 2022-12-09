import { Post } from './post' 
import { User } from './user' 

export interface Comment { 
	id:string
	 content: string 
	 post: Post 
	user: User 
	nama: string
	createdAt: string
	createdBy : string
} 

