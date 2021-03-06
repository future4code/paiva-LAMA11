import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { BandInputDTO, FindBandInputDTO } from "../model/Band";
import { BandDatabase } from "../data/BandDatabase";

export class BandBusiness {

    async createBand(band: BandInputDTO, userToken: string) {

        if(!userToken){
            throw new Error("É necessário um token de acesso")
        }

        const authenticator = new Authenticator();
        const accessToken = authenticator.getData(userToken)

        if(!accessToken || accessToken.role !== "ADMIN"){
           throw new Error("Apenas administradores podem criar novas bandas");
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const bandDatabase = new BandDatabase();
        await bandDatabase.createBand(id, band.name, band.music_genre, band.responsible);


        return;
    }

    async findBand(band: FindBandInputDTO) {
        
        const bandDatabase = new BandDatabase();

        if(!band){
            throw new Error("É nessario um id ou nome da banda para realizar a pesquisa");
        }

        let ID: string | null
        let NAME: string | null

        band.id ? (ID = band.id) : (ID = null)
        band.name ? (NAME = band.name) : (NAME = null)

        const bandDB = await bandDatabase.findBand(NAME, ID);
        return bandDB;

    }
}