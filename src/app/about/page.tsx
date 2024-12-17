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
               The reason behind this project was simply to make voting trends easier to understand within the state of Colorado. Understanding trends through time on key voting issues in Colorado counties is difficult for voters, partially because writing about them and keeping track of all of the down-ballot races is difficult for journalists. A newsroom’s limited capacity to cover down-ballot races and trends with accurate graphics casts more focus on national politics and legislation. National politics and legislation, by their nature, do not cover most key issues for voters in the state of Colorado due to the level of dilution they face on Capitol Hill. Simultaneously,
               <a
                href="https://www.congressionalinstitute.org/2017/02/03/study-voters-frustrated-that-their-voices-are-not-heard/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
                > according to a study from the Congressional Institute
                </a> alongside studies from other peer institutions, voters are increasingly feeling unheard, underrepresented and untrusting in their political systems.
               </p>
              
               <p className="text-m mt-4">
               Down-ballot races and their coverage matter as a resource for understanding changes in voters’ states, as a means to feel heard as a part of the electoral process, and as a tool to institute trust in our election process. Journalists need help covering these stories so that readers can get the information they need to see how they’re being represented by their government.
               </p>
              
               <p className="text-m mt-4">
               This project aims to do just that—provide resources to journalists to make covering down-ballot races easier. These graphics can be quickly embedded into a news story and understood by a reader. We are dedicated to the mission of increasing transparency around our elections, and we’re proud to offer more resources to voters and journalists in that pursuit.
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
                All statewide ballot measures from 1880 to 2024 are recorded by the Colorado Secretary of State’s Office and can be found
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
                href="https://www.coloradovotevisuals.com/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
                > here
                </a>.
               </p>

               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                   {/* Developer 1 */}
                   <div id='image-box' className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md">
                       <img
                           src="/leigh_HS.png"
                           alt="Developer 1"
                           className="w-32 h-32 rounded-full mb-4 object-cover"
                       />
                       <h3 className="font-bold text-lg mb-2">Leigh Walden</h3>
                       <p className="text-center text-sm">
                       Leigh is a journalism and computer science student at Colorado College from Larkspur, Colorado. With election coverage experience ranging from the Washington Desk at National Public Radio to the breaking news desk at The Denver Post, Leigh has seen firsthand some of the gaps in reporting around issues especially relevant to Colorado voters. When Leigh’s not writing or coding or reporting you can probably find her under a pile of books.
                       </p>
                   </div>


                   {/* Developer 2 */}
                   <div id='image-box' className="flex flex-col items-center p-6 rounded-lg shadow-md">
                       <img
                           src="/mira_HS.png"
                           alt="Developer 2"
                           className="w-32 h-32 rounded-full mb-4 object-cover"
                       />
                       <h3 className="font-bold text-lg mb-2">Mira Giles-Pufahl</h3>
                       <p className="text-center text-sm">
                       Mira is a computer science major and art minor at Colorado College from Milwaukee, Wisconsin. During the summer of 2024, Mira researched Generalized Implicit Neural Representation and machine learning models called neural networks. After graduation, Mira hopes to pursue a career in video game development. They enjoy crossword puzzles, ceramics, and attending to copious amounts of house plants.
                       </p>
                   </div>


                   {/* Developer 3 */}
                   <div id='image-box' className="flex flex-col items-center p-6 rounded-lg shadow-md">
                       <img
                           src="/Ram_HS.png"
                           alt="Developer 3"
                           className="w-32 h-32 rounded-full mb-4 object-cover"
                       />
                       <h3 className="font-bold text-lg mb-2">Oliver Ramirez</h3>
                       <p className="text-center text-sm">
                       Oliver Ramirez is a computer science major and mathematics minor at Colorado College from Fort Collins, Colorado. He has enjoyed applying his skills developed as a computer science major and software engineer to election results that have significant impacts on his home state. He also enjoys soccer, kayaking on the rivers of the Rocky Mountains and playing card games.
                       </p>
                   </div>


                   {/* Developer 4 */}
                   <div id='image-box' className="flex flex-col items-center p-6 rounded-lg shadow-md">
                       <img
                           src="/kendall_HS.png"
                           alt="Developer 4"
                           className="w-32 h-32 rounded-full mb-4 object-cover"
                       />
                       <h3 className="font-bold text-lg mb-2">Oliver Kendall</h3>
                       <p className="text-center text-sm">
                       Oliver is a graduate from Colorado College, majoring in Computer Science and History. Originally from South Carolina, he has worked for several years as an outdoor educator at Elk Creek Ranch in Wyoming, leading teens on backpacking and horsemanship trips. Oliver hopes to continue pursuing computer science after college.
                       </p>
                   </div>


                   {/* Developer 5 */}
                   <div id='image-box' className="flex flex-col items-center p-6 rounded-lg shadow-md">
                       <img
                           src="/dan_HS.png"
                           alt="Developer 5"
                           className="w-32 h-32 rounded-full mb-4 object-cover"
                       />
                       <h3 className="font-bold text-lg mb-2">Dan Schmidt</h3>
                       <p className="text-center text-sm">
                           Dan is an undercover CIA operative. Limited information about "Dan Schmidt" is known.
                       </p>
                   </div>
               </div>
           </section>


           <div className='px-14'><Footer /></div> 
       </div>
   );
}

