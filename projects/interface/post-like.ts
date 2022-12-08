import { Post } from './post'
import { User } from './user'

export interface PostLike {
	id: string
	post: Post
	user: User
	
}

