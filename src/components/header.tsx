import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { User } from "lucide-react";

export default function Header() {
    return (
        <div className={'w-full'}>
            <div className='w-full h-[56px] p-4 flex items-center justify-between shadow-xl'>
                <Link href='/'>
                    <Image src='/logo.png' alt='logo' width={45} height={45} />
                </Link>

                <div className='flex space-x-4 items-center'>
                    <Link href='/temoignage' className="mr-8 font-light text-sm">Témoignages</Link>
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
    )
}