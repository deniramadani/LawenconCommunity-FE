import { Post } from './post' 
import { PostPollingOption } from './post-polling-option' 

export interface PostPolling { 
	post: Post 
	question: string 
	postPollingOptions: PostPollingOption[] 
	
} 

