import { useState, useEffect } from 'react'
import { CarForm } from './CarForm'
import { fetchCars } from '../lib/appwrite'
import { Car } from '../lib/types'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Pencil, CarIcon, DollarSign, Package, Users, Gauge, Image } from 'lucide-react'


export function AdminDashboard() {
  const [cars, setCars] = useState<Car[]>([])
  const [isAddingCar, setIsAddingCar] = useState(false)

  useEffect(() => {
    const loadCars = async () => {
      const carData = await fetchCars();
      setCars(carData as unknown as Car[]);
    };
    loadCars();
  }, [])

  const handleCarAdded = async () => {
    const carData = await fetchCars();
    setCars(carData as unknown as Car[]);
    setIsAddingCar(false);
  }

  const handleCarUpdated = async () => {
    const carData = await fetchCars();
    setCars(carData as unknown as Car[]);
  }

  const getUniqueCarTypes = () => {
    return Array.from(new Set(cars.map(car => car.type)));
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto py-8 px-4">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Admin Dashboard</CardTitle>
            <CardDescription>Manage your car rental inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
                  <CarIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{cars.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Price</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${(cars.reduce((acc, car) => acc + car.price, 0) / cars.length || 0).toFixed(2)}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${cars.reduce((acc, car) => acc + car.price, 0).toFixed(2)}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Car Types</CardTitle>
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{getUniqueCarTypes().length}</div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Current Inventory</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => setIsAddingCar(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Car
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Car</DialogTitle>
                  </DialogHeader>
                  <CarForm onCarAdded={handleCarAdded} onCancel={() => setIsAddingCar(false)} />
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Seats</TableHead>
                      <TableHead>Transmission</TableHead>
                      <TableHead>Price per Day</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cars.map((car) => (
                      <TableRow key={car.$id}>
                        <TableCell>
                          {car.imageUrl ? (
                            <img src={car.imageUrl} alt={car.name} className="w-16 h-16 object-cover rounded" />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                              <Image className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{car.name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{car.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className="flex items-center">
                            <Users className="mr-2 h-4 w-4" />
                            {car.seats}
                          </span>
                        </TableCell>
                        <TableCell>{car.transmission}</TableCell>
                        <TableCell>${car.price}/day</TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Car</DialogTitle>
                              </DialogHeader>
                              <CarForm car={car} onCarUpdated={handleCarUpdated} />
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

