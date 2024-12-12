"use client"

import { Header } from '@/components/layout/Header';

export default function AboutPage() {
    return (
    <div className="min-h-screen bg-white text-gray-900">
        <Header />
        <div className="py-4 px-14 ">
          <h1 className="text-3xl font-serif">About</h1>
          <p className="text-sm">It’s hard for voters to understand trends through time on key voting issues in 
          their own counties. And journalist’s limited capacity to cover those stories with helpful graphics casts 
          more focus on national politics and legislation. National politics and legislation, by their nature, 
          do not cover most key issues for voters in the state of Colorado due to the level of dilution they face
           on Capitol Hill. So, as a result of less localized issues and legislation being covered, voters are 
           increasingly feeling unheard, underrepresented and untrusting in their political systems. 
           
           Down ballot races and their coverage matter – as a resource for understanding changes in voters’ state, as 
           a means to feeling heard as a part of the electoral process and as a tool to institute trust in our election 
           process. Journalists need help covering these stories so that readers can get the information they need to 
           see how they’re being listened to by their government.
           
           This project aims to do just that. These graphics can be quickly embedded into a news story and understood by a reader. 
           We are dedicated to the mission of increasing transparency around our elections, and we’re proud to offer more resources 
           to voters and journalists in that pursuit.
           All data for these visualizations was from the Colorado Secretary of States election database. You can find more information 
           on Colorado elections at https://www.sos.state.co.us/. </p>
          <hr className="h-px my-4 bg-violet-300 border-0"></hr>
        </div>
      </div>

    );
};