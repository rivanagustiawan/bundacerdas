import toast from 'react-hot-toast'

export function copyToClipboard(copiedText, toastPosition = false) {
  navigator.clipboard.writeText(copiedText)

  toastPosition &&
    toast.success(`${copiedText} berhasil disalin`, {
      position: toastPosition
    })
}

export function formatNumber(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
