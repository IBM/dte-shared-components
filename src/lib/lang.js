const DEFAULT_LANG = {
  cc: "us",
  lc: "en",
};

export const getLang = (router) => {
  return router && router.query && router.query.lc
    ? {
        lc: router.query.lc,
        cc: router.query.cc,
      }
    : DEFAULT_LANG;
};
