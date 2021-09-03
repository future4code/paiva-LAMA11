import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { BandInputDTO, FindBandInputDTO } from "../model/Band";

export class BandController {
    async createBand(req: Request, res: Response) {
        try {

            const userToken = req.headers.authorization as string
            const input: BandInputDTO = {
                name: req.body.name,
                music_genre: req.body.music_genre,
                responsible: req.body.responsible,
            }

            const userBusiness = new BandBusiness();
            await userBusiness.createBand(input, userToken);

            res.status(200).send("Banda criada com sucesso");

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async findBand(req: Request, res: Response) {

        try {

            const input: FindBandInputDTO = {
                name: req.body.name,
                id: req.body.id
            }

            const bandBusiness = new BandBusiness();
            const band = await bandBusiness.findBand(input);

            res.status(200).send({ band });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}