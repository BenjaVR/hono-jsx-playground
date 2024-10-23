import { Hono } from 'hono'
import { jsxRenderer } from "hono/jsx-renderer";

const app = new Hono();

app.get("*", jsxRenderer(({ children }) => {
  return (
    <html>
      <head>
        <title>Some title</title>
        <link rel="stylesheet" href="/public/static/styles.css"/>
        <link rel="icon" href="/public/favicon.ico" type="image/x-icon"/>
      </head>
      <body class="bg-slate-100">
        <header>Menu</header>
        <div>{children}</div>
      </body>
    </html>
  )
}));

app.get('/', (c) => {
  const messages = ['Good Morning', 'Good Evening', 'Good Night']
  return c.render(
    <>
      <h1>Hello Hono!</h1>
      <a href="/demo">Demo</a>
      <ul>
        {messages.map((message) => {
          return <li>{message}!!</li>
        })}
      </ul>
    </>
  );
});

app.get('/demo', (c) => {
  return c.render(
    <>
      <h1>Demo page!</h1>
    </>
  )
});

export default app
