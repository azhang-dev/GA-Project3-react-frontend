export const API_ROOT = process.env.NODE_ENV === "production" ? "https://obscure-brushlands-14937.herokuapp.com" : "http://localhost:3000"

export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};