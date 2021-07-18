import { rest } from "msw";

export const handlers = [
  rest.post("https://apex.syncware.io/auth/signin", (req, res, ctx) => {
    sessionStorage.setItem("is-authenticated", "true");

    return res(
      ctx.status(200),
      ctx.json({
        meessage: "Using MSW",
      })
    );
  }),
];
