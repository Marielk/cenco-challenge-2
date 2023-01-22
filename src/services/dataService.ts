import { Form } from "../utils/interfaces";

export class DataService {

  async getFormData(url: string) {
    const promise = fetch(url)
    .then(response => response.json())
    .then((form: Form) => {
      return form
    })
    .catch(error => {return error})
    return promise
  }

  updateLocalStorage = (key: string,  value: string) => {
    localStorage.setItem(key, value)
    const event = new StorageEvent('storage', {
      key: key,
      newValue: value
    });        
    window.dispatchEvent(event);
  }
}