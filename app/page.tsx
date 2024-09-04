import Link, { LinkProps } from "next/link";
import Image from "next/image";
import { FC } from "react";
import { cn } from "@/lib/utils";
import VercelLogo from "@/public/vercel.svg";
import { Clock, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="min-h-screen">
      {/* <header className="container flex items-center justify-between py-8"></header> */}
      <Header />

      <Hero />

      {/* <main className="mx-auto flex w-full max-w-4xl grow flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="text-center"> */}
      {/* <p className="text-lg font-semibold text-primary-600 sm:text-2xl">
              Howdy, developer!
            </p> */}
      {/* <h1 className="mt-4 text-3xl font-bold tracking-tight dark:invert sm:text-4xl lg:text-6xl">
              Organiza y ahorra tiempo en tus compras
            </h1>
            <div className="mx-auto mt-8 max-w-4xl">
              <p className="text-lg leading-8 dark:text-gray-200">
                Bienvenido, a listoSmart, cree listas de compras inteligentes
                para una experiencia de compra rápida y eficiente, organice
                compras fácilmente, realice un seguimiento del progreso y
                aumente el tiempo libre. Di adiós al caos de las listas de
                compras en papel, hola a la eficiencia. empieza ahora!!!
              </p>
            </div> */}
      {/* <div className="mt-12 flex items-center justify-center space-x-3">
              <Link
                href="/about"
                className="inline-flex items-center rounded-md border border-transparent bg-primary px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
              >
                Example about page
              </Link>
              <ExternalLink
                href="https://beta.nextjs.org/docs"
                className="inline-flex items-center rounded-md border border-transparent bg-primary-100 px-6 py-4 text-base font-medium text-primary-600 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Learn about Next.js
              </ExternalLink>
            </div> */}
      {/* </div>
        </div> */}
      {/* <div className="mt-4 flex items-center justify-center">
          <ExternalLink
            href="https://vercel.com?utm_source=next-start&utm_medium=next-start&utm_campaign=next-start"
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          >
            <span className="font-medium dark:invert">Hosted at</span>
            <Image
              src={VercelLogo}
              alt="Vercel Logo"
              className="h-5 w-auto dark:invert"
              priority
            />
          </ExternalLink>
        </div> */}
      {/* </main> */}

      {/* <footer className="mx-auto w-full max-w-7xl shrink-0 px-4 sm:px-6 lg:px-8">
        <p className="flex justify-center">
          <span className="mr-1 text-gray-600 dark:text-gray-200">
            Brought to you by
          </span>
          <ExternalLink
            href="https://twitter.com/riipandi"
            className="group inline-flex items-center space-x-1 text-primary-800 hover:text-red-600 dark:text-primary-500 dark:hover:text-primary-700"
          >
            <span>Aris Ripandi</span>
            <span className="i-heroicons-arrow-top-right-on-square dark:invert" />
          </ExternalLink>
        </p>
      </footer> */}
    </section>
  );
}

function Header() {
  return (
    <header className="py-4 border shadow-sm">
      <div className="container flex items-center justify-between">
        <p className="flex items-center text-2xl">
          <span className="font-extrabold">list</span>
          <span>
            <Clock className="w-4 h-4" strokeWidth={4} />
          </span>
          <span>APP</span>
        </p>

        <div className="flex items-center gap-4">
          <ThemeToggler />
          <Button asChild>
            <Link href="/tablero">Empezar</Link>
          </Button>
          {/* <Button>Registrarse</Button> */}
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="flex flex-col items-center">
      <div className="mx-auto max-w-screen-xl px-4 py-16 lg:flex">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl text-primary">
            Organiza y ahorra tiempo en tus compras
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Bienvenido, a listoAPP, la aplicación web que te permite una
            experiencia de compra rápida y eficiente, podrás crear tu lista de
            compras y acceder fácilmente a ella desde todos tus dispositivos.
            Cree listas, organice las compras fácilmente y realice un
            seguimiento del progreso.
          </p>
          <p>
            Di adiós al caos de las listas de compras en papel, hola a la
            eficiencia. empieza ahora!!!
          </p>

          {/* <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="#"
            >
              Get Started
            </a>

            <a
              className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div> */}
        </div>
      </div>

      {/* image section */}
      {/* <img src="" width={1000} height={700} alt="alt" /> */}
      <div className="w-[1000px] h-[700px] bg-slate-400"></div>
    </section>
  );
}

interface ExternalLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

// export const ExternalLink: FC<ExternalLinkProps> = ({
//   children,
//   href,
//   className,
//   ...props
// }) => {
//   return (
//     <Link
//       href={href}
//       className={cn(className)}
//       rel="noopener noreferrer"
//       target="_blank"
//       {...props}
//     >
//       {children}
//     </Link>
//   );
// };

function ThemeToggler() {
  return (
    <>
      <button
        aria-label="theme toggler"
        // onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="flex h-8 w-8 items-center justify-center text-body-color duration-300 dark:text-white"
      >
        <span>
          <svg
            viewBox="0 0 16 16"
            className="hidden h-[22px] w-[22px] fill-current dark:block"
          >
            <path d="M4.50663 3.2267L3.30663 2.03337L2.36663 2.97337L3.55996 4.1667L4.50663 3.2267ZM2.66663 7.00003H0.666626V8.33337H2.66663V7.00003ZM8.66663 0.366699H7.33329V2.33337H8.66663V0.366699V0.366699ZM13.6333 2.97337L12.6933 2.03337L11.5 3.2267L12.44 4.1667L13.6333 2.97337ZM11.4933 12.1067L12.6866 13.3067L13.6266 12.3667L12.4266 11.1734L11.4933 12.1067ZM13.3333 7.00003V8.33337H15.3333V7.00003H13.3333ZM7.99996 3.6667C5.79329 3.6667 3.99996 5.46003 3.99996 7.6667C3.99996 9.87337 5.79329 11.6667 7.99996 11.6667C10.2066 11.6667 12 9.87337 12 7.6667C12 5.46003 10.2066 3.6667 7.99996 3.6667ZM7.33329 14.9667H8.66663V13H7.33329V14.9667ZM2.36663 12.36L3.30663 13.3L4.49996 12.1L3.55996 11.16L2.36663 12.36Z" />
          </svg>

          <svg
            viewBox="0 0 23 23"
            className={`h-[30px] w-[30px] fill-current text-dark dark:hidden `}
            // className={`h-[30px] w-[30px] fill-current text-dark dark:hidden ${
            //   !sticky && pathUrl === "/" && "text-white"
            // }`}
          >
            <g clipPath="url(#clip0_40_125)">
              <path d="M16.6111 15.855C17.591 15.1394 18.3151 14.1979 18.7723 13.1623C16.4824 13.4065 14.1342 12.4631 12.6795 10.4711C11.2248 8.47905 11.0409 5.95516 11.9705 3.84818C10.8449 3.9685 9.72768 4.37162 8.74781 5.08719C5.7759 7.25747 5.12529 11.4308 7.29558 14.4028C9.46586 17.3747 13.6392 18.0253 16.6111 15.855Z" />
            </g>
          </svg>
        </span>
      </button>
    </>
  );
}
