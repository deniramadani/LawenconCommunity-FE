import { PostPolling } from './post-polling'

export interface PostPollingOption extends PostPolling {
	id: string
	postPolling: PostPolling
	content: string
	totalResponse: number
}

