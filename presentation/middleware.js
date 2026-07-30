import { next } from "@vercel/functions";

const COOKIE_NAME = "thefocus_presentation";

async function accessToken(password) {
  const data = new TextEncoder().encode(`thefocus:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

function loginPage(error = false) {
  return new Response(
    `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#0A0A0A">
  <title>Private presentation — TheFocus</title>
  <style>
    :root { color-scheme: dark; }
    * { box-sizing: border-box; }
    body {
      min-height: 100svh;
      margin: 0;
      display: grid;
      place-items: center;
      padding: 24px;
      background: #0A0A0A;
      color: #E5E5E5;
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    main { width: min(100%, 420px); }
    .mark {
      width: 22px;
      height: 22px;
      margin-bottom: 48px;
      border: 1px solid #556B2F;
      display: grid;
      place-items: center;
    }
    .mark::after { content: ""; width: 7px; height: 7px; background: #556B2F; }
    p {
      margin: 0 0 12px;
      color: #556B2F;
      font: 500 11px/1.4 "SFMono-Regular", Consolas, monospace;
      letter-spacing: .12em;
      text-transform: uppercase;
    }
    h1 { margin: 0 0 32px; color: #FFF; font-size: 34px; line-height: 1.05; letter-spacing: -.035em; }
    form { display: flex; border: 1px solid rgba(255,255,255,.2); }
    input {
      min-width: 0;
      flex: 1;
      padding: 15px 16px;
      border: 0;
      outline: 0;
      background: #111;
      color: #FFF;
      font: inherit;
    }
    input:focus { box-shadow: inset 0 0 0 1px #556B2F; }
    button { padding: 15px 20px; border: 0; background: #FFF; color: #000; font-weight: 600; cursor: pointer; }
    .error { margin-top: 14px; color: #B0B0B0; font: 14px/1.5 Inter, sans-serif; letter-spacing: 0; text-transform: none; }
  </style>
</head>
<body>
  <main>
    <div class="mark" aria-hidden="true"></div>
    <p>Private presentation</p>
    <h1>Enter the password.</h1>
    <form method="post">
      <input type="password" name="password" autocomplete="current-password" aria-label="Password" autofocus required>
      <button type="submit">View</button>
    </form>
    ${error ? '<p class="error">That password is not correct.</p>' : ""}
  </main>
</body>
</html>`,
    {
      status: error ? 401 : 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
        "x-robots-tag": "noindex, nofollow",
      },
    },
  );
}

export default async function middleware(request) {
  const password = process.env.PRESENTATION_PASSWORD;

  if (!password) {
    return new Response("Presentation password is not configured.", { status: 503 });
  }

  const expectedToken = await accessToken(password);
  const cookie = request.headers.get("cookie") || "";
  const authorized = cookie
    .split(";")
    .map((part) => part.trim())
    .some((part) => part === `${COOKIE_NAME}=${expectedToken}`);

  if (authorized) {
    return next();
  }

  if (request.method === "POST") {
    const form = await request.formData();

    if (form.get("password") === password) {
      return new Response(null, {
        status: 303,
        headers: {
          location: request.url,
          "set-cookie": `${COOKIE_NAME}=${expectedToken}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`,
          "cache-control": "no-store",
        },
      });
    }

    return loginPage(true);
  }

  return loginPage();
}

export const config = {
  matcher: "/(.*)",
};
