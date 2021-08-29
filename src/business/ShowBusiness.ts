import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { FindShowsInputDTO, ShowInputDTO } from "../model/Show";
import { ShowDatabase } from "../data/ShowDatabase";


export class ShowBusiness {

    async createShow(show: ShowInputDTO, userToken: string) {

        if(!userToken){
            throw new Error("É necessário um token de acesso")
        }

        const authenticator = new Authenticator();
        const accessToken = authenticator.getData(userToken)

        if(!accessToken || accessToken.role !== "ADMIN"){
           throw new Error("Apenas administradores podem agendar shows");
        }
        
        if(show.start_time < 8 || show.end_time > 23 || show.start_time >= show.end_time){
            throw new Error("Os shows só podem dar inicio as 8h e terminar as 23h");
        }

        if(!Number.isInteger(show.start_time) || !Number.isInteger(show.end_time)) {
            throw new Error("Os shows só podem ter horarios cheios entre as 8h e 23h")
        }

        const showDatabase = new ShowDatabase();
        const scheduleShow = await showDatabase.verifyDate(show.week_day, show.start_time, show.end_time)

        if(scheduleShow){
            throw new Error("Já existe um show agendado para este dia e horário")
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        await showDatabase.createShow(id, show.week_day, show.start_time, show.end_time, show.band_id);


        return;
    }

    async findShow(show: FindShowsInputDTO) {

        if(!show){
            throw new Error("É nessario um id ou nome da banda para realizar a pesquisa");
        }
        
        const showDatabase = new ShowDatabase();
        const showsDB = await showDatabase.findShowsByDay(show.week_day);

        return showsDB;
    
    }
}