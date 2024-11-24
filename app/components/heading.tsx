"use client";
import { useState } from "react";

export default function Heading() {
    const [state, setState] = useState("hello"); // Corrected useState syntax
    return <h1>{state}</h1>;
}
