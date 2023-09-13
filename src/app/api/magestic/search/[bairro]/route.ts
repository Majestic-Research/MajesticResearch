import { api } from "@/lib/api";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request, { params }: { params: { bairro: string } }): Promise<Response> {
    try {
        const response = await axios.get(`http://127.0.0.1:3015/search/${params.bairro}`);
        const data = response.data;
        console.log(JSON.stringify(data));

        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        // Return a basic 500 Internal Server Error response
        return new Response("Internal Server Error", { status: 500 });
    }
}
