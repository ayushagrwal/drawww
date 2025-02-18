import { useEffect, useState } from "react";
import { WS_URL } from "../config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MjRkZWU5Ny03MjkzLTRjYTUtYWVlZC00NmMwODA0YTkyMDgiLCJpYXQiOjE3Mzk5MDU4MjV9._w2fXhJfVmQEvfosT4vOAkZHUDTB899vikpBweKKxAs`);
        ws.onopen=()=>{
            setLoading(false);
            setSocket(ws);
        }
    }, [])

    return {
        socket, loading
    }
}