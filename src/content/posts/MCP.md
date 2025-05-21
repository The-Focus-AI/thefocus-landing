
# Security

# NLWeb

## ModelContextProtocol

First, the world has now converges on [MCP](https://modelcontextprotocol.io/introduction) .  The protocol is young, but basically a vessel to exchange information between disparate systems with the right balance of the models "being able to figure it out."  For example, in [Tezlab AI](https://ai.tezlabapp.com/) we build a MCP server to mediate between the front end and we're almost always returning JSON inside of the text response.  For some components that JSON displays rich HTML widgets; other times the model plucks out the data that it needs.

I would have preferred there to be a JSON response type in addition to `text` and `image`.   So now there's "parse this JSON and optionall pull out the ` ```json ` blocks if it blows up" code everywhere.

*I was just checking the spec to see if that was all, and since the last time I've looked at it they've added an `audio` response, so it's a good, flexible base to build off of.*

They've added a MCP registry into Windows itself, which is cool.  Right now they way that you enable MCPs in VSCode, or Cursor, or Claude Desktop etc is laborious, and there's are tools like [smithery.ai](https://smithery.ai/) popping up to help manage.

## Exposing MCP Services Over the Internet: Express SSE Server with Bearer Authentication

### Essence & Overview

This server exposes MCP tools over the internet by running an Express-based HTTP server that supports Server-Sent Events (SSE) for real-time, bidirectional communication. Each client connection is authenticated using a Bearer token and is managed as a unique session.

- Express SSE Server:

The server uses Express to handle HTTP requests. The /sse endpoint establishes an SSE stream for each client, setting the necessary headers for event streaming. Static files (such as a web UI) can also be served.

- Session Management:

Each SSE connection is assigned a unique session, tracked in an in-memory transportMap. This ensures that each client’s messages and tool invocations are isolated and routed correctly.

- Authentication:

Clients must provide a Bearer token in the Authorization header when connecting to /sse. This token is injected into the session’s configuration, so all tool calls are authenticated for that user.

- Bidirectional Communication:

- Server-to-client: Tool responses and events are streamed to the client over SSE.

- Client-to-server: Clients send tool invocations or other messages via POST requests to /messages?sessionId=..., which are routed to the correct session using the session ID.

- Lifecycle:

When a client disconnects, the session is cleaned up from memory, ensuring no stale sessions remain.

In short:

The Express SSE server provides secure, real-time access to MCP tools over the internet, with per-session authentication and strict session isolation, using Bearer tokens and in-memory session management.


| Feature | Implementation Detail |
|------------------------|--------------------------------------------------------------------------------------|
| Auth | Bearer token in Authorization header, injected into session config |
| Session Management | transportMap tracks sessionId → SSEServerTransport |
| SSE Streaming | /sse endpoint, per-session streaming, cleaned up on disconnect |
| Bidirectional Messages | /messages POST endpoint, routed by sessionId |
| Security | Only valid tokens create sessions; session isolation via sessionId |
