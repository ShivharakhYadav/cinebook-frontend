'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/lib/auth-context';
import { Film, LogOut, Menu, Ticket, User, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { SearchBar } from './search-bar';

export function Navigation() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fetchSuggestions = async (q: string) => {
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    return data.suggestions as string[];
  };

  return (
    <nav className='bg-card border-b border-border sticky top-0 z-50'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link
            href='/'
            className='flex items-center gap-2'
          >
            <Film className='w-8 h-8 text-primary' />
            <span className='text-xl font-bold text-primary'>CineBook</span>
          </Link>
          <div className='flex-1 mx-4 hidden md:block'>
            <SearchBar fetchSuggestions={fetchSuggestions} />
          </div>
          {/* Desktop Menu */}
          <div className='hidden md:flex items-center gap-6'>
            <Link
              href='/'
              className='text-foreground hover:text-primary transition-colors'
            >
              Movies
            </Link>

            {user ? (
              <>
                <Link
                  href='/bookings'
                  className='text-foreground hover:text-primary transition-colors flex items-center gap-2'
                >
                  <Ticket className='w-4 h-4' />
                  My Bookings
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='flex items-center gap-2'
                    >
                      <User className='w-4 h-4' />
                      {user.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className='w-4 h-4 mr-2' />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className='flex items-center gap-2'>
                <Link href='/auth/login'>
                  <Button variant='ghost'>Login</Button>
                </Link>
                <Link href='/auth/signup'>
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant='ghost'
            size='sm'
            className='md:hidden'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className='w-5 h-5' />
            ) : (
              <Menu className='w-5 h-5' />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden py-4 border-t border-border'>
            <div className='flex flex-col gap-4'>
              <Link
                href='/'
                className='text-foreground hover:text-primary transition-colors'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Movies
              </Link>

              {user ? (
                <>
                  <Link
                    href='/bookings'
                    className='text-foreground hover:text-primary transition-colors flex items-center gap-2'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Ticket className='w-4 h-4' />
                    My Bookings
                  </Link>

                  <div className='flex items-center justify-between pt-2 border-t border-border'>
                    <span className='text-sm text-muted-foreground'>
                      Logged in as {user.name}
                    </span>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={logout}
                    >
                      <LogOut className='w-4 h-4 mr-2' />
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <div className='flex flex-col gap-2 pt-2 border-t border-border'>
                  <Link
                    href='/auth/login'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button
                      variant='ghost'
                      className='w-full justify-start'
                    >
                      Login
                    </Button>
                  </Link>
                  <Link
                    href='/auth/signup'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button className='w-full'>Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
