'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { Cross, Menu, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { isMobile } from 'react-device-detect';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    return (
        <div className={'w-full flex flex-col'}>
            <div className='w-full h-[56px] p-4 flex items-center justify-between shadow-xl'>
                <Link href='/'>
                    <Image src='/logo.png' alt='logo' width={45} height={45} />
                </Link>
                {!isMobile ? (
                    <div className='flex space-x-4 items-center'>
                        <NavigationMenu className='pt-8'>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Accompagnement</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className='md:w-[300px] lg:w-[400px]'>
                                            <ListItem href='https://hiway.fr/devenir-freelance' title="On t'aide à lancer ton activité" />
                                            <ListItem
                                                href='https://hiway.fr/plateforme-accompagnement-freelance'
                                                title='On gère ta société au quotidien'
                                            />
                                            <ListItem
                                                href='https://hiway.fr/investir-patrimoine-freelance'
                                                title="On t'aide à bien préparer ton avenir"
                                            />
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link href='/temoignage' className='font-light text-sm'>
                                        Témoignages
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Ressources</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className='md:w-[300px] lg:w-[400px]'>
                                            <ListItem
                                                href='https://hiway.fr/simulateur?s=salarieClientFinal'
                                                title='Simulation revenu de freelance'
                                            />
                                            <ListItem href='/' title='Blog' />
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>

                        <Button className='rounded-full bg-[#F96547]'>Nous contacter</Button>
                        <Button variant='outline' className='rounded-full border-[#f96547] border-2'>
                            Simuler mon revenue
                        </Button>
                        <Button className='rounded-full px-2 bg-[#F96547]'>
                            <User className='h-6 w-6' />
                        </Button>
                    </div>
                ) : (
                    <div
                        className='flex space-x-4 items-center'
                        onClick={(e) => {
                            e.preventDefault();
                            setMobileMenuOpen(!mobileMenuOpen);
                        }}
                    >
                        <Menu />
                    </div>
                )}
            </div>
            {mobileMenuOpen && (
                <div className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm'>
                    <div className='flex items-center justify-between'>
                        <Link href='/' className='-m-1.5 p-1.5'>
                            <Image src='/logo.png' alt='logo' width={45} height={45} />
                        </Link>
                        <button type='button' className='-m-2.5 rounded-md p-2.5 text-white' onClick={() => setMobileMenuOpen(false)}>
                            <span className='sr-only'>Fermer</span>
                            <Cross className='h-6 w-6' aria-hidden='true' />
                        </button>
                    </div>
                    <div className='mt-6 flow-root'>
                        <div className='-my-6'>
                            {/* <div className='space-y-2 py-6'>
                                    <ListItem href='https://hiway.fr/devenir-freelance' title="On t'aide à lancer ton activité" />
                                    <ListItem
                                        href='https://hiway.fr/plateforme-accompagnement-freelance'
                                        title='On gère ta société au quotidien'
                                    />
                                    <ListItem
                                        href='https://hiway.fr/investir-patrimoine-freelance'
                                        title="On t'aide à bien préparer ton avenir"
                                    />
                                    <Link href='/temoignage' className='font-light text-sm'>
                                        Témoignages
                                    </Link>
                                    <ListItem
                                        href='https://hiway.fr/simulateur?s=salarieClientFinal'
                                        title='Simulation revenu de freelance'
                                    />
                                    <ListItem href='/' title='Blog' />
                                </div> */}

                            <div className='py-6'>
                                <Button className='rounded-full bg-[#F96547]'>Nous contacter</Button>
                                <Button variant='outline' className='rounded-full border-[#f96547] border-2'>
                                    Simuler mon revenue
                                </Button>
                                <Button className='rounded-full px-2 bg-[#F96547]'>
                                    <User className='h-6 w-6' />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
    ({ className, title, children, ...props }, ref) => {
        return (
            <>
                <NavigationMenuLink asChild>
                    <a
                        ref={ref}
                        className={cn(
                            'select-none rounded-md flex items-center px-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-[#ff4140] focus:bg-accent focus:text-[#ff4140]',
                            className,
                        )}
                        {...props}
                    >
                        <div className='text-sm font-medium leading-none'>{title}</div>
                        <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
                    </a>
                </NavigationMenuLink>
            </>
        );
    },
);
ListItem.displayName = 'ListItem';
