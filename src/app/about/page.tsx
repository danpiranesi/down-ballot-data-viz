//"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
    title: 'Colorado Vote Visualizer',
    description: 'Understanding how votes add up matters. It matters for big races, but it matters for smaller, down ballot races too.',
    // open graph is the preview that shows up when the site is shared
    openGraph: {
      title: 'Colorado Vote Visualizer: About',
      description: 'Motivation and Developers of Colorado Vote Visualizer',
      url: 'https://www.coloradovotevisuals.com/about',
      images: [
        {
          url: 'https://coloradocotevisuals.com/preview-image.png',
          width: 800,
          height: 600,
        },
      ],
    },
  };


export default function AboutPage() {
   return (
       <div className="min-h-screen bg-white text-gray-900">
           <Header />
          
           {/* Main content section */}
           <section className="pt-4 px-14">
               <h1 className="text-3xl font-serif">About</h1>
               <p className="text-sm">The purpose, the data, and the team.</p>
               <hr className="h-px my-4 bg-violet-300 border-0"></hr>
               <h2 className="text-2xl font-bold mb-2">Our Purpose:</h2>
               <p className="text-m mt-2">
               The reason behind this project was simply to make voting trends easier to understand within the state of Colorado. Understanding trends through time on key voting issues in Colorado counties is difficult for voters, partially because writing about them and keeping track of all of the down-ballot races is difficult for journalists. A newsroom's limited capacity to cover down-ballot races and trends with accurate graphics casts more focus on national politics and legislation. National politics and legislation, by their nature, do not cover most key issues for voters in the state of Colorado due to the level of dilution they face on Capitol Hill. Simultaneously,
               <a
                href="https://www.congressionalinstitute.org/2017/02/03/study-voters-frustrated-that-their-voices-are-not-heard/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
                > according to a study from the Congressional Institute
                </a> alongside studies from other peer institutions, voters are increasingly feeling unheard, underrepresented and untrusting in their political systems.
               </p>
              
               <p className="text-m mt-4">
               Down-ballot races and their coverage matter as a resource for understanding changes in voters' states, as a means to feel heard as a part of the electoral process, and as a tool to institute trust in our election process. Journalists need help covering these stories so that readers can get the information they need to see how they're being represented by their government.
               </p>
              
               <p className="text-m mt-4">
               This project aims to do just that—provide resources to journalists to make covering down-ballot races easier. These graphics can be quickly embedded into a news story and understood by a reader. We are dedicated to the mission of increasing transparency around our elections, and we're proud to offer more resources to voters and journalists in that pursuit.
               </p>
               <hr className="h-px my-4 bg-violet-300 border-0"></hr>
              
               {/* SECTION FOR DATA - TODO here links */}
               <h2 className="text-2xl font-bold my-4">How our data was sourced:</h2>
                <p className="text-m mt-4">
                All data for these visualizations was from the Colorado Secretary of States election database. Search the database of election results going back to 1908 
                <a
                href="https://historicalelectiondata.coloradosos.gov/eng/?_gl=1*1pphflz*_ga*MjIzODczMDEuMTcyODg1MDQwMA..*_ga_JDK6PLVHDW*MTczNDQ3MDkyNC4xNC4xLjE3MzQ0NzEzNjMuMC4wLjA."
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
                aria-label="Visit the Colorado Secretary of State's elections website"
                > here
                </a>. Our database is derived from csv files from searching within this database. The proposition descriptions, the pass/fail result and the margin for the given down-ballot race passing (greater than 50% for statutory races and greater than 55% for constitutional races) was manually inputted.
                
                </p>


                <p className="text-m mt-4">
                All statewide ballot measures from 1880 to 2024 are recorded by the Colorado Secretary of State's Office and can be found
                <a
                href="https://www.leg.state.co.us/lcs/ballothistory.nsf/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
                > here
                </a>. 
                </p>

                <p className="text-m mt-4">
                The Colorado Secretary of State's Office also records election results going back to 1902, linked
                <a
                href="https://www.coloradosos.gov/pubs/elections/Results/Archives.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
                aria-label="Visit the Colorado Secretary of State's elections website"
                > here
                </a>.
                </p>

                <p className="text-m mt-4">
                The National Conference of State Legislatures keeps track of all down-ballot races going back to 1925 for all states; their database also offers topic search functionality. Explore it 
                <a
                href="https://app.powerbi.com/view?r=eyJrIjoiYjEwNDI2NTctZDFkMy00ZGM4LWFkMTItNTcwYTdkZmMxMGIxIiwidCI6IjM4MmZiOGIwLTRkYzMtNDEwNy04MGJkLTM1OTViMjQzMmZhZSIsImMiOjZ9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
                aria-label="Visit the Colorado Secretary of State's elections website"
                > here
                </a>.
                </p>
               
                <hr className="h-px mt-4 bg-violet-300 border-0" />
            </section>
           {/* Meet the Developers Section */}
           <section className="py-4 px-14">
               <h2 className="text-2xl font-bold mb-4">Meet the Developers</h2>
               <p className="text-m my-4">
               This project was built as a thesis project for five computer science students at Colorado College. To reach the developers shoot an email to coloradovotevisuals@gmail.com or submit site feedback via our contact form
               <a
                href="https://www.coloradovotevisuals.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
                > here
                </a>.
               </p>

               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                   {/* Developer 1 - Leigh Walden */}
                   <div id='image-box' className="flex flex-col items-center p-6 rounded-lg shadow-md h-[550px]">
                       <div className="flex flex-col items-center flex-grow overflow-hidden h-[450px]">
                           <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center bg-white mb-4">
                               <img
                                   src="/leigh_HS.png"
                                   alt="Developer 1"
                                   className="h-full w-auto object-cover"
                               />
                           </div>
                           <h3 className="font-bold text-lg mb-2">Leigh Walden</h3>
                           <div className="text-center overflow-y-auto">
                             <p className="text-sm">
                             Leigh is a journalism and computer science student at Colorado College from Larkspur, Colorado. With election coverage experience ranging from the Washington Desk at National Public Radio to the breaking news desk at The Denver Post, Leigh has seen firsthand some of the gaps in reporting around issues especially relevant to Colorado voters. When Leigh's not writing or coding or reporting you can probably find her under a pile of books.
                             </p>
                           </div>
                       </div>
                       <div className="flex space-x-4 mt-4 w-full justify-center">
                           <a 
                               href="https://github.com/waldenlr" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center"
                               aria-label="Leigh Walden's GitHub"
                           >
                               <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                   <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                               </svg>
                           </a>
                       </div>
                   </div>

                   {/* Developer 2 - Mira Giles-Pufahl */}
                   <div id='image-box' className="flex flex-col items-center p-6 rounded-lg shadow-md h-[550px]">
                       <div className="flex flex-col items-center flex-grow overflow-hidden h-[450px]">
                           <img
                               src="/mira_HS.png"
                               alt="Developer 2"
                               className="w-32 h-32 rounded-full mb-4 object-cover"
                           />
                           <h3 className="font-bold text-lg mb-2">Mira Giles-Pufahl</h3>
                           <div className="text-center overflow-y-auto">
                             <p className="text-sm">
                             Mira is a computer science major and art minor at Colorado College from Milwaukee, Wisconsin. During the summer of 2024, Mira researched Generalized Implicit Neural Representation and machine learning models called neural networks. After graduation, Mira hopes to pursue a career in video game development. They enjoy crossword puzzles, ceramics, and attending to copious amounts of house plants.
                             </p>
                           </div>
                       </div>
                       <div className="flex space-x-4 mt-4 w-full justify-center">
                           <a 
                               href="https://www.linkedin.com/in/mira-giles-pufahl-439123260/" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                               aria-label="Mira Giles-Pufahl's LinkedIn"
                           >
                               <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                   <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                               </svg>
                           </a>
                           <a 
                               href="https://github.com/miragitting" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center"
                               aria-label="Mira Giles-Pufahl's GitHub"
                           >
                               <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                   <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                               </svg>
                           </a>
                       </div>
                   </div>

                   {/* Developer 3 - Oliver Ramirez */}
                   <div id='image-box' className="flex flex-col items-center p-6 rounded-lg shadow-md h-[550px]">
                       <div className="flex flex-col items-center flex-grow overflow-hidden h-[450px]">
                           <img
                               src="/Ram_HS.png"
                               alt="Developer 3"
                               className="w-32 h-32 rounded-full mb-4 object-cover"
                           />
                           <h3 className="font-bold text-lg mb-2">Oliver Ramirez</h3>
                           <div className="text-center overflow-y-auto">
                             <p className="text-sm">
                             Oliver Ramirez is a computer science major and mathematics minor at Colorado College from Fort Collins, Colorado. He has enjoyed applying his skills developed as a computer science major and software engineer to election results that have significant impacts on his home state. He also enjoys soccer, kayaking on the rivers of the Rocky Mountains and playing card games.
                             </p>
                           </div>
                       </div>
                       <div className="flex space-x-4 mt-4 w-full justify-center">
                           <a 
                               href="https://www.linkedin.com/in/oliver-ramirez04/" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                               aria-label="Oliver Ramirez's LinkedIn"
                           >
                               <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                   <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                               </svg>
                           </a>
                           <a 
                               href="https://github.com/oliverRamirez4" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center"
                               aria-label="Oliver Ramirez's GitHub"
                           >
                               <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                   <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                               </svg>
                           </a>
                       </div>
                   </div>

                   {/* Developer 4 - Oliver Kendall */}
                   <div id='image-box' className="flex flex-col items-center p-6 rounded-lg shadow-md h-[550px]">
                       <div className="flex flex-col items-center flex-grow overflow-hidden h-[450px]">
                           <img
                               src="/kendall_HS.png"
                               alt="Developer 4"
                               className="w-32 h-32 rounded-full mb-4 object-cover"
                           />
                           <h3 className="font-bold text-lg mb-2">Oliver Kendall</h3>
                           <div className="text-center overflow-y-auto">
                             <p className="text-sm">
                             Oliver is a graduate from Colorado College, majoring in Computer Science and History. Originally from South Carolina, he has worked for several years as an outdoor educator at Elk Creek Ranch in Wyoming, leading teens on backpacking and horsemanship trips. Oliver hopes to continue pursuing computer science after college.
                             </p>
                           </div>
                       </div>
                       <div className="flex space-x-4 mt-4 w-full justify-center">
                           <a 
                               href="https://www.linkedin.com/in/oliver-kendall-1a8452253/" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                               aria-label="Oliver Kendall's LinkedIn"
                           >
                               <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                   <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                               </svg>
                           </a>
                           <a 
                               href="https://github.com/ohk99" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center"
                               aria-label="Oliver Kendall's GitHub"
                           >
                               <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                   <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                               </svg>
                           </a>
                       </div>
                   </div>

                   {/* Developer 5 - Dan Schmidt */}
                   <div id='image-box' className="flex flex-col items-center p-6 rounded-lg shadow-md h-[550px]">
                       <div className="flex flex-col items-center flex-grow overflow-hidden h-[450px]">
                           <img
                               src="/dan_HS.png"
                               alt="Developer 5"
                               className="w-32 h-32 rounded-full mb-4 object-cover"
                           />
                           <h3 className="font-bold text-lg mb-2">Dan Schmidt</h3>
                           <div className="text-center overflow-y-auto">
                             <p className="text-sm">
                               Dan is a computer science student at Colorado College. Originally from Central Oregon, he enjoys biking, filmmaking, and reading. Dan hopes to outpace AI in his ability to design and build thought provoking digital experiences.
                             </p>
                           </div>
                       </div>
                       <div className="flex space-x-4 mt-4 w-full justify-center">
                           <a 
                               href="https://www.linkedin.com/in/danwschmidt/" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                               aria-label="Dan Schmidt's LinkedIn"
                           >
                               <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                   <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                               </svg>
                           </a>
                           <a 
                               href="https://github.com/danpiranesi" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center"
                               aria-label="Dan Schmidt's GitHub"
                           >
                               <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                   <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                               </svg>
                           </a>
                       </div>
                   </div>
               </div>
           </section>


           <div className='px-14'><Footer /></div> 
       </div>
   );
}

