import { HTMLAttributes } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header({
  isLoggedIn = false,
  className,
  ...props
}: Readonly<
  {
    isLoggedIn?: boolean;
  } & HTMLAttributes<HTMLDivElement>
>) {
  return (
    <div className={cn('h-[15dvh] bg-gray-500 flex w-full px-[2dvw]', className)} {...props}>
      <div className={'flex items-center'}>
        <Link href={'/'}>Diák Sport Kör</Link>
      </div>
      <div className={'flex-1 flex gap-2 justify-end items-center'}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>Sportszerek</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href='/equipment'>Összes sportszer</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href='/equipment/rental'>Bérlés</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button asChild>
          <Link href='/reservation'>Boxterem</Link>
        </Button>
        <Button asChild>
          <Link href='/gyik'>Gy.I.K</Link>
        </Button>
        {isLoggedIn ? (
          <Button>
            <Link href='/Profile'>Profil</Link>
          </Button>
        ) : (
          <Button>Bejelentkezés</Button>
        )}
      </div>
    </div>
  );
}
