"use client"

import { useState, useEffect } from "react";
import { useTimetable } from "@/contexts/timetable-context";
import { getNextBell, formatCountdown, formatTimeTo12Hour } from "@/utils/bell-utils";
import { getCurrentDay, isWithinSchoolHours } from "@/utils/time-utils";
import { Clock, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function BellCountdown() {
  const { bellTimes } = useTimetable();
  const [countdown, setCountdown] = useState("00:00");
  const [nextBellInfo, setNextBellInfo] = useState({
    nextBell: null,
    isCurrentlyInPeriod: false,
    currentPeriod: null,
  });

  // Determine the schedule based on the current day
  const getBellTimesSchedule = () => {
    const currentDay = getCurrentDay() || "Monday"; // Ensure default fallback
    if (["Monday", "Tuesday"].includes(currentDay)) return "Mon/Tues";
    if (["Wednesday", "Thursday"].includes(currentDay)) return "Wed/Thurs";
    if (currentDay === "Friday") return "Fri";
    return "Mon/Tues"; // Default case
  };

  useEffect(() => {
    const updateCountdown = () => {
      const currentSchedule = getBellTimesSchedule();
      const currentBellTimes = bellTimes[currentSchedule];

      if (!currentBellTimes) {
        console.warn(`No bell times found for schedule: ${currentSchedule}`);
        return;
      }

      const nextBell = getNextBell(currentBellTimes);
      setNextBellInfo(nextBell);

      const formattedCountdown = formatCountdown(nextBell?.time);
      setCountdown(formattedCountdown);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000); // Update every second

    return () => clearInterval(interval);
  }, [bellTimes]); // Ensure effect runs when bellTimes change

  return (
    <Card>
      <div className="flex flex-col items-center">
        <Clock />
        <span>{countdown}</span>
        {nextBellInfo.nextBell && (
          <div>
            <Bell />
            <span>Next: {nextBellInfo.nextBell.period} at {formatTimeTo12Hour(nextBellInfo.nextBell.time)}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
