import { Post } from './post' 
import { User } from './user' 

export interface Comment { 
	 content: string 
	 post: Post 
	 user: User 
} 

