import { FastifyInstance, FastifyRequest } from 'fastify';
import { orderByDistance } from 'geolib';
import { GeolibInputCoordinates } from 'geolib/es/types';
import { Fair } from '../models';

export default async function fairPlugin(server: FastifyInstance) {
  server.get('/listByClose', {
    schema: {
      querystring: {
        type: 'object',
        required: ['lat', 'long'],
        properties: {
          lat: { type: 'string' },
          long: { type: 'string' },
        },
      },
    },
  }, async (req: FastifyRequest<{
    Querystring: {
      lat: string,
      long: string,
    }
  }>, rep) => {
    const fairs = await Fair.index();

    const { lat, long } = req.query;

    const originLat = parseFloat(lat);
    const originLong = parseFloat(long);

    const nearPositions = orderByDistance({
      latitude: originLat,
      longitude: originLong,
    }, fairs as any);

    return rep.status(200).send({
      code: 200,
      payload: nearPositions,
      error: false,
    });
  });
}
