import { ProductType } from './product-type' 
import { User } from './user' 

export interface Product { 
	 title: string 
	 content: string 
	 provider: string 
	 location: string 
	 price: number 
	 productType: ProductType 
	 ownerId: User 
} 

