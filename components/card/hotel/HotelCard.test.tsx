import HotelCard, { HotelCardInterface } from "./HotelCard"
 import { render, screen, waitFor, fireEvent } from "@testing-library/react";

describe("Render hotel card", ()=>{
    test("Render card", () =>{
        const hotelCard:HotelCardInterface ={
            city:"city",
            distance:"",
            title:"sa",
            url:""
        }
        render(<HotelCard card={hotelCard}></HotelCard>)
    })
})