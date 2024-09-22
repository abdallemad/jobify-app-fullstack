import db from "@/utils/db";
import Image from "next/image";
import Logo from '@/assets/logo.svg'
import landingImage from '@/assets/main.svg'
import { Button } from "@/components/ui/button";
import Container from "@/components/globals/Container";
import Link from "next/link";
export default function Home() {
  return (
    <Container>
      <main>
      <header className="py-8">
        <Image  src={Logo} alt="logo" width={200} height={200} className="object-cover "/>
      </header>
      <section className="grid h-[80vh] lg:grid-cols-[1fr,400px] items-center">
        <div>
          <h1 className="capitalize text-4xl md:text-7xl font-bold">
            job <span className="text-primary">tracking</span> app
          </h1>
          <p className="leading-loose max-w-md mt-4 text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime doloribus rem dolor debitis iusto amet ipsam reiciendis! Alias incidunt numquam quod animi rem. Architecto, odio tempore ratione placeat doloribus ipsam?
          </p>
          <Button asChild className="mt-8" size={'lg'}>
            <Link href="/add-job">Get Started</Link>
          </Button>
        </div>
        <Image 
          src={landingImage} 
          alt="landing image" 
          width={400} 
          height={400} 
          className="object-cover hidden lg:block" />
      </section>
      </main>
    </Container>
  );
}
