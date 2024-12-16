"use client";


import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';


export default function AboutPage() {
   return (
       <div className="min-h-screen bg-white text-gray-900">
           <Header />
          
           {/* Main content section */}
           <section className="pt-4 px-14">
               <h1 className="text-3xl font-serif">About</h1>
               <p className="text-sm">The purpose, the data and the team.</p>
               <hr className="h-px my-4 bg-violet-300 border-0"></hr>
               <p className="text-m mt-4">
                   It’s hard for voters to understand trends through time on key voting issues in
                   their own counties. And journalist’s limited capacity to cover those stories with helpful graphics casts
                   more focus on national politics and legislation. National politics and legislation, by their nature,
                   do not cover most key issues for voters in the state of Colorado due to the level of dilution they face
                   on Capitol Hill. So, as a result of less localized issues and legislation being covered, voters are
                   increasingly feeling unheard, underrepresented, and untrusting in their political systems.
               </p>
              
               <p className="text-m mt-4">
                   Down ballot races and their coverage matter – as a resource for understanding changes in voters’ state, as
                   a means to feeling heard as a part of the electoral process and as a tool to institute trust in our election
                   process. Journalists need help covering these stories so that readers can get the information they need to
                   see how they’re being listened to by their government.
               </p>
              
               <p className="text-m mt-4">
                   This project aims to do just that. These graphics can be quickly embedded into a news story and understood by a reader.
                   We are dedicated to the mission of increasing transparency around our elections, and we’re proud to offer more resources
                   to voters and journalists in that pursuit.
               </p>
              
               <p className="text-m mt-4">
                   All data for these visualizations was sourced from the Colorado Secretary of State’s election database. You can find more information
                   on Colorado elections at 
                   <a
                       href="https://www.sos.state.co.us/"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="text-blue-700 hover:underline"
                       aria-label="Visit the Colorado Secretary of State's elections website"
                   >
                       https://www.sos.state.co.us/
                   </a>.
               </p>
              
               <hr className="h-px my-4 bg-violet-300 border-0" />
           </section>


           {/* Meet the Developers Section */}
           <section className="py-8 px-14">
               <h2 className="text-2xl font-bold mb-6">Meet the Developers</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                   {/* Developer 1 */}
                   <div id='image-box' className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md">
                       <img
                           src="/images/dev1.jpg"
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
                           src="/images/dev2.jpg"
                           alt="Developer 2"
                           className="w-32 h-32 rounded-full mb-4 object-cover"
                       />
                       <h3 className="font-bold text-lg mb-2">Mira Giles-Pufahl</h3>
                       <p className="text-center text-sm">
                       Mira is a computer science major and art minor at Colorado College from Milwaukee, Wisconsin. During the summer of 2024, Mira researched Generalized Implicit Neural Representation and machine learning models called neural networks. After graduation, hope to pursue a career in video game development. They enjoy crossword puzzles, ceramics, and attending to copious amounts of house plants.
                       </p>
                   </div>


                   {/* Developer 3 */}
                   <div id='image-box' className="flex flex-col items-center p-6 rounded-lg shadow-md">
                       <img
                           src="/images/dev3.jpg"
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
                           src="/images/dev4.jpg"
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
                           src="/images/dev5.jpg"
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
