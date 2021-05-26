// Config Response Interceptor
import App from '@/main'

export const axiosInterceptorResponseConfig = (response) => {
  // Turn Off Loading
  App.$Progress.finish()
  return response
}

// Config Response Error Interceptor
export const axiosInterceptorResponseError = (error) => {
  // Turn Off Loading
  App.$Progress.finish()

  if (error) {
    // eslint-disable-next-line no-unused-vars
    const { config, response: { status } = { status: 500 } } = error
    const originalRequest = config

    if (status !== 401) {
      return Promise.reject(error)
    }

    // If login return 404 status => reject an error
    if (originalRequest.url === originalRequest.baseURL + 'auth' && status === 404) {
      return Promise.reject(error)
    }
  } else {
    // return empty object for aborted request
    return Promise.resolve({})
  }
}
