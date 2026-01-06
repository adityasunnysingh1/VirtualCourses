import app from '../index.js';

export default function handler(request, response) {
  return app(request, response);
}