"use client"

import { usePathname, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe } from 'lucide-react'

const languages = {
  en: 'English',
  it: 'Italiano'
}

export function LanguageToggle() {
  const pathname = usePathname()
  const router = useRouter()

  const switchLanguage = (locale: string) => {
    if (locale === 'en') {
      router.push('/') // Inglese alla root
    } else {
      router.push(`/${locale}`) // Italiano a /it
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-accent">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([locale, label]) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => switchLanguage(locale)}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}