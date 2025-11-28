import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "iGaming Mini App",
	description: "Networking mini-app for iGaming industry",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`} data-theme="blue">
			<head>
				{/* Telegram WebApp SDK */}
				<script src="https://telegram.org/js/telegram-web-app.js" />
			</head>
			<body>
				{children}
				<Toaster position="top-center" richColors />
			</body>
		</html>
	);
}
