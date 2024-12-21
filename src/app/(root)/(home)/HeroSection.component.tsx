"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"

const searchSchema = z.object({
  search: z.string().min(2, "Please enter a search term"),
})

export function HeroSection() {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  })

  function onSubmit(values: z.infer<typeof searchSchema>) {
    console.log(values)
  }

  return (
    <section className="relative h-[600px] flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          src="/placeholder.svg?height=600&width=1920"
          alt="Travel destination"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 max-w-4xl w-full px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4">
          Find your next adventure
        </h1>
        <p className="text-xl text-white text-center mb-8">
          Discover the best places to eat, stay, and play around the world
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Where to?"
                      className="h-14 bg-white/90 backdrop-blur-sm text-lg"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="h-14 px-8">
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </form>
        </Form>
      </div>
    </section>
  )
}

