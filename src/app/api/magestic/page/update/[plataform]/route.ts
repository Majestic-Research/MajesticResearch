import { api } from "@/lib/api";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request, { params }: { params: {plataform: string } }): Promise<Response> {
    var req = await request.json()
    req.zap === null ? req = {...req, zap: 1} : null
    try {
        const response = await axios.post(`http://0.0.0.0:3333/page/${params.plataform}`, req);
        const data = response.data;
        console.log(JSON.stringify(data));

        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        // Return a basic 500 Internal Server Error response
        return new Response("Internal Server Error", { status: 500 });
    }
}
