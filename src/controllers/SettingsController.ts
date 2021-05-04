import { Request, response, Response } from "express";
import { getCustomRepository } from "typeorm"
import { SettingsRepository } from "../repositories/SettingsRepository"
import { SettingsService } from "../services/SettingsService";


class SettingsController {

    async create(request: Request, response: Response) {
        const { chat, nome } = request.body;

        const settingsService = new SettingsService();

        try {
            const settings = await settingsService.create({ chat, nome })

            return response.json(settings)
        } catch (errado) {
            return response.status(400).json({
                message: errado.message,
            })
        }
    }

    async findByUsername(request: Request, response: Response) {
        const { nome } = request.params;

        const settingsService = new SettingsService()

        const settings = await settingsService.findByUsername(nome)
        return response.json(settings)
    }

    async update(request: Request, response: Response) {
        const { nome } = request.params;
        const { chat } = request.body;

        const settingsService = new SettingsService()

        const settings = await settingsService.update(nome, chat)
        return response.json(settings)
    }

}

export { SettingsController }