"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import type { Language } from "@/lib/translations"

const languages = [
  { code: "en" as Language, name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "hi" as Language, name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
  { code: "ta" as Language, name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
]

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const getCurrentLanguage = () => {
    return languages.find((lang) => lang.code === language) || languages[0]
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{getCurrentLanguage().nativeName}</span>
          <span className="sm:hidden">{getCurrentLanguage().code.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)} className="gap-2">
            <span>{lang.flag}</span>
            <span>{lang.nativeName}</span>
            {language === lang.code && <span className="ml-auto text-primary">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
