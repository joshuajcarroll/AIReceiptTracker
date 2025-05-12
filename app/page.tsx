import { Button } from "@/components/ui/button";
import { ArrowRight, Upload } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col m-h-screen">
      {/*Hero*/}
        <section className="py-20 md:py-28 bg-gradient-to-b from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Intelligent Receipt Scanning
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Scan, analyze, and organize your receipts with AI-powered precision. Save time and gain insights from your expenses.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/receipts">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/features">
                  <Button variant="outline" className="text-blue-600 hover:bg-blue-50">
                    Learn More
                  </Button>
                </Link>
                
              </div>
            </div>
          </div>
          {/*PDF Dropzone*/}
          <div className="mt-12 flex justify-center">
            <div className="relative w-full max-w-3xl rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden dark:border-gray-800 dark:bg-gray-950 ">
              <div className="p-6 md:p-8 relative">
                <p>PDF dropzone goes here...</p>
              </div>
            </div>
          </div>

        </section>
      {/*Features*/}
        <section id="features" className="py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Powerful Features
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Our AI-powered platform transforms how you handles receipts and track expenses.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {/*Feature 1*/}
                <div className="flex flex-col items-center space-y-2 border border-gray-200 rounded-lg p-6
                 dark:border-gray-800">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                    <Upload className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold">Easy Uploads</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    Drag and drop your PDF receipts for instant scanning and processing.
                  </p>
                  </div>
              </div>
            </div>
          </div>
        </section>
      {/*Pricing*/}

      {/*Info*/}

      {/*Footer*/}
    </div>
  );
}
