import { api } from "@/lib/api";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request, { params }: { params: { bairro: string, plataform: string } }): Promise<Response> {
    try {
        console.log(params.plataform);
        
        const response = await axios.get(`http://0.0.0.0:3333/${params.plataform}/search/${params.bairro}`);
        const data = response.data;
        console.log(JSON.stringify(data));

        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        // Return a basic 500 Internal Server Error response
        return new Response("Internal Server Error", { status: 500 });
    }
}
