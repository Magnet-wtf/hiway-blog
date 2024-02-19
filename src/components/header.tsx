'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

const components: { title: string; href: string; description: string }[] = [
    {
        title: 'Alert Dialog',
        href: '/docs/primitives/alert-dialog',
        description: 'A modal dialog that interrupts the user with important content and expects a response.',
    },
    {
        title: 'Hover Card',
        href: '/docs/primitives/hover-card',
        description: 'For sighted users to preview content available behind a link.',
    },
    {
        title: 'Progress',
        href: '/docs/primitives/progress',
        description: 'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
    },
    {
        title: 'Scroll-area',
        href: '/docs/primitives/scroll-area',
        description: 'Visually or semantically separates content.',
    },
    {
        title: 'Tabs',
        href: '/docs/primitives/tabs',
        description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
    },
    {
        title: 'Tooltip',
        href: '/docs/primitives/tooltip',
        description:
            'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
    },
];

export default function Header() {
    return (
        <div className={'w-full'}>
            <div className='w-full h-[56px] p-4 flex items-center justify-between shadow-xl'>
                <Link href='/'>
                    <Image src='/logo.png' alt='logo' width={45} height={45} />
                </Link>

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
            </div>
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
