"use client";
import { useState } from "react";

export default function Heading() 
{
    const [state, setState] = useState{"helllo"};
    return <h1>{state}</h1>;
}