export function mock(params, data, success = true) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: success,
        data: data,
      })
    }, 1000)
  })
}
