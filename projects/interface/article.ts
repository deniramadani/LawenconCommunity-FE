import { File } from './file' 

export interface Article extends File{ 
	 title: string 
	 content: string 
	 file: File
	 createdAt : string
} 

