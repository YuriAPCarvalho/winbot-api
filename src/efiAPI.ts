const axios = require('axios');

let accessToken = 'token_inicial'; // Armazena o token inicial
let refreshToken = 'refresh_token_inicial'; // Armazena o refresh token

// Função para obter um novo token de acesso
const refreshAccessToken = async () => {
  try {
    var credenciais = {
      client_id: process.env.GERENCIANET_APICARD_CLIENT_ID,
      client_secret: process.env.GERENCIANET_APICARD_CLIENT_SECRET
    };

    var data = JSON.stringify({ grant_type: 'client_credentials' });
    var data_credentials =
      credenciais.client_id + ':' + credenciais.client_secret;

    var auth = Buffer.from(data_credentials).toString('base64');

    var config = {
      method: 'POST',
      url: process.env.EFIAPI_URL + '/v1/authorize',
      headers: {
        Authorization: 'Basic ' + auth,
        'Content-Type': 'application/json'
      },
      data: data
    };

    const response = await axios(config);
    console.log(response);

    accessToken = response.data.access_token; // Atualiza o token de acesso
    return accessToken;
  } catch (error) {
    console.error('Erro ao atualizar o token de acesso:', error);
    throw error;
  }
};

const efiAPI = axios.create({
  baseURL: process.env.EFIAPI_URL, // Base URL para todas as requisições
  timeout: 10000, // Timeout de 10 segundos
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para injetar o token nas requisições
efiAPI.interceptors.request.use(
  async config => {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com falhas de autenticação (ex.: token expirado)
efiAPI.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log('deu 401');

      originalRequest._retry = true;
      try {
        // Tenta atualizar o token e repetir a requisição original
        const newToken = await refreshAccessToken();
        console.log(newToken);

        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axios(originalRequest); // Reenvia a requisição com o novo token
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default efiAPI;
