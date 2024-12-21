import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const activities = [
  {
    name: "Eiffel Tower Skip-the-Line Ticket",
    image: "/placeholder.svg?height=200&width=300",
    price: "From $49",
    category: "Top Attraction",
    rating: 4.8,
    reviews: "10,245",
  },
  {
    name: "Louvre Museum Guided Tour",
    image: "/placeholder.svg?height=200&width=300",
    price: "From $65",
    category: "Museums",
    rating: 4.7,
    reviews: "8,123",
  },
  {
    name: "Seine River Dinner Cruise",
    image: "/placeholder.svg?height=200&width=300",
    price: "From $89",
    category: "Cruises",
    rating: 4.9,
    reviews: "5,678",
  },
]

export function ThingsToDo() {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-2xl font-bold mb-8">Ways to tour Paris</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <Card key={activity.name} className="overflow-hidden">
              <img
                src={activity.image}
                alt={activity.name}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <Badge className="w-fit mb-2">{activity.category}</Badge>
                <CardTitle className="text-lg">{activity.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">★ {activity.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({activity.reviews})
                    </span>
                  </div>
                  <div className="font-semibold">{activity.price}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

