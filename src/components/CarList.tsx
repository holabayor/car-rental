import { useEffect, useState } from "react"
import { CarCard } from "./CarCard"
import { fetchCars } from "@/lib/appwrite"
import { Car } from "@/lib/types"


export function CarList(){

    const [cars, setCars] = useState<Car[]>([])

    useEffect(() => {
        const loadCars = async () => {
            const carData = await fetchCars();
            setCars(carData as unknown as Car[]);
        };
        loadCars();
    }, [])
  
    return (
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car.$id} car={car} />
          ))}
        </div>
    )
}
