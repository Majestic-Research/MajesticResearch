import axios from 'axios';
import { NextResponse } from 'next/server'

const headers = {
  'authority': 'landscape-api.loft.com.br',
  'accept': 'application/json, text/plain, */*',
  'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
  'loftuserid': '6abfebff-a240-44fa-8267-55bd76b24b4b',
  'origin': 'https://loft.com.br',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
  'x-origin': 'http://loft-website-sales.loft.com.br'
};

export async function GET(request: Request,  { params }: { params: { bairro: string } } ): Promise<Response> {
  let page = 0;
  let finish = false
  const df_completo: any[] = [];
  const bairro = encodeURIComponent(params.bairro);
  console.log(bairro);
  

  while (!finish) {
    const url = `https://landscape-api.loft.com.br/listing/v2/search?cities%5B%5D=sao+paulo%2C+sp&hitsPerPage=200&neighborhood%5B%5D=${bairro}%2C+sao+paulo%2C+sp&orderBy%5B%5D=rankB&page=${page}`;

    const response = await axios.get(url, { headers });

    const res = response.data['listings'];

    if (response.data['pagination'].page === response.data['pagination'].totalPages - 1) {
      finish = true
    }
    df_completo.push(...res);
    page++;
  }

  const addressColumns = [
    "address",
    "_highlightResult",
    "_geoloc",
    "photos",
    "amenities",
    "unitFeatures"
  ];

  const cleanedData: object[] = df_completo
    .filter(row => row['propertyType'] !== 'conjugate' && row['propertyType'] !== null)
    .filter(row => row['address'] && row['address']['streetType'])
    .map(row => ({
      ...row,
      photos: row['photos'] ? row['photos'] : [],
      amenities: row['amenities'] ? row['amenities'] : [],
      unitFeatures: row['unitFeatures'] ? row['unitFeatures'] : [],
      geoloc_lat: row['_geoloc_lat'],
      geoloc_lng: row['_geoloc_lng'],
      full_address: concatAddress(row['address'])
    }))
    .map(row => {
      for (const col of addressColumns) {
        delete row[col];
      }
      return row;
    })

    return NextResponse.json(cleanedData)
  
}

function concatAddress(address: any): string {
  const addressParts = [
    address.streetType, address.streetName, address.number,
    address.unitNumber, address.postalCode, address.neighborhood,
    address.city, address.state, address.country, address.complexName
  ];

  return addressParts.filter(part => part !== null).join(', ');
}