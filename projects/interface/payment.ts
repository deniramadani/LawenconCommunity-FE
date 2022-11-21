import { User } from './user' 
import { Product } from './product' 
import { File } from './file' 

export interface Payment { 
	 transactionCode: string 
	 approval: boolean 
	 user: User 
	 product: Product 
	 file: File 
} 

