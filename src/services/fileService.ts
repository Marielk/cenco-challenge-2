
export class FileService {
  async encodeFileBase64(file: File): Promise<string> {
    const promise = new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {resolve(reader.result ? reader.result.toString() : '')}
      reader.onerror = error => reject(error)
    })
    return promise
  }

  downloadFileBase64(file: string): void {
    const splitText = file.split(',')[1]
    const convert = Buffer.from(splitText, 'base64')
    const blob = new Blob([convert], {type: "data:text/csv;"})
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = 'test.csv'
    link.href = url
    link.click()
  }
}