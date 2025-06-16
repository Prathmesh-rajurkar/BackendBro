import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

import { enUS } from '@clerk/localizations';

const customLocalization = {
  ...enUS,
  signUp: {
    ...enUS.signUp,
    start: {
      ...enUS.signUp?.start,
      title: "Join the BackendBro Fam!",  // <-- your custom header
    },
    // You can also customize other texts here
  },
};

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BackendBro - AI Database Designer',
  description: 'Generate AI-powered database models and ER diagrams',
}
import "./globals.css";
import { Belanosima } from "next/font/google";

const belanosima = Belanosima({
  subsets: ["latin"],
  weight: ["400", "700"], // optional
  variable: "--font-belanosima", // for use with Tailwind
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={customLocalization}>
      <html lang="en">
        <body className={`${inter.className} ${belanosima.variable}`}>
          <div className="min-h-screen">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
