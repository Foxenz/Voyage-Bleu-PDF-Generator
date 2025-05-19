export const formatDate = (date: string): string => {
  const parsedDate = new Date(date)
  if (isNaN(parsedDate.getTime())) {
    return '...'
  }
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }
  return parsedDate.toLocaleDateString('fr-FR', options)
}

export const formatDateTime = (date: string): string => {
  const parsedDate = new Date(date)
  if (isNaN(parsedDate.getTime())) {
    return '...'
  }
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }
  const hours = parsedDate.getHours().toString().padStart(2, '0')
  const minutes = parsedDate.getMinutes().toString().padStart(2, '0')
  return `${parsedDate.toLocaleDateString('fr-FR', dateOptions)} à ${hours}h${minutes}`
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)
}
