import { HTTP_BACKEND } from "@/config";
import axios from "axios";

type Shape = {
    type: "Rect";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "Circle";
    centerX: number;
    centerY: number;
    radiusX: number;
    radiusY: number;
} | {
    type: "Line";
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket, selectedToolButton: string) {

    const ctx = canvas.getContext("2d");

    let existingShapes : Shape[] = await getExistingShapes(roomId);

    if(!ctx){
        return;
    }

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if(message.type == "chat"){
            const parsedShape = JSON.parse(message.message);
            existingShapes.push(parsedShape.shape);
            clearCanvas(existingShapes, canvas, ctx);
        }
    }

    clearCanvas(existingShapes, canvas, ctx);

    let clicked = false;
    let startX = 0;
    let startY = 0;

    canvas.addEventListener("mousedown",(e)=>{
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
    })

    canvas.addEventListener("mouseup",(e)=>{
        clicked = false;

        if(selectedToolButton == "Rect"){
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            const shape: Shape = {
                type: "Rect",
                x: startX,
                y: startY,
                height,
                width
            };
    
            existingShapes.push(shape)
            socket.send(JSON.stringify({
                type: "chat",
                message: JSON.stringify({shape}),
                roomId
            }))
        } 
        else if(selectedToolButton == "Line"){
            // Solid line
            const shape: Shape = {
                type: "Line",
                startX,
                startY,
                endX: e.clientX,
                endY: e.clientY
            };
    
            existingShapes.push(shape)
            socket.send(JSON.stringify({
                type: "chat",
                message: JSON.stringify({shape}),
                roomId
            }))
        }        
        else if(selectedToolButton == "Circle"){
            const shape: Shape = {
                type: "Circle",
                centerX: startX + (e.clientX - startX) / 2,
                centerY: startY + (e.clientY - startY) / 2,
                radiusX: Math.abs((e.clientX - startX) / 2),
                radiusY: Math.abs((e.clientY - startY) / 2),
            };
    
            existingShapes.push(shape)
            socket.send(JSON.stringify({
                type: "chat",
                message: JSON.stringify({shape}),
                roomId
            }))
        }        

    })

    canvas.addEventListener("mousemove",(e)=>{
        if(clicked){

            clearCanvas(existingShapes, canvas, ctx);
            ctx.strokeStyle = "rgba(255, 255, 255)";

            if(selectedToolButton == "Rect"){
                const width = e.clientX - startX
                const height = e.clientY - startY
    
                
                ctx.strokeRect(startX, startY, width, height);
            }
            else if(selectedToolButton == "Line"){
                const endX = e.clientX;
                const endY = e.clientY;

                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.stroke();
            }
            else if(selectedToolButton == "Circle"){
                const centerX = startX + (e.clientX-startX)/2;
                const centerY = startY + (e.clientY-startY)/2;
                const radiusX = Math.abs((e.clientX-startX)/2);
                const radiusY = Math.abs((e.clientY-startY)/2);

                ctx.beginPath();
                ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
                ctx.stroke();
            }

        }
    })

}


function clearCanvas (existingShapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    existingShapes.forEach((shape)=>{
        ctx.strokeStyle = "rgba(255, 255, 255)";
        if(shape.type === "Rect"){
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }
        else if(shape.type === "Line"){
            ctx.beginPath();
            ctx.moveTo(shape.startX, shape.startY);
            ctx.lineTo(shape.endX, shape.endY);
            ctx.stroke();
        }
        else if(shape.type === "Circle"){
            ctx.beginPath();
            ctx.ellipse(shape.centerX, shape.centerY, shape.radiusX, shape.radiusY, 0, 0, 2 * Math.PI);
            ctx.stroke();
        }
    })
}


async function getExistingShapes(roomId:string){
    const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
    const messages = res.data.messages;

    const shapes = messages.map((x: {message: string}) => {
        const messageData = JSON.parse(x.message);
        return messageData.shape
    })

    return shapes;

}