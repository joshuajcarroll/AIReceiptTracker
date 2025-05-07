"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Shield } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';

function Header() {
  return (
    <div className='p-4 flex justify-between items-center'>
        <Link href="/" className='flex items-center'>
            <Shield className='w-6 h-6 text-blue-600 mr-2' />
            <h1 className='text-xl font-semibold'>Expensio</h1>
        </Link>

        <div>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <SignInButton>
                    <Button>Login</Button>
                </SignInButton>
            </SignedOut>
        </div>
        </div>
  )
}

export default Header