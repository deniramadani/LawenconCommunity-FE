import { User } from './user' 
import { PostType } from './post-type' 
import { PostAttachment } from './post-attachment' 
import { PostPollingOption } from './post-polling-option' 

export interface Post { 
	 title: string 
	 body: string 
	 user: User 
	 postType: PostType 
	 file: PostAttachment[] 
	 question: string 
	 totalLike: number 
	 like_id: string 
	 bookmark_id: string 
	 totalComment: number 
	 postPollingOption: PostPollingOption[] 
} 

