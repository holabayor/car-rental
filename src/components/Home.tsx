import { CarList } from "./CarList";

export function Home(){
    return (
        <>
        <h1 className="text-3xl font-bold">Available Cars for Hire</h1>
        <CarList/>
      </>
    )
}