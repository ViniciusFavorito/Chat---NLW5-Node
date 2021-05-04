import { getCustomRepository, Repository } from "typeorm"
import { Setting } from "../entities/Settings";
import { SettingsRepository } from "../repositories/SettingsRepository"

interface ISettingsCreate {
    chat: boolean;
    nome: string;
}

class SettingsService {

    private settingsRepository: Repository<Setting>

    constructor() {
        this.settingsRepository = getCustomRepository(SettingsRepository);

    }

    async create({ chat, nome }: ISettingsCreate) {

        // select * from settings where nome  = "nome" limit 1
        const nome_ja_tem = await this.settingsRepository.findOne({
            nome,
        })
        if (nome_ja_tem) {
            throw new Error("Esse cara ja ta cadastrado");
        }

        const setting = this.settingsRepository.create({
            chat,
            nome,
        })

        await this.settingsRepository.save(setting)

        return setting;
    }

    async findByUsername(nome: string) {
        const settings = await this.settingsRepository.findOne({
            nome,
        })
        return settings;
    }

    async update(nome: string, chat: boolean) {
        await this.settingsRepository.createQueryBuilder().update(Setting).set({ chat }).where("nome=:nome", {
            nome,
        }).execute()

    }

}

export { SettingsService }