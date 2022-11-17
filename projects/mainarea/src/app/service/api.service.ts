import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  saveData(data: any): void {
    localStorage.setItem('data', JSON.stringify(data))
  }

  getRoleCode(): string | null {
    const data = localStorage.getItem('data')
    let result: null | string = ''
    if (data) {
      result = JSON.parse(data).roleCode
    }
    return result
  }

  getProfileName(): string | null {
    const data = localStorage.getItem('data')
    let result: null | string = ''
    if (data) {
      result = JSON.parse(data).fullname
    }
    return result
  }

  getIdUser(): string | null {
    const data = localStorage.getItem('data')
    let result: null | string = ''
    if (data) {
      result = JSON.parse(data).id
    }
    return result
  }

  getProfileFoto(): string | null {
    const data = localStorage.getItem('data')
    let result: null | string = ''
    if (data) {
      result = JSON.parse(data).fotoId
    }
    return result
  }

  getProfileEmail(): string | null {
    const data = localStorage.getItem('data')
    let result: null | string = ''
    if (data) {
      result = JSON.parse(data).email
    }
    return result
  }

  getDataProfil(): string | null {
    const data = localStorage.getItem('data')
    let result: null | string = ''
    if (data) {
      result = JSON.parse(data)
    }
    return result
  }

  getData(): string | null {
    const data = localStorage.getItem('data')
    let result: null | string = ''
    if (data) {
      result = JSON.parse(data).token
    }
    return result
  }

  logout() {
    localStorage.clear()
  }
}
