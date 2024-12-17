// 'use client';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactUs } from '@/components/ui/ContactTest'

export const metadata = {
    title: 'Colorado Vote Visualizer',
    description: 'Understanding how votes add up matters. It matters for big races, but it matters for smaller, down ballot races too.',
    // open graph is the preview that shows up when the site is shared
    openGraph: {
      title: 'Colorado Vote Visualizer: Contact',
      description: 'Contact the Colorado Vote Visualizer Developers.',
      url: 'https://www.coloradovotevisuals.com/contact',
      images: [
        {
          url: 'https://coloradocotevisuals.com/preview-image.png',
          width: 800,
          height: 600,
        },
      ],
    },
  };

export default function Contact() {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Header/>

        <main className='h-screen flex items-center justify-center'>
            <div className="bg-violet-100 flex rounded-lg items-left" > 
                <div className='p-20 items-center justify-center'>
                    <h1 className='text-2xl pb-2 text-gray-900'>
                        Questions? Comments? Concerns?
                    </h1>
                    <p className='text-lg text-gray-700'>
                        Reach out to the developers.
                    </p>
                    <div className='width-100%'>
                    <ContactUs/>
                    </div>
                </div>
            </div>
        </main>
        <div className='px-14'>
            <Footer/>
        </div>
            
        </div>
    )
}
