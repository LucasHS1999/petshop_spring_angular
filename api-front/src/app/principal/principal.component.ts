import { Component } from '@angular/core';
import { Cliente } from '../modelo/Cliente';
import { ClienteService } from '../servico/cliente.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent {
  // Objeto cliente
  cliente = new Cliente();

  // Variavel para visibilidade dos botoes
  btnCadastro: boolean = true;
  tabela: boolean = true;

  // JSON DE CLIENTES
  clientes: Cliente[] = [];

  constructor(private servico: ClienteService) {}

  // Metodo para selecionar os clientes
  selecionar(): void {
    this.servico.selecionar().subscribe((retorno) => {
      this.clientes = retorno;
    });
  }

  cadastrar(): void {
    this.servico.cadastrar(this.cliente).subscribe((retorno) => {
      this.clientes.push(retorno);
      //limpar
      this.cliente = new Cliente();

      alert('Cliente cadastrado com sucesso!');
    });
  }

  //Metodo para selecionar o cliente
  selecionarCliente(posicao: number): void {
    //Selecionar cliente
    this.cliente = this.clientes[posicao];

    //Visibilidade dos botoes
    this.btnCadastro = false;
    this.tabela = false;
  }

  editar(): void {
    this.servico.editar(this.cliente).subscribe((retorno) => {
      //Obter posição do vetor onde está o clinete
      let posicao = this.clientes.findIndex((obj) => {
        return obj.codigo == retorno.codigo;
      });

      //Alterar os dados do cliente
      this.clientes[posicao] = retorno;

      this.cliente = new Cliente();
      this.btnCadastro = true;
      this.tabela = true;

      alert('Cliente alterado com sucesso!');
    });
  }

  remover(): void {
    this.servico.remover(this.cliente.codigo).subscribe(() => {
      let posicao = this.clientes.findIndex((obj) => {
        return obj.codigo == this.cliente.codigo;
      });

      this.clientes.splice(posicao, 1);

      this.cliente = new Cliente();
      this.btnCadastro = true;
      this.tabela = true;

      alert('Cliente removido com sucesso!');
    });
  }

  cancelar(): void {
    this.cliente = new Cliente();
    this.btnCadastro = true;
    this.tabela = true;
  }

  // Metodo de inicialização
  ngOnInit() {
    this.selecionar();
  }
}
