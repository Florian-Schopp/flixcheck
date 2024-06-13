module.exports = {
  cacheDirectory: "<rootDir>/.cache/unit",
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*", "!<rootDir>/src/app.ts"],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  reporters: ["default"],

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  roots: ["<rootDir>/test"],
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
