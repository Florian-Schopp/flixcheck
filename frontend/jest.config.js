module.exports = {
  cacheDirectory: "<rootDir>/.cache/unit",
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*"],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  reporters: ["default"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  roots: ["<rootDir>/test"],
  setupFilesAfterEnv: ["./test/setupTests.ts"],
  testRegex: "/test/.*\\.(test|spec)?\\.(ts|tsx)$",
  transform: {
    "^.+\\.(js|ts|tsx)?$": [
      "ts-jest",
      {
        isolatedModules: true,
        tsconfig: {
          sourceMap: true,
        },
      },
    ],
  },
  testEnvironment: "jsdom",
};
