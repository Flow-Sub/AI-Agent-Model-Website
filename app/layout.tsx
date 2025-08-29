import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "AibotAutomation - Build AI Agents for Your Business",
  description:
    "Professional AI agent automation agency helping businesses build intelligent automation solutions with 24/7 support.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <div id="app">
            {children}
            {/* <canvas></canvas> */}
          </div>
        </Suspense>
        <Analytics />
        {/* <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: `
            import { neonCursor } from 'https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js';
            
            neonCursor({
              el: document.getElementById('app'),
              shaderPoints: 16,
              curvePoints: 80,
              curveLerp: 0.5,
              radius1: 5,
              radius2: 30,
              velocityTreshold: 10,
              sleepRadiusX: 100,
              sleepRadiusY: 100,
              sleepTimeCoefX: 0.0025,
              sleepTimeCoefY: 0.0025
            });
          `,
          }}
        /> */}
        {/* <script
          type="module"
          src="https://unpkg.com/@splinetool/viewer@1.10.52/build/spline-viewer.js"
        ></script> */}
      </body>
    </html>
  )
}
