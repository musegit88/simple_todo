"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  CheckCircle,
  List,
  Shield,
  Smartphone,
  Star,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Landing = () => {
  const year = new Date().getFullYear();
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b broder-2 bg-white/80 backdrop-blur-sm dark:bg-black/80">
        <div className="container flex items-center justify-between mx-auto p-4 md:px-6 ">
          <Link href={"/"} className="flex items-center space-x-2">
            <h2 className="font-bold">Simple</h2>
            <Image
              src={"/icon-192x192.png"}
              alt="Logo"
              width={40}
              height={40}
            />
          </Link>
          <div className="flex items-center space-x-4">
            <Link href={"/signin"}>
              <Button className="text-white bg-blue-500 hover:bg-blue-600">
                Log in
              </Button>
            </Link>
            <ModeToggle />
          </div>
        </div>
      </header>
      {/*End Header */}
      {/* Hero */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-transparent">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="max-sm:text-center space-y-4">
                <Badge className="bg-[#14b8a6]/20 text-[#14b8a6] hover:bg-blue-100 rounded-lg">
                  ✨ New: Advanced list management
                </Badge>
                <h1 className="text-4xl md:text-6xl max-sm:text-center font-extrabold">
                  Organize Your Life with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Smart Tasks
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  Manage tasks, create lists, and stay productive with our
                  simple To-Do app.
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-end gap-4">
                <Link href={"/signin"}>
                  <Button
                    variant="secondary"
                    className="px-8 text-white font-bold bg-blue-500 hover:bg-blue-600"
                  >
                    Get Started for Free
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 dark:border-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold ">Tasks</h3>
                    <Badge variant="secondary">3 tasks</Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-400/20 rounded-lg">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                      <span className="max-sm:text-sm">
                        Team meeting at 2 PM
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-400/20 rounded-lg">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                      <span className="max-sm:text-sm">
                        Update documentation
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-400/20 rounded-lg border border-green-500">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="max-sm:text-sm">
                        Review project proposal
                      </span>
                      <Star className="h-4 w-4 text-yellow-500 ml-auto" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
      {/* End Hero */}
      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Everything you need to stay organized
            </h2>
            <p className="text-xl dark:text-gray-400 max-w-2xl mx-auto">
              Powerful features designed to help you manage tasks efficiently
              and boost your productivity
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="dark:bg-slate-900 border shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex items-center justify-center mx-auto w-12 h-12 bg-[#6366f1]/20 rounded-lg">
                  <Calendar className="w-6 h-6 text-[#6366f1]" />
                </div>
                <h3 className="text-xl font-semibold text-[#6366f1]">My Day</h3>
                <p className="">
                  Focus on what matters today with your personalized daily task
                  view
                </p>
              </CardContent>
            </Card>
            <Card className="dark:bg-slate-900 border shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex items-center justify-center mx-auto w-12 h-12 bg-[#d946ef]/20 rounded-lg">
                  <Star className="w-6 h-6 text-[#d946ef]" />
                </div>
                <h3 className="text-xl font-semibold text-[#d946ef]">
                  Important Tasks
                </h3>
                <p className="">
                  Mark and track your most critical tasks to never miss
                  what&apos;s important
                </p>
              </CardContent>
            </Card>
            <Card className="dark:bg-slate-900 border shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex items-center justify-center mx-auto w-12 h-12 bg-[#22c55e]/20 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-[#22c55e]" />
                </div>
                <h3 className="text-xl font-semibold text-[#22c55e]">
                  Completed
                </h3>
                <p className="">
                  Track your progress and celebrate achievements with completed
                  task history
                </p>
              </CardContent>
            </Card>
            <Card className="dark:bg-slate-900 border shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex items-center justify-center mx-auto w-12 h-12 bg-[#14b8a6]/20 rounded-lg">
                  <List className="w-6 h-6 text-[#14b8a6]" />
                </div>
                <h3 className="text-xl font-semibold text-[#14b8a6]">
                  Custom Lists
                </h3>
                <p className="">
                  Create unlimited lists to organize tasks by project, category,
                  or any way you prefer
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* End Features */}
      {/* How It Works */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Simple workflow, powerful results
            </h2>
            <p className="text-xl dark:text-gray-400 max-w-2xl mx-auto">
              Get started in minutes and transform how you manage your daily
              tasks
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-600 text-2xl text-white font-bold rounded-full mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Create Your Tasks
              </h3>
              <p className="dark:text-gray-400">
                Quickly add tasks to your inbox or directly to custom lists. Set
                priorities and due dates effortlessly.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-600 text-2xl text-white font-bold rounded-full mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Organize & Prioritize
              </h3>
              <p className="dark:text-gray-400">
                Use My Day for daily focus, mark important tasks, and organize
                everything with custom lists.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-600 text-2xl text-white font-bold rounded-full mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Track Progress
              </h3>
              <p className="dark:text-gray-400">
                Complete tasks, track your achievements, and maintain momentum
                with visual progress indicators.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold">
                  Why you choose{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    simple todo
                  </span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Built for modern productivity with features that actually help
                  you get things done.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-lg ">
                    <Zap className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semi-bold text-blue-600 mb-2">
                      Lightning Fast
                    </h3>
                    <p className="text-gray-600">
                      Add tasks in seconds, not minutes. Our streamlined
                      interface keeps you focused on what matters.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-lg ">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semi-bold text-green-600 mb-2">
                      Secure & Private
                    </h3>
                    <p className="text-gray-600">Your data is secure.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-lg ">
                    <Smartphone className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semi-bold text-purple-600 mb-2">
                      Works Everywhere
                    </h3>
                    <p className="text-gray-600">
                      Access your tasks from any device. Seamless sync keeps
                      everything up to date.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/assets/images/3d-render-hand.png"
                alt="3d-render-hand.png"
                width={600}
                height={600}
              />
            </div>
          </div>
        </div>
      </section>
      {/* End Benefits Section */}
      {/* Call to action */}
      <section className="dark:bg-transparent bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="relative">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="font-bold text-3xl lg:text-4xl">
                Ready to transform your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  productivity
                </span>{" "}
                ?
              </h2>
              <p className="text-xl text-gray-600">
                Join simple todo and start your journey today.
              </p>
              <div className="flex items-center justify-center">
                <Link href={"/signin"}>
                  <Button className="px-8 text-white font-bold bg-blue-500 hover:bg-blue-600">
                    Get Started for Free
                  </Button>
                </Link>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </section>
      {/* End Call to action */}
      {/* End How It Works */}
      <footer className="py-12">
        <div className="container mx-auto px-4">
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>&copy; {year} Simple Todo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
