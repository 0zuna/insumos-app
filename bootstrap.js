import axios from 'axios'

const instance = axios.create({
baseURL: 'http://192.168.0.10/usupso/public',
//baseURL: 'http://dimitri/usupso/public',
  headers: {
      'Content-Type': 'application/json',
      'X-Requested-With':'XMLHttpRequest',
    },
});

export default instance
