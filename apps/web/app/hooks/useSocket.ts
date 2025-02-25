import { useEffect, useState } from "react";
import { WS_URL } from "../config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MDBjODIwYS02ZTg3LTQyNDgtOWMwYS01OTkxNGFlNjhlY2UiLCJpYXQiOjE3NDA1MDM4OTN9.r4X0W6159DUsxLsIH3F-xeBU0h3hT1CzTnooOGMZbR8`);
        ws.onopen=()=>{
            setLoading(false);
            setSocket(ws);
        }
    }, [])

    return {
        socket, loading
    }
}