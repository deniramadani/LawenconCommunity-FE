import { User } from './user' 
import { Product } from './product' 
import { File } from './file' 
import { UserTypeService } from 'projects/memberarea/src/app/service/user.type.service'

export interface Payment extends Product,User,File { 
	 transactionCode: string 
	 approval: boolean 
	 user: User 
	 product: Product 
	file: File 
	createdAt : string
} 

