import axios from 'axios';
import { NextResponse } from 'next/server'

const headers = {
  'authority': 'glue-api.zapimoveis.com.br', 
  'accept': '*/*', 
  'accept-language': 'pt-PT,pt;q=0.9,en-US;q=0.8,en;q=0.7', 
  'authorization': 'Bearer undefined', 
  'origin': 'https://www.zapimoveis.com.br', 
  'referer': 'https://www.zapimoveis.com.br/', 
  'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"', 
  'sec-ch-ua-mobile': '?0', 
  'sec-ch-ua-platform': '"Windows"', 
  'sec-fetch-dest': 'empty', 
  'sec-fetch-mode': 'cors', 
  'sec-fetch-site': 'same-site', 
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 
  'x-deviceid': '79fd43ed-468d-45e5-9d01-1717212fc361', 
  'x-domain': '.zapimoveis.com.br', 
  'Cookie': '__cfruid=2f395728ddaad6e2405c2ce30a960d79d9e21d80-1695234882'
};

function formatString(inputString: string): string {
  inputString = inputString.toLowerCase()
  const formattedString = inputString.replace(/\b\w/g, (match) => match.toUpperCase());
  const stringWithPlus = formattedString.replace(/\s/g, '+');
  const stringWithoutAccents = stringWithPlus.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return stringWithoutAccents;
}
export async function GET(request: Request,  { params }: { params: { bairro: string, page: Number } } ): Promise<Response> {

  
  const bairroLocation = encodeURIComponent(params.bairro);
  const urlLocation = `https://glue-api.zapimoveis.com.br/v3/locations?portal=ZAP&fields=neighborhood%2Ccity%2Caccount%2Ccondominium%2Cpoi%2Cstreet&includeFields=address.neighborhood%2Caddress.city%2Caddress.state%2Caddress.zone%2Caddress.locationId%2Caddress.point%2Curl%2Cadvertiser.name%2CuriCategory.page%2Ccondominium.name%2Caddress.street&size=6&q=${bairroLocation}&amenities=Amenity_NONE&constructionStatus=ConstructionStatus_NONE&listingType=USED&businessType=SALE&unitTypes=&usageTypes=&unitSubTypes=&unitTypesV3=&__vt=`
  const responseLocation = await axios.get(urlLocation, {headers})
  
  
  var df_completo: any[] = []
  const Zone = formatString(responseLocation.data.street.result.locations[0].address.zone)
  const bairro = formatString(params.bairro)
  
  const url = `https://glue-api.zapimoveis.com.br/v2/listings?user=79fd43ed-468d-45e5-9d01-1717212fc361&portal=ZAP&includeFields=search%28result%28listings%28listing%28listingsCount%2CsourceId%2CdisplayAddressType%2Camenities%2CusableAreas%2CconstructionStatus%2ClistingType%2Cdescription%2Ctitle%2Cstamps%2CcreatedAt%2Cfloors%2CunitTypes%2CnonActivationReason%2CproviderId%2CpropertyType%2CunitSubTypes%2CunitsOnTheFloor%2ClegacyId%2Cid%2Cportal%2CunitFloor%2CparkingSpaces%2CupdatedAt%2Caddress%2Csuites%2CpublicationType%2CexternalId%2Cbathrooms%2CusageTypes%2CtotalAreas%2CadvertiserId%2CadvertiserContact%2CwhatsappNumber%2Cbedrooms%2CacceptExchange%2CpricingInfos%2CshowPrice%2Cresale%2Cbuildings%2CcapacityLimit%2Cstatus%2CpriceSuggestion%29%2Caccount%28id%2Cname%2ClogoUrl%2ClicenseNumber%2CshowAddress%2ClegacyVivarealId%2ClegacyZapId%2CcreatedDate%2Cminisite%2Ctier%29%2Cmedias%2CaccountLink%2Clink%29%29%2CtotalCount%29%2Cpage%2Cfacets%2CfullUriFragments%2Cdevelopments%28search%28result%28listings%28listing%28listingsCount%2CsourceId%2CdisplayAddressType%2Camenities%2CusableAreas%2CconstructionStatus%2ClistingType%2Cdescription%2Ctitle%2Cstamps%2CcreatedAt%2Cfloors%2CunitTypes%2CnonActivationReason%2CproviderId%2CpropertyType%2CunitSubTypes%2CunitsOnTheFloor%2ClegacyId%2Cid%2Cportal%2CunitFloor%2CparkingSpaces%2CupdatedAt%2Caddress%2Csuites%2CpublicationType%2CexternalId%2Cbathrooms%2CusageTypes%2CtotalAreas%2CadvertiserId%2CadvertiserContact%2CwhatsappNumber%2Cbedrooms%2CacceptExchange%2CpricingInfos%2CshowPrice%2Cresale%2Cbuildings%2CcapacityLimit%2Cstatus%2CpriceSuggestion%29%2Caccount%28id%2Cname%2ClogoUrl%2ClicenseNumber%2CshowAddress%2ClegacyVivarealId%2ClegacyZapId%2CcreatedDate%2Cminisite%2Ctier%29%2Cmedias%2CaccountLink%2Clink%29%29%2CtotalCount%29%29%2CsuperPremium%28search%28result%28listings%28listing%28listingsCount%2CsourceId%2CdisplayAddressType%2Camenities%2CusableAreas%2CconstructionStatus%2ClistingType%2Cdescription%2Ctitle%2Cstamps%2CcreatedAt%2Cfloors%2CunitTypes%2CnonActivationReason%2CproviderId%2CpropertyType%2CunitSubTypes%2CunitsOnTheFloor%2ClegacyId%2Cid%2Cportal%2CunitFloor%2CparkingSpaces%2CupdatedAt%2Caddress%2Csuites%2CpublicationType%2CexternalId%2Cbathrooms%2CusageTypes%2CtotalAreas%2CadvertiserId%2CadvertiserContact%2CwhatsappNumber%2Cbedrooms%2CacceptExchange%2CpricingInfos%2CshowPrice%2Cresale%2Cbuildings%2CcapacityLimit%2Cstatus%2CpriceSuggestion%29%2Caccount%28id%2Cname%2ClogoUrl%2ClicenseNumber%2CshowAddress%2ClegacyVivarealId%2ClegacyZapId%2CcreatedDate%2Cminisite%2Ctier%29%2Cmedias%2CaccountLink%2Clink%29%29%2CtotalCount%29%29%2Cschema&categoryPage=RESULT&developmentsSize=0&superPremiumSize=0&__zt=&business=SALE&parentId=null&listingType=USED&addressCity=S%C3%A3o+Paulo&addressZone=${Zone}&addressLocationId=BR%3ESao+Paulo%3ENULL%3ESao+Paulo%3E${Zone}%3E${bairro}&addressState=S%C3%A3o+Paulo&addressNeighborhood=${bairro}&addressPointLat=-23.598157&addressPointLon=-46.68293&addressType=neighborhood&unitTypes=APARTMENT%2CAPARTMENT%2CAPARTMENT%2CAPARTMENT%2CAPARTMENT%2CAPARTMENT&unitTypesV3=APARTMENT%2CUnitType_NONE%2CKITNET%2CPENTHOUSE%2CFLAT%2CLOFT&unitSubTypes=UnitSubType_NONE%2CDUPLEX%2CTRIPLEX%7CSTUDIO%7CKITNET%7CPENTHOUSE%7CFLAT%7CLOFT&usageTypes=RESIDENTIAL%2CRESIDENTIAL%2CRESIDENTIAL%2CRESIDENTIAL%2CRESIDENTIAL%2CRESIDENTIAL&page=${params.page}&size=110&from=${110 * (Number(params.page) - 1)}&levels=NEIGHBORHOOD&ref=`;
  const response = await axios.get(url, { headers });

  const removeColumns = [
    "sourceId",
    "displayAddressType",
    "constructionStatus",
    "stamps",
    "nonActivationReason",
    "providerId",
    "legacyId",
    "portal",
    "address",
    "publicationType",
    "externalId",
    "advertiserId",
    "advertiserContact",
    "whatsappNumber",
    "acceptExchange",
    "showPrice",
    "resale",
    "buildings",
    "capacityLimit",
    "account",
    "medias",
    "accountLink",
    "link",
    "pricingInfos"
  ]
  const photos: string[] = []
  df_completo = response.data.search.result.listings
  var index = 0
  const cleanedData: object[] = df_completo
  .map(row => ({
    ...row,
    listing: {
      ...row['listing'],
      photos: row['medias'] ? row['medias'].map((photo: any) => photo.url.replace('{action}', 'crop').replace('{width}', '800').replace('{height}', '360')).filter((uri: string) => uri.endsWith(".jpg")) : [],
      geoloc_lat: row['listing']['address']['point'] ? row['listing']['address']['point']['lat'] : null,
      geoloc_lng: row['listing']['address']['point'] ? row['listing']['address']['point']['lon'] : null,
      yearlyIptu: row['listing']['pricingInfos'][0]['yearlyIptu'],
      price: row['listing']['pricingInfos'][0]['price'],
      monthlyCondoFee: row['listing']['pricingInfos'][0]['monthlyCondoFee'],
      full_address: concatAddress(row['listing']['address'], row['unitFloor']),
      index: index++
    }
  }))
  .map(row => {  
    removeColumns.map(col => delete row['listing'][col])
    removeColumns.map(col => delete row[col])
    return row;
  }).map(row => {
    row = row['listing']
    return row
  })

  

  return NextResponse.json({
    listings: cleanedData,
    totalCount: response.data.search.totalCount,
    page: params.page
  })
  
}

function concatAddress(address: any, number: number): string {
  const addressParts = [
    address.street, address.streetNumber, address.zipCode, address.neighborhood,
    address.city, address.stateAcronym, address.country
  ];

  return addressParts.filter(part => part !== null).join(', ');
}