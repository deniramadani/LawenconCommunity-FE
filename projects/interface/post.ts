import { User } from './user'
import { PostType } from './post-type'
import { PostAttachment } from './post-attachment'
import { PostPollingOption } from './post-polling-option'

export interface Post extends Comment{
	id: string
	title: string
	body: string
	user: User
	postType: PostType
	file: PostAttachment[]
	question: string
	totalLike: number
	likeId: string
	optionId: string
	bookmarkId: string
	totalComment: number
	postPollingOption: PostPollingOption[]
	createdAt: string
	createdBy: string
	comments: Comment[]
	totalPolling : number
}

