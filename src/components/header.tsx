'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { Cross, CrossIcon, Menu, User, X } from 'lucide-react';
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
import { WP_REST_API_Term } from 'wp-types';
import { useParams } from 'next/navigation';

export default function Header({ categories, tags }: { categories: WP_REST_API_Term[]; tags: WP_REST_API_Term[] }) {
    const params = useParams();
    const selectedCategory = categories.find((category) => category.slug === params.slug);
    const selectedTag = tags.find((tag) => tag.slug === params.slug);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
        <div className={'w-full flex flex-col'}>
            <div className='w-full h-[68px] p-4 flex items-center justify-between shadow-xl'>
                {isMobile && (
                    <Button className='rounded-full px-2 bg-transparent'>
                        <User className='h-6 w-6 text-black' />
                    </Button>
                )}
                <Link href='/' className='pl-[42px]'>
                    <Image src='/logo-hiway.svg' alt='logo' width={60} height={60} />
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
                            Simuler mon revenu
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
                    <div className='flex items-center justify-end'>
                        <button type='button' className='-m-2.5 rounded-md p-2.5 text-black' onClick={() => setMobileMenuOpen(false)}>
                            <span className='sr-only'>Fermer</span>
                            <X className='h-6 w-6' aria-hidden='true' />
                        </button>
                    </div>
                    <div className='mt-6 flow-root'>
                        <div className='-my-6'>
                            <div className='space-y-2 py-6 flex flex-col'>
                                <Link href='https://hiway.fr/devenir-freelance' className='text-lg font-medium'>
                                    On t&apos;aide à lancer ton activité
                                </Link>
                                <Link href='https://hiway.fr/plateforme-accompagnement-freelance' className='font-medium text-lg'>
                                    On gère ta société au quotidien
                                </Link>
                                <Link href='https://hiway.fr/investir-patrimoine-freelance' className='font-medium text-lg'>
                                    On t&apos;aide à bien préparer ton avenir
                                </Link>
                                <Link href='/temoignage' className='font-light text-lg'>
                                    Témoignages
                                </Link>
                                <Link href='https://hiway.fr/simulateur?s=salarieClientFinal' className='font-medium text-lg'>
                                    Simulation revenu de freelance
                                </Link>
                                <div className={'flex flex-col mt-12'}>
                                    <Link href={'/'} className={'text-lg font-bold font-jekobold text-[#ff4140] pb-2'}>
                                        Tout les sujets
                                    </Link>
                                    {categories.map((category) => (
                                        <Link
                                            key={category.id}
                                            href={`/category/${category.slug}`}
                                            className={`font-medium text-lg pb-1 hover:text-[#ff4140] ${
                                                selectedCategory && selectedCategory.id === category.id && 'font-jekoblack'
                                            }`}
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>

                                <div className={'flex flex-col mt-12'}>
                                    <Link href={'/'} className={'text-lg font-jekobold text-[#ff4140] pb-2'}>
                                        Toutes les situations
                                    </Link>
                                    {tags.map((tag) => (
                                        <Link
                                            key={tag.id}
                                            href={`/tag/${tag.slug}`}
                                            className={`font-medium text-lg pb-1 hover:text-[#ff4140] ${
                                                selectedTag && selectedTag.id === tag.id && 'font-jekoblack'
                                            }`}
                                        >
                                            {tag.name}
                                        </Link>
                                    ))}
                                </div>
                                <Link href='/' title='Blog' />
                            </div>

                            <div className='py-6 flex flex-col space-y-6'>
                                <Button className='rounded-full bg-[#F96547]'>Nous contacter</Button>
                                <Button variant='outline' className='rounded-full border-[#f96547] border-2'>
                                    Simuler mon revenu
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
