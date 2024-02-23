import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import localFont from 'next/font/local';
import { use } from 'react';
import wpService from '@/lib/wordpress/wp-service';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    preload: true,
    display: 'swap',
});

const jekoFont = localFont({
    src: '../styles/Jeko-Medium.woff2',
    variable: '--font-jeko',
    preload: true,
    display: 'swap',
});

const jekoBoldFont = localFont({
    src: '../styles/Jeko-Bold.woff2',
    variable: '--font-jekobold',
    preload: true,
    display: 'swap',
});

const jekoBlackFont = localFont({
    src: '../styles/Jeko-Black.woff2',
    variable: '--font-jekoblack',
    preload: true,
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const categories = use(wpService.getCategories());
    const tags = use(wpService.getTags());
    return (
        <html lang='en'>
            <body className={`${inter.variable} ${jekoBlackFont.variable} ${jekoBoldFont.variable} ${jekoFont.variable}`}>
                <Header categories={categories} tags={tags} />
                {children}
                <Footer />
            </body>
        </html>
    );
}
