import { Band } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";


export class ShowDatabase extends BaseDatabase {

  private static TABLE_NAME = "LAMA_SHOWS";

  public async createShow(
    id: string,
    week_day: string,
    start_time: number,
    end_time: number,
    band_id: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          week_day,
          start_time,
          end_time,
          band_id
        })
        .into(ShowDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async findShowsByDay(date: string): Promise<any> {

    const result = await this.getConnection()
      .select("name", "music_genre")
      .from("LAMA_BANDAS as Bandas")
      .join("LAMA_SHOWS as Shows", "Shows.band_id", "Bandas.id")
      .where({week_day: date})
      .orderBy("Shows.start_time", "asc");

    return result;
  }

  public async verifyDate(week_day: string, start_time: number, end_time: number): Promise<any> {
    try{
      const [result] = await this.getConnection()
        .select("*")
        .from(ShowDatabase.TABLE_NAME)
        .where({week_day, start_time, end_time})

      return result;

    }
    catch(error){
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
