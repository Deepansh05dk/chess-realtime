import React from 'react'
import Link from 'next/link'

export function Logo() {
    return (
        <Link href="/" className="flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <img src="/logo.svg" className="h-8" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">ChessPlay.com</span>
        </Link>
    )
}
