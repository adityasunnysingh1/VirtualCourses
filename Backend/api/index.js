// This "Lazy Load" pattern fixes the Vercel crash
export default async function handler(req, res) {
  //import the app dynamically only when a request comes in
  const appModule = await import('../index.js');
  const app = appModule.default;
  
  return app(req, res);
}