import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shubh Dixit | AI Researcher & Cybersecurity Developer",
  description: "Personal portfolio website of Shubh Dixit - AI Research Intern at IIT Kanpur & IIT Ropar, Cybersecurity Developer, and Founder of SeioPluse. Specializing in computer vision, deep learning, Massive MIMO CSI transformers, and security engineering.",
  keywords: ["Shubh Dixit", "AI Researcher", "Cybersecurity Developer", "Founder", "SeioPluse", "IIT Kanpur Research", "IIT Ropar Intern", "Massive MIMO", "CSI Feedback", "YOLOv8 Segmentation", "Malware Classifier"],
  authors: [{ name: "Shubh Dixit" }],
  creator: "Shubh Dixit",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Shubh Dixit | AI Researcher & Cybersecurity Developer",
    description: "Personal portfolio website of Shubh Dixit - AI Research Intern at IIT Kanpur & IIT Ropar, Cybersecurity Developer, and Founder of SeioPluse.",
    url: "https://github.com/Shubhdix9",
    siteName: "Shubh Dixit Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-gh-blue/20">
        {children}
      </body>
    </html>
  );
}
