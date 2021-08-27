import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { FindShowsInputDTO, ShowInputDTO } from "../model/Show";
import { formatDate } from "../utilities/formatDate";

export class ShowController {
    async createShow(req: Request, res: Response) {
        try {

            const userToken = req.headers.authorization as string

            const input: ShowInputDTO = {
                week_day: req.body.week_day,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
                band_id: req.body.band_id
            }

            const showBusiness = new ShowBusiness();
            await showBusiness.createShow(input, userToken);

            res.status(200).send("Show criado com sucesso");

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async findShow(req: Request, res: Response) {

        try {

            const input: FindShowsInputDTO = {
                week_day: req.body.week_day
            }

            const showBusiness = new ShowBusiness();
            const shows = await showBusiness.findShow(input);

            res.status(200).send({ shows });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}