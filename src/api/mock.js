export function mock(params, data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: data,
      })
    }, 1000)
  })
}
