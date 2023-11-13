import { Injectable } from '@nestjs/common';
import { RegisterService } from './controllers/register/register.service';
import { ExamHistoryService } from './controllers/examHistory/examHistory.service';
@Injectable()
export class AppService {
  constructor(
    private registerService: RegisterService,
    private historyService: ExamHistoryService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getHistory(user_id: string): Promise<any> {
    const registros = await this.registerService.findUser(user_id);
    const simulados = await this.historyService.findByUserId(user_id);

    // Adicionar o campo qtd_hits a cada objeto em simulados
    const simuladosComQtdHits = simulados.map((simulado: any) => {
      // Calcular a soma dos hits para cada objeto subjects
      const qtdHits = simulado.subjects.reduce(
        (totalHits: number, subject: any) => {
          return totalHits + subject.hits;
        },
        0,
      );

      // Adicionar o campo qtd_hits ao objeto simulado
      return { ...simulado, qtd_hits: qtdHits };
    });

    return {
      registros: registros,
      simulados: simuladosComQtdHits,
    };
  }
}
