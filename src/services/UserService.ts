import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository"



class UserService {

    private settingsRepository: Repository<User>
    usersRepository: UsersRepository;

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository)

    }

    async findByEmail(email: string) {
        return this.usersRepository.findOne({ email })
    }

    async create(email: string) {
        // const usersRepository = getCustomRepository(UsersRepository)
        //veric se user existe
        const tem_usu = await this.usersRepository.findOne({
            email,
        })

        // se nao existir, salvar no bd
        if (tem_usu) {
            return tem_usu;
        }

        const user = this.usersRepository.create({
            email,
        })

        await this.usersRepository.save(user)


        //se existir retorna o usuario
        return user;
    }
}

export { UserService }