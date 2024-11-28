import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Car } from '../lib/types'
import { saveCar } from '../lib/appwrite'

interface CarFormProps {
  car?: Car
  onCarAdded?: () => void
  onCarUpdated?: () => void
  onCancel?:  () => void
  children?: ({ openForm }: { openForm: () => void }) => React.ReactNode
}

export function CarForm({ car, onCarAdded, onCarUpdated, onCancel, children }: CarFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!file && !car?.imageUrl) {
      return alert("Please upload an image.");
    }

    const formData = new FormData(event.currentTarget)
    const carData = Object.fromEntries(formData) as unknown as Car

    try {
      
        await saveCar(
          {
            ...carData,
            seats: Number(carData.seats),
            price: Number(carData.price),
            $id: car?.$id || undefined,
          },
          file
        )
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        car ? onCarUpdated?.() : onCarAdded?.();
      
      setIsOpen(false)
    } catch (error) {
      console.error('Error saving car:', error)
    }
  }

  if (!isOpen && children) {
    return children({ openForm: () => setIsOpen(true) })
  }

  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>
        {car ? 'Edit' : 'Add New Car'}
      </Button>
      {isOpen && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue={car?.name} required />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Input id="type" name="type" defaultValue={car?.type} required />
          </div>
          <div>
            <Label htmlFor="seats">Seats</Label>
            <Input id="seats" name="seats" type="number" defaultValue={car?.seats} required />
          </div>
          <div>
            <Label htmlFor="transmission">Transmission</Label>
            <Input id="transmission" name="transmission" defaultValue={car?.transmission} required />
          </div>
          <div>
            <Label htmlFor="price">Price per Day</Label>
            <Input id="price" name="price" type="number" defaultValue={car?.price} required />
          </div>
          <div>
            <Label htmlFor="imageUrl">Image</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {car?.imageUrl && (
              <p className="text-sm text-gray-500">
                Current image: <a href={car.imageUrl} target="_blank">View</a>
              </p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => {
          setIsOpen(false)
          onCancel?.()
        }}>
          Cancel
        </Button>
        <Button type="submit">{car ? 'Update' : 'Add'} Car</Button>
      </div>
        </form>
      )}
    </>
  )
}

