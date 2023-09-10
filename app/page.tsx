"use client"

import {FaArrowRight} from "react-icons/fa6"
import useStoreUserEffect from "@/hooks/useStoreUserEffect";
import Link from "next/link"

export default function Home() {
  const userId = useStoreUserEffect();

  type SectionProps = {
    link: string,
    title: string,
    description: string,
  }

  const Sections = ({
    link,
    title, description
  }:SectionProps) => {
    return (
      <div className="flex flex-col gap-2 border-b last:border-b-0 py-10 border-y-light-gray">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col flex-[0.6] gap-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <p>{description}</p>
        </div>
        <div className=""></div>
      </div>
      <div className="flex justify-end items-end">
        <Link href={link}>
        <button className="flex flex-row items-center gap-2 py-2 px-4 bg-light-gray rounded-lg text-sm font-medium hover:bg-hover-light-gray transition duration-200 ease-in">Go To
        <FaArrowRight />
        </button>
        </Link>
      </div>
    </div>
    )
  }

  return (
    <main className="mt-6 p-6">
      <div className="mx-auto w-4/5 max-w-screen-lg">
        <Sections link="/quizify" title="Quizify" description="Create personalized quizzes from PDFs and text on any topic with our dynamic quiz generator." />
        <Sections link="/ai-pen" title="AI-Pen" description=" Instantly create and edit articles, essays, and blogs with powerful AI assistance." />
        <Sections link="/learn-mastery" title="Learn Mastery" description="Create, download, and plan your courses with comprehensive materials and a structured learning roadmap." />
      </div>
    </main>
  )
}
