import { User } from './user' 
import { PostType } from './post-type' 
import { File } from './file' 
import { PostPollingOption } from './post-polling-option' 

export interface Post { 
	 title: string 
	 body: string 
	 user: User 
	 postType: PostType 
	 file: File[] 
	 question: string 
	 postPollingOption: PostPollingOption[] 
} 

