import axios from 'axios';
import { NextResponse } from 'next/server';
import pLimit from 'p-limit';

const headersFotos = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
};

const maximo = 10; // Número máximo de imagens
const maxTentativas = 3; // Número máximo de tentativas por URL

export async function GET(request: Request, { params }: { params: { id: string } }): Promise<Response> {
  const allFotos: string[] = [];
  const limit = pLimit(5); // Limite o número de solicitações em paralelo

  const downloadImage = async (numFoto: number) => {
    const urlFotos = `https://content.loft.com.br/homes/${params.id}/desktop_facade0${numFoto}.jpg`;

    for (let tentativas = 0; tentativas < maxTentativas; tentativas++) {
      try {
        await limit(() =>
          axios.get(urlFotos, {
            headers: headersFotos,
          })
        );
        allFotos.push(urlFotos);
        break; // Se o download for bem-sucedido, saia do loop de tentativas
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Crie um array de promessas para buscar as imagens em paralelo
  const downloadPromises: Promise<void>[] = [];

  for (let numFoto = 1; numFoto < maximo; numFoto++) {
    downloadPromises.push(downloadImage(numFoto));
  }

  // Aguarde todas as promessas serem resolvidas
  await Promise.all(downloadPromises);

  // Limita o número de imagens a 6
  const finalFotos = allFotos.slice(0, 6);

  return NextResponse.json(finalFotos);
}
