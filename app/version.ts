export const VERSION = {
  major: 1,
  minor: 0,
  patch: 1,
  toString: () => `${VERSION.major}.${VERSION.minor}.${VERSION.patch}`,
};

export const BUILD_INFO = {
  version: VERSION.toString(),
  buildDate: new Date().toISOString(),
  environment: process.env.NODE_ENV,
};
