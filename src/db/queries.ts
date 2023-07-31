import { User } from "./entity/user";
import DB from "./ormConfig";
import {paginate, PaginationInfo} from "./paginator";

export async function getUsers(page: number, pageSize: number): Promise<{records: User[], paginationInfo: PaginationInfo}> {
  const builder = await DB.getRepository(User).createQueryBuilder()
    .orderBy("id", "DESC");
  return await paginate(builder, page, pageSize);
}

export async function getUserById(id: number): Promise<User> {
  let res = await DB.getRepository(User).findOneByOrFail({
    id
  });
  return res;
}

export async function createUser(firstName: string, lastName: string, email: string) {
  try {
    return await DB.getRepository(User).create({
      firstName,
      lastName,
      email
    });
  } catch(err) {
    console.error("Create User Error : " + err);
    return err;
  }
}