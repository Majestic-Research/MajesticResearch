import { api } from "@/lib/api";
import { NextResponse } from "next/server";
import axios from "axios";

export async function PUT(request: Request, { params }: { params: { bairro: string, plataform: string } }): Promise<Response> {
    const res = await request.json()
    console.log(res);
    
    
    try {
        const response = await axios.put(`http://0.0.0.0:3333/${params.plataform}/change/category/${params.bairro}`, res);
        const data = response.data;
        console.log(JSON.stringify(data));

        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        // Return a basic 500 Internal Server Error response
        return new Response("Internal Server Error", { status: 500 });
    }
}
