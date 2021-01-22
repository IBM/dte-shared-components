import Router from "next/router";

const Redirect = (target, ctx) => {
  try {
    if (ctx && ctx.res) {
      // console.log("redirect ctx && ctx.res", ctx, target)
      ctx.res.writeHead(303, { Location: target });
      ctx.res.end();
    } else if (ctx) {
      // console.log("redirect ctx", ctx, target)
      ctx.writeHead(303, { Location: target });
      ctx.end();
    } else {
      // console.log("redirect fallback router.push", target)
      Router.push(target);
    }
  } catch (err) {
    // console.log("redirect err", err.message || err, 'fallback router.push', target)
    Router.push(target);
  }
};

export default Redirect;
