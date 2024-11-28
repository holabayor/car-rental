import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Car } from '@/lib/types'

export function CarCard({ car }: { car: Car }) {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-4">
        <div className="aspect-video relative overflow-hidden rounded-lg">
          <img
            src={car.imageUrl}
            alt={car.name}
            className="object-cover w-full h-full"
          />
        </div>
        <h3 className="mt-2 text-lg font-semibold">{car.name}</h3>
        <p className="text-sm text-gray-600">{car.type}</p>
        <p className="mt-2 font-bold">${car.price} / day</p>
        <ul className="mt-2 text-sm">
          <li>Seats: {car.seats}</li>
          <li>Transmission: {car.transmission}</li>
        </ul>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild variant="outline">
          <a href={`sms:+1234567890?body=I'm interested in renting the ${car.name}`}>Text</a>
        </Button>
        <Button asChild>
          <a href={`https://wa.me/1234567890?text=I'm interested in renting the ${car.name}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </Button>
      </CardFooter>
    </Card>
  )
}

