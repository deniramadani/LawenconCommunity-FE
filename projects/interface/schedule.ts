import { Product } from './product' 

export interface Schedule extends Product{ 
	 id : string
	 dateTimeStart: string 
	 dateTimeEnd: string 
	product: Product 
	createdAt : string
} 

