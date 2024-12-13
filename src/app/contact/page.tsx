'use client';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import ContactForm from '@/components/ui/ContactForm';

export default function Contact() {

    const emailRef = useRef<HTMLInputElement>();
    const nameRef = useRef<HTMLInputElement>();
    const [loading, setLoading] = useState(false);

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Header/>

        <main className='h-screen flex items-center justify-center'>
            <div className="bg-violet-100 flex rounded-lg w-1/2" > 
                <div className='flex-1 p-20 items-center justify-center'>
                    <h1 className='text-2xl pb-2 text-gray-900'>
                        Questions? Comments? Concerns?
                    </h1>
                    <p className='text-lg text-gray-700'>
                        Reach out to the creators.
                    </p>
                    <ContactForm/>
                </div>
            </div>
        </main>
        <div className='px-14'>
            <Footer/>
        </div>
            
        </div>
    )
}
