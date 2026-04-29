import type { Config } from "tailwindcss";

export default {
  content: [
    // Nếu bạn dùng thư mục "app" ở root (Next.js 13)
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Nếu vẫn còn dùng thư mục "pages" (Next.js cũ) trong "src"
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    // Nếu bạn có thư mục "components" trong "src"
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // Nếu bạn dùng App Router trong "src/app"
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Nếu bạn có thêm thư mục "modules" hay "common"...
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/common/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xl-custom': '1001px',
      },
    },
  },
  plugins: [],
} satisfies Config;
