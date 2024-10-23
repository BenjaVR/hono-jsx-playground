import app from './app.js';
import { serve } from "@hono/node-server";
import { showRoutes } from "hono/dev";
import { serveStatic } from "@hono/node-server/serve-static";

app.use('/public/static/*', serveStatic({
  rewriteRequestPath: (path) => path.replace(/^\/public\/static/, '/public/build')
}));

app.use('/public/*', serveStatic());

showRoutes(app);

serve({
  port: 3000,
  fetch: app.fetch,
}, ({ port }) => {
  console.log(`Server is running on port ${port}`);
});
