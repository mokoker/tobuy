let baseUrl = ''
let clientUrl =''
if (process.env.NODE_ENV === 'production') {
   baseUrl = 'https://api.karasayfa.com/api';
   clientUrl = 'https://karasayfa.com';
}
else {
   baseUrl = 'http://localhost:63419/api/'
   clientUrl = 'http://localhost:8080';
}

export const apiHost = baseUrl
export const client = clientUrl