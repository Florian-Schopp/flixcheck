import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export type ConfigType = {
  src: string;
  entry: string;
  out: string;
  title: string;
  icon: string;
  template: string;
};

export const common = (config: ConfigType) => ({
  context: config.src,
  entry: config.entry,
  output: {
    path: config.out,
    publicPath: "/",
    clean: true,
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: "ts-loader",
        test: /\.(tsx?)|(js)$/,
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: config.title,
      favicon: config.icon,
      template: config.template,
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".css"],
  },
});

const endpoints = ["/api"];

const config = {
  entry: "./index.tsx",
  title: "Find your IP Location",
  icon: "../public/favicon.ico",
  template: "../public/index.html",
  src: path.resolve(__dirname, "src"),
  out: path.resolve(__dirname, "build"),
};

export default (env: { ip: string }) => {
  console.log(env);
  switch (process.env.NODE_ENV) {
    case "development":
      return {
        ...common(config),
        mode: "development",
        devtool: "eval-cheap-module-source-map",
        devServer: {
          client: {
            progress: true,
          },
          allowedHosts: "all",
          historyApiFallback: true,
          watchFiles: ["src/**/*"],
          proxy: [
            {
              context: endpoints,
              target: "http://localhost:4000",
            },
          ],
        },
      };
    default:
      return {
        ...common(config),
        mode: "production",
        devtool: false,
        stats: {
          logging: true,
        },
        performance: {
          hints: false,
          maxEntrypointSize: 512000,
          maxAssetSize: 512000,
        },
      };
  }
};
