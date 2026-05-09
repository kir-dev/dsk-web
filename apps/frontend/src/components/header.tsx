import { HTMLAttributes } from 'react';
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
      <div className={'flex items-center'}>Diák Sport Kör</div>
      <div className={'flex-1 flex gap-2 justify-end items-center'}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>Sportszerek</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>Összes sportszer</DropdownMenuItem>
              <DropdownMenuItem>Bérlés</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button>Boxterem</Button>
        <Button>Gy.I.K</Button>
        {isLoggedIn ? <Button>Profil</Button> : <Button>Bejelentkezés</Button>}
      </div>
    </div>
  );
}
