/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // compiler: {
  //   removeConsole: {
  //     exclude: ['error'],
  //   },
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gongbang-v2.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
  webpack: (config) => {
    // 기존 웹팩 설정에 추가할 설정을 여기에 작성합니다.
    // 예를 들어, .woff 파일을 위한 설정:
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[hash][ext][query]',
      },
    });

    return config; // 변경된 설정을 반환합니다.
  },
};

export default nextConfig;
