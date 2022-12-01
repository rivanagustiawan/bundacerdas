import toast from 'react-hot-toast'

export function copyToClipboard(copiedText, toastPosition = false) {
  navigator.clipboard.writeText(copiedText)

  toastPosition &&
    toast.success(`${copiedText} berhasil disalin`, {
      position: toastPosition
    })
}
