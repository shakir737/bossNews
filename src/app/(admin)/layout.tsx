
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import ScrollToTop from "@/components/ScrollToTop";
import "../../styles/index.css";
import "../../styles/prism-vsc-dark-plus.css";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   
  
   
  return (
<html suppressHydrationWarning={true} className="!scroll-smooth" lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1685818630286592"
     crossOrigin="anonymous"></script>
      <head />

      <body>
     
      
             
   <div className="h-screen flex">
      {/* LEFT */}
      <div className=" md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <Link
          href="/"
          className="flex items-center justify-center w-full -mt-10"
        >
          <Image src="/images/logo/logo1.svg" alt="logo" width={140} height={62} />
         
        </Link>
        <Menu />
      </div>
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
      
              <ScrollToTop />

      </body>
    </html>


    
  

  );
}
