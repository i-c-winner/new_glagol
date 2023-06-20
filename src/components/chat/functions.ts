function getTextButton(data: any) {
  if (data === null) {
    return 'Выбрать файл'
  } else {
    if (Object.keys(data).length === 1) {
      return data[0].name
    } return `Выбрано ${data.length} файлов`
  }
}

export { getTextButton }