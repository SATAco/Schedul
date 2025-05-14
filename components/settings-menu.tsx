"use client"

import { useState, useEffect } from "react"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar, Bell, Clock, Clipboard, Award } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [preferredSection, setPreferredSection] = useState<string>("auto")
  const router = useRouter()

  // Load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem("gdayo-most-used-preference")
    if (saved) {
      setPreferredSection(saved)
    }
  }, [])

  // Save preference when changed
  const handleSectionChange = (section: string) => {
    setPreferredSection(section)
    localStorage.setItem("gdayo-most-used-preference", section)

    // Force a refresh to update all components
    router.refresh()

    // Close dialog after selection
    setIsOpen(false)
  }

  const sections = [
    { id: "auto", label: "Automatic (based on usage)" },
    { id: "timetable", label: "Timetable", icon: <Calendar className="h-4 w-4" /> },
    { id: "notices", label: "Daily Notices", icon: <Bell className="h-4 w-4" /> },
    { id: "bell-times", label: "Bell Times", icon: <Clock className="h-4 w-4" /> },
    { id: "clipboard", label: "Clipboard", icon: <Clipboard className="h-4 w-4" /> },
    { id: "awards", label: "Award Points", icon: <Award className="h-4 w-4" /> },
  ]

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full w-10 h-10 transition-all duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={() => setIsOpen(true)}
      >
        <Settings className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-[1.5rem] p-5 w-full max-w-md shadow-lg max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Settings</h2>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8" onClick={() => setIsOpen(false)}>
                <span className="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </Button>
            </div>

            <div className="overflow-y-auto flex-1 pr-1 -mr-1">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Most Used Section</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Choose which section appears in the "Most Used" card
                  </p>

                  <div className="space-y-2">
                    {sections.map((section) => (
                      <div
                        key={section.id}
                        className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                          preferredSection === section.id
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                        onClick={() => handleSectionChange(section.id)}
                      >
                        {section.icon && <div className="mr-3">{section.icon}</div>}
                        <span className="font-medium">{section.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
