import { ProductType } from './product-type' 
import { User } from './user' 
import { File } from './file' 

export interface Product extends File,ProductType{ 
	 id : string
	 title: string 
	 content: string 
	 provider: string 
	 location: string 
	 price: number 
	 productType: ProductType 
	 ownerId: User 
	 photo: File 
} 

