import { Hono } from 'hono'
import { jsxRenderer } from "hono/jsx-renderer";

declare module 'hono' {
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      props: {
        title?: string;
        injectClientJsx?: boolean;
      }
    ): Response
  }
}

const app = new Hono();

app.get("*", jsxRenderer(({ children, title = "Default title", injectClientJsx = false }) => {
  return (
    <html>
      <head>
        <title>{title}</title>
        <link rel="stylesheet" href="/public/static/styles.css"/>
        <link rel="icon" href="/public/favicon.ico" type="image/x-icon"/>
        {injectClientJsx && <script src="/public/static/client.js" defer></script>}
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
    </>,
    {}
  );
});

app.get('/demo', (c) => {
  return c.render(
    <>
      <h1>Everything under the line is a client-side React (jsx) app :-)</h1>
      <hr/>
      <div id="root"></div>
    </>,
    {
      title: "Custom title!!",
      injectClientJsx: true
    }
  )
});

export default app
