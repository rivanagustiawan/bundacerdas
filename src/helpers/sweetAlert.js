import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const TheSwal = withReactContent(Swal)

export async function MySwal(
  title,
  html,
  type = 'success',
  showConfirmButton = false,
  showCancelButton = false,
  callback = false,
  timeToClose = 3000
) {
  const swalInstance = {
    title: title,
    html: html,
    showConfirmButton: showConfirmButton,
    confirmButtonText: 'OK',
    showCancelButton: showCancelButton,
    cancelButtonText: 'Batal',
    icon: type
  }

  if (!showConfirmButton) {
    swalInstance.timer = timeToClose
  }

  return TheSwal.fire(swalInstance).then(result => {
    if (result.isConfirmed && callback) {
      callback()
    }
  })
}

export async function MySwalConfirm(
  title,
  html,
  icon,
  confirmText = 'Ya',
  cancelText = 'Tidak',
  confirmCallback,
  cancelCallback
) {
  return TheSwal.fire({
    title: title,
    html: html,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: confirmText,
    cancelButtonText: cancelText
  }).then(result => {
    if (result.isConfirmed) {
      if (confirmCallback) confirmCallback()
    } else {
      if (cancelCallback) cancelCallback()
    }
  })
}
