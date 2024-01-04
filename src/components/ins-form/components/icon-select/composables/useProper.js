export default function () {
  const visible = ref(false)
  const handleOpen = () => {
    visible.value = true
  }
  const handleClose = () => {
    visible.value = false
  }

  return {
    visible,
    handleOpen,
    handleClose,
  }
}
