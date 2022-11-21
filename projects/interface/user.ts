import { Role } from './role' 
import { Industry } from './industry' 
import { Position } from './position' 
import { File } from './file' 
import { UserType } from './user-type' 

export interface User extends Position,File{ 
	 fullname: string 
	 email: string 
	 password: string 
	 dateOfBirth: string 
	 address: string 
	 phoneNumber: string 
	 company: string 
	 ballance: number 
	 role: Role 
	 industry: Industry 
	 position: Position 
	 photo: File 
	 userType: UserType 
} 

