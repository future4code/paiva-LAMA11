export class Show{
    constructor(
    private id: string,
    private week_day: string,
    private start_time: number,
    private end_time: number,
    private band_id: string,
    ){}

    getId(){
        return this.id;
    }

    getDay(){
        return this.week_day
    }

    getStart_time(){
        return this.start_time;
    }

    getEnd_time(){
        return this.end_time;
    }

    getBand_id(){
        return this.band_id;
    }

    setId(id: string){
        this.id = id;
    }

    setDay(week_day: string){
        this.week_day = week_day;
    }

    setStart_time(start_time: number){
        this.start_time = start_time;
    }

    setEnd_time(end_time: number){
        this.end_time = end_time;
    }

    setBand_id(band_id: string){
        this.band_id = band_id;
    }

    static stringToUserRole(input: string): ValidDays{
        switch (input) {
        case "SEXTA":
            return ValidDays.SEXTA;
        case "SABADO":
            return ValidDays.SABADO;
        case "DOMINGO":
            return ValidDays.DOMINGO;
        default:
            throw new Error("Dia inválido");
        }
    }

    static toShowModel(show: any): Show {
        return new Show(show.id, show.week_day, show.start_time, show.end_time, show.band_id);
    }

}

export interface ShowInputDTO{
    week_day: string;
    start_time: number;
    end_time: number;
    band_id: string;
}

export interface FindShowsInputDTO{
    week_day: ValidDays;
}

export enum ValidDays{
    SEXTA = "SEXTA",
    SABADO = "SABADO",
    DOMINGO = "DOMINGO",
}