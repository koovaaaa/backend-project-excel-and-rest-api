import axios from 'axios';

export default async function (path, method) {
  const response = await axios({
    method: method,
    url: path,
  });

  return response.data;
}
