/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com','localhost'],
  },
  env: {
    SECRET: 'mysecretapikey',
    SPREADSHEET:'http://localhost:3000/api/googlesheet?key=mysecretapikey',
    Category:'http://localhost:3000/api/category?key=mysecretapikey',
    API_LOGIN_ENDPOINT:'http://localhost:3000/api/login',
  }
};



module.exports = nextConfig;


