"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { trackSectionUsage } from "@/utils/usage-tracker"
import PageTransition from "@/components/page-transition"

export default function IDCardPage() {
  useEffect(() => {
    // Track id-card usage
    trackSectionUsage("id-card")
  }, [])

  // Mock data
  const studentInfo = {
    name: "John Smith",
    studentId: "202512345",
    yearGroup: "Year 11",
    dateOfBirth: "15/05/2008",
    expiryDate: "31/12/2025",
    barcode: "202512345",
  }

  return (
    <PageTransition>
      <div className="container max-w-lg mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-gray-500 dark:text-gray-400">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold">ID Card</h1>
          <div className="w-6"></div> {/* Empty div for spacing */}
        </div>

        <Card className="rounded-[1.5rem] bg-white dark:bg-gray-900 shadow-md p-5 border border-gray-100 dark:border-gray-800 mb-6">
          <div className="flex flex-col items-center">
            <div className="w-full bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-[1.25rem] p-4 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">G'DayO</h2>
                  <p className="text-sm opacity-90">Sydney Boys High School ID Card</p>
                </div>
                <div className="h-12 w-12 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="font-bold text-lg">SB</span>
                </div>
              </div>
            </div>

            <div className="w-full p-4">
              <div className="flex mb-4">
                <div className="w-24 h-32 bg-gray-200 dark:bg-gray-700 rounded-md mr-4 flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-500 text-xs text-center">Student Photo</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg font-bold">{studentInfo.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{studentInfo.yearGroup}</p>

                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Student ID:</span>
                      <span className="text-xs font-medium">{studentInfo.studentId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Date of Birth:</span>
                      <span className="text-xs font-medium">{studentInfo.dateOfBirth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Expiry Date:</span>
                      <span className="text-xs font-medium">{studentInfo.expiryDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Barcode</p>
                    <p className="text-xs font-mono">{studentInfo.barcode}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700">Show QR Code</Button>
          <Button variant="outline" className="w-full rounded-full">
            Report Lost Card
          </Button>
        </div>
      </div>
    </PageTransition>
  )
}
