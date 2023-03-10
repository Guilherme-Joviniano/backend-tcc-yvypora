import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import Marketer from '../model/Marketer';

export default async function (server: FastifyInstance) {
  server.get('/details', { onRequest: [server.auth] }, (req: FastifyRequest, rep: FastifyReply) => rep.send(req.user));

  server.get(
    '/fairs',
    {
      onRequest: [server.auth],
    },
    async (req, rep) => {
      const res = await Marketer.indexFairs(req.user.id);

      if (!res) {
        return rep.status(404).send({
          code: 404,
          error: true,
          message: 'Fairs not found with this marketer',
        });
      }

      return rep.send({
        code: 200,
        error: false,
        payload: res,
      });
    },
  );
}
