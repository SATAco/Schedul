"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ChevronLeft, Pin } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { trackSectionUsage } from "@/utils/usage-tracker"
import PageTransition from "@/components/page-transition"

export default function NoticesPage() {
  useEffect(() => {
    // Track notices usage
    trackSectionUsage("notices")
  }, [])

  // Mock data
  const categories = ["All", "General", "Senior", "Junior", "Sports", "Events"]
  const currentDate = "May 11, 2025"

  const notices = [
    {
      id: 1,
      title: "School Assembly",
      content: "There will be a whole school assembly on Monday at 9:00 AM in the Great Hall.",
      category: "General",
      date: "May 11, 2025",
      isPinned: true,
    },
    {
      id: 2,
      title: "Year 12 Trial Exams",
      content: "Year 12 trial exams will commence on June 1st. Please check the exam timetable on the school website.",
      category: "Senior",
      date: "May 10, 2025",
      isPinned: true,
    },
    {
      id: 3,
      title: "Basketball Trials",
      content: "Basketball trials for the school team will be held on Wednesday after school in the gym.",
      category: "Sports",
      date: "May 9, 2025",
      isPinned: false,
    },
    {
      id: 4,
      title: "Debating Competition",
      content:
        "The inter-school debating competition will be held next Friday. All participants must attend the briefing on Tuesday.",
      category: "Events",
      date: "May 8, 2025",
      isPinned: false,
    },
    {
      id: 5,
      title: "Year 7 Excursion",
      content:
        "Year 7 students will be going on an excursion to the museum on Thursday. Permission slips must be returned by Monday.",
      category: "Junior",
      date: "May 7, 2025",
      isPinned: false,
    },
  ]

  return (
    <PageTransition>
      <div className="container max-w-lg mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-gray-500 dark:text-gray-400">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold">Daily Notices</h1>
          <div className="w-6"></div> {/* Empty div for spacing */}
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">{currentDate}</p>

        <Tabs defaultValue="All" className="mb-6">
          <TabsList className="grid grid-cols-3 mb-4 sm:grid-cols-6">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="text-xs">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="space-y-4">
                {notices
                  .filter((notice) => category === "All" || notice.category === category)
                  .map((notice) => (
                    <Card
                      key={notice.id}
                      className="rounded-[1.5rem] bg-white dark:bg-gray-900 shadow-md p-5 border border-gray-100 dark:border-gray-800"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-lg font-semibold">{notice.title}</h2>
                        {notice.isPinned && <Pin className="h-4 w-4 text-blue-500" />}
                      </div>
                      <p className="text-sm mb-3">{notice.content}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                          {notice.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{notice.date}</span>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PageTransition>
  )
}
