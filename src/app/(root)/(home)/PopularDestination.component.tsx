import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from 'lucide-react'

const destinations = [
  {
    name: "Paris, France",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.8,
    reviews: "2.1M reviews",
  },
  {
    name: "Rome, Italy",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.7,
    reviews: "1.8M reviews",
  },
  {
    name: "London, UK",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.6,
    reviews: "1.9M reviews",
  },
  {
    name: "Barcelona, Spain",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.7,
    reviews: "1.5M reviews",
  },
]

export function PopularDestinations() {
  return (
    <section className="py-12 bg-accent">
      <div className="container">
        <h2 className="text-2xl font-bold mb-8">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <Card key={destination.name} className="overflow-hidden">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-lg">{destination.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{destination.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    {destination.reviews}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

