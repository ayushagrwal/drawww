import { initDraw } from '@/draw';
import React, { useEffect, useRef, useState } from 'react';
import { Pencil, Circle, RectangleHorizontal, Minus, Shapes, Palette, Eraser, MousePointer2, Layers, Lock } from 'lucide-react';
import { ToolButton } from './ToolButton';

export default function Canvas({roomId, socket} : {roomId: string, socket: WebSocket}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedToolButton, setSelectedToolButton] = useState("Rect");

    useEffect(()=>{
        if(canvasRef.current){            
            initDraw(canvasRef.current, roomId, socket, selectedToolButton);
        }
    },[canvasRef, selectedToolButton]);

    return (
        <div className='relative' style={{height: "100vh", overflow:'hidden'}}>
            <canvas ref={canvasRef} width={1550} height={800}></canvas>
            <div className="fixed bottom-4 right-4 flex justify-center space-x-2">
                <ToolButton
                    icon={MousePointer2} 
                    label="Select" 
                    selectedToolButton={selectedToolButton} 
                    onClick={() => setSelectedToolButton("Select")} 
                />
                <ToolButton 
                    icon={Pencil} 
                    label="Draw" 
                    selectedToolButton={selectedToolButton} 
                    onClick={() => setSelectedToolButton("Draw")} 
                />
                <ToolButton 
                    icon={Circle} 
                    label="Circle" 
                    selectedToolButton={selectedToolButton} 
                    onClick={() => setSelectedToolButton("Circle")} 
                />
                <ToolButton 
                    icon={RectangleHorizontal} 
                    label="Rect" 
                    selectedToolButton={selectedToolButton} 
                    onClick={() => setSelectedToolButton("Rect")} 
                />
                <ToolButton 
                    icon={Minus} 
                    label="Line" 
                    selectedToolButton={selectedToolButton} 
                    onClick={() => setSelectedToolButton("Line")} 
                />
              {/* <ToolButton icon={Shapes} label="Shapes" />
              <ToolButton icon={Palette} label="Colors" />
              <ToolButton icon={Eraser} label="Erase" />
              <ToolButton icon={Layers} label="Layers" />
              <ToolButton icon={Lock} label="Lock" /> */}
            </div>
        </div>
    )}
