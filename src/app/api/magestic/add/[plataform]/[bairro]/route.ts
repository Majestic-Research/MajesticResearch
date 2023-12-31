import { api } from "@/lib/api";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request, { params }: { params: { bairro: string, plataform: string } }): Promise<Response> {
    const res = await request.json()
    
    
    try {
        const response = await axios.post(`http://0.0.0.0:3333/${params.plataform}/add/${params.bairro}`, res);
        const data = response.data;
        console.log(JSON.stringify(data));

        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        // Return a basic 500 Internal Server Error response
        return new Response("Internal Server Error", { status: 500 });
    }
}
