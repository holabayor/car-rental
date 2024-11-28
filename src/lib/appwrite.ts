import { Client, Account, Databases, ID, Query, Storage } from 'appwrite';
import { Car } from './types';

const DATABASE_ID = '6747a03c003e4bab7d87';
const COLLECTION_ID = '6747a0510025e0f82c4a';
const BUCKET_ID = '6747a490002fcfb18576';


const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Set your Appwrite endpoint
    .setProject('674740b20006bd806b26'); // Set your project ID


export const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const uploadCarImage = async (file: File) => {
    try {
        const response = await storage.createFile(BUCKET_ID, ID.unique(), file);
        return response;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export const getCarImageUrl = (fileId: string) => {
    const data = storage.getFilePreview(BUCKET_ID, fileId);
    return data
};


export const fetchCars = async () => {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.orderDesc('$createdAt')]
        )
        return response.documents
    } catch (error) {
        console.error('Error fetching cars:', error)
        throw error
    }
}

// API functions
export const saveCar = async (
    carData: Partial<Car>, // For both create and update
    file?: File // Optional file for image upload
) => {
    try {
        const imageUrl = file
            ? getCarImageUrl((await uploadCarImage(file)).$id)
            : carData.imageUrl;

        console.log({
            ...carData,
            seats: Number(carData.seats),
            price: Number(carData.price),
            imageUrl,
        })

        const payload = {
            ...carData,
            seats: Number(carData.seats),
            price: Number(carData.price),
            imageUrl,
        };

        return carData.$id
            ? await databases.updateDocument(DATABASE_ID, COLLECTION_ID, carData.$id, payload)
            : await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), payload);
    } catch (error) {
        console.error("Error saving car:", error);
        throw error;
    }
};

export { ID }