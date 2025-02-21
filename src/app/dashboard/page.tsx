"use client"

import React from "react";
import { useUser } from "@/firebase/useUser";
import Image from "next/image";
import { CalendarDays, Flame, Medal, Star, X } from "lucide-react";
import Link from "next/link";

const Dashboard = () => {
  const { user, userData, loading, error } = useUser();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top Welcome Section */}
      <div className="container px-4 py-6">
        <div className="flex items-center gap-4">
          <Link href="/profile">
            <Image
              src="/assets/welcome.svg"
              alt="Computer icon"
              width={64}
              height={64}
              className="h-16 w-16"
            />
          </Link>
          {user ? (
            <div className="rounded-lg bg-blue-100 px-6 py-4">
              <p className="font-urbanist">
                Welcome back,{" "}
                {userData && userData.username ? userData.username : "User"}! We
                missed you!
              </p>
            </div>
          ) : (
            <div className="rounded-lg bg-blue-100 px-6 py-4">
              <p className="font-urbanist">Please sign in.</p>
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
          {/* Main Content Area */}
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="border border-gray-300 bg-white text-gray-900 rounded shadow">
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center p-6">
                <div className="mb-6 flex items-end gap-4">
                  <Image
                    src="/assets/avatar.svg"
                    alt="Desk"
                    width={48}
                    height={48}
                    className="h-36 w-36"
                  />
                </div>
                <h1 className="mb-4 font-silkscreen text-4xl font-bold">
                  Welcome to Friday!
                </h1>
                <p className="mb-8 text-gray-600">
                  Your coding journey awaits—but first let&apos;s find something
                  to learn.
                </p>
                <Link href="/learn">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-pixel px-4 py-2 rounded-lg">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>

            {/* Explore Section */}
            <div>
              <h2 className="mb-4 font-urbanist text-2xl">Explore more</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border border-gray-300 bg-white text-gray-900 rounded shadow">
                  <div className="flex items-start gap-4 p-6">
                    <div className="flex gap-1">
                      <Image
                        src="/placeholder.svg"
                        alt="Character"
                        width={24}
                        height={24}
                        className="h-6 w-6"
                      />
                      <Image
                        src="/placeholder.svg"
                        alt="Snake"
                        width={24}
                        height={24}
                        className="h-6 w-6"
                      />
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">Challenge Packs</h3>
                      <p className="text-sm text-gray-600">
                        Practice what you learned with bite-sized code challenges.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-300 bg-white text-gray-900 rounded shadow">
                  <div className="flex items-start gap-4 p-6">
                    <Image
                      src="/placeholder.svg"
                      alt="Rocket"
                      width={32}
                      height={32}
                      className="h-8 w-8"
                    />
                    <div>
                      <h3 className="mb-2 font-semibold">Project Tutorials</h3>
                      <p className="text-sm text-gray-600">
                        Explore fun, step-by-step projects from beginner to
                        advanced.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="border border-gray-300 bg-white text-gray-900 rounded shadow">
              <div className="p-6">
                <div className="mb-6 flex items-center gap-4">
                  <Image
                    src="/assets/avatar.svg"
                    alt="Avatar"
                    width={48}
                    height={48}
                    className="h-16 w-16"
                  />
                  <div>
                    <h3 className="font-semibold">{userData.username}</h3>
                    <p className="text-sm text-gray-600">Level 1</p>
                  </div>
                </div>

                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="font-urbanist">0</div>
                      <div className="text-sm text-gray-600">Total XP</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Medal className="h-5 w-5 text-amber-600" />
                    <div>
                      <div>Bronze</div>
                      <div className="text-sm text-gray-600">Rank</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-blue-500 p-1">
                      <Star className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-urbanist">0</div>
                      <div className="text-sm text-gray-600">Badges</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-orange-500" />
                    <div>
                      <div className="font-urbanist">1</div>
                      <div className="text-sm text-gray-600">Day streak</div>
                    </div>
                  </div>
                </div>

                <button className="w-full border border-gray-300 text-gray-900 font-urbanist hover:bg-gray-200 px-4 py-2 rounded">
                  View profile
                </button>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="border border-gray-300 bg-white text-gray-900 rounded shadow">
              <div className="p-6 border-b border-gray-300">
                <h3 className="text-lg font-semibold">Upcoming Events</h3>
              </div>
              <div className="space-y-4 p-6">
                <div className="flex gap-4">
                  <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-amber-500 font-urbanist">
                    <div className="text-xs">FEB</div>
                    <div className="text-xl font-bold">5</div>
                  </div>
                  <div>
                    <h4 className="font-semibold">
                      Roast My Resume Monthly Challenge Kick-Off
                    </h4>
                    <p className="text-sm text-gray-600">
                      <CalendarDays className="mr-1 inline-block h-4 w-4" />
                      Wed Feb 5th @ 12:00pm ET
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-green-500 font-urbanist">
                    <div className="text-xs">FEB</div>
                    <div className="text-xl font-bold">27</div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Intro to Node.js Workshop</h4>
                    <p className="text-sm text-gray-600">
                      <CalendarDays className="mr-1 inline-block h-4 w-4" />
                      Thu Feb 27th @ 3:00pm ET
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-red-500 font-urbanist">
                    <div className="text-xs">MAR</div>
                    <div className="text-xl font-bold">5</div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Hacker House Chat - TBA</h4>
                    <p className="text-sm text-gray-600">
                      <CalendarDays className="mr-1 inline-block h-4 w-4" />
                      Wed Mar 5th @ 3:00pm ET
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Club Promotion */}
            <div className="relative border border-gray-300 bg-white text-gray-900 rounded shadow">
              <button className="absolute right-4 top-4 text-gray-600 hover:text-gray-900">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
              <div className="p-6">
                <h3 className="mb-2 text-sm font-semibold text-purple-400">CLUB</h3>
                <h4 className="mb-4 text-lg font-semibold">
                  Get unlimited access to learning
                </h4>
                <p className="text-sm text-gray-600">
                  Join Club to unlock all courses, get help
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
