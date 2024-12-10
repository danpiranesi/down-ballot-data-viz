'use client';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DividerVerticalIcon } from '@radix-ui/react-icons';

export default function Contact() {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Header/>

            <main className='h-screen flex items-center justify-center'>
            <form className="bg-violet-100 flex rounded-lg w-1/2">
                <div className='flex-1 p-20 items-center justify-center'>
                    <h1 className='text-2xl pb-2 text-gray-900'>
                        Questions? Comments? Concerns?
                    </h1>
                    <p className='text-lg text-gray-700'>
                        Reach out to the creators.
                    </p>
                    <div className='flex justify-between'>
                        <div className='mt-6'>
                            {/*Name input field*/}
                            <div className='pb-4'>
                                <label htmlFor='name' className='block text-med pb-2'>Name</label>
                                <input className='border-2 border-gray-500 p-2 rounded-md focus:border-violet-500' type='text' name='name' placeholder='Enter your name'/>
                            </div>
                            {/*Email input field*/}
                            <div className='pb-4'>
                                <label htmlFor='email'>Email</label>
                                <input type='email' name='email' placeholder='name@email.com'/>
                            </div>
                            
                        </div>
                        {/*Message input field*/}
                        <div className='mt-6'>
                            <div className='pb-4'>
                                <label htmlFor='message'>Message</label>
                                <input type='text' name='message' placeholder='Enter your message'/>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </main>
        </div>
    )
}
