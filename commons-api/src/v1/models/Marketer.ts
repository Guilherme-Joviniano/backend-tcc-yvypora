import db from '../libs/prisma';

class Marketer {
  async createMarketer(data: {
    email: string,
    genderId: number,
    name: string,
    password_hash: string,
    cpf?: string,
    cnpj?: string,
    phone: string,
    birthday: string
    location: {
      latitude: number,
      longitude: number
    }
  }) {
    try {
      const res = await db.marketer.create({
        data: {
          gender: {
            connect: {
              id: data.genderId,
            },
          },
          birthday: data.birthday,
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          location: {
            create: {
              latitude: data.location.latitude,
              longitude: data.location.longitude,
            },
          },
          cpf: data?.cpf,
          cnpj: data?.cnpj,
          phone: data.phone,
        },
        select: {
          gender: {
            select: {
              name: true,
            },
          },
          name: true,
          email: true,
          location: {
            select: {
              latitude: true,
              longitude: true,
            },
          },
          picture_uri: true,
        },
      });

      return { data: res, error: false };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return {
          error: true, message: 'Failed to save a new Marketer in Database', code: 401,
        };
      }
    }
  }

  async delete(id: number) {
    try {
      const res = await db.marketer.delete({ where: { id } });
      return { error: false, message: 'Success deleted marketer!' };
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return { error: true, message: 'Failed to delete marketer', code: 401 };
      }
    }
  }

  async update(data: { password_hash: any; cpf: any; name: string; genderId: number; cnpj: any; email: string, id: number, birthday: string}) {
    try {
      if (data.password_hash) {
        await db.marketer.update({
          where: {
            id: data.id,
          },
          data: {
            password_hash: data.password_hash,
          },
        });
      }
      await db.marketer.update({
        where: { id: data.id },
        data: {
          name: data.name,
          genderId: data.genderId,
          email: data.email,
          cnpj: data.cnpj,
          cpf: data.cpf,
          birthday: data.birthday,
        },
      });
      return { error: false, message: 'Success updated marketer!' };
    } catch (error) {
      if (error instanceof Error) {
        return { error: true, message: 'Failed to update marketer', code: 401 };
      }
    }
  }
}

export default new Marketer();
