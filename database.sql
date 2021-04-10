--drop database matchinpi;
create database matchinpi;
use matchinpi;

-- Simples tabela de usuario focado para o prototipo e loficas para funcionamento do like de o match
create table usuario(
	id_usuario int auto_increment primary key,
    usuario varchar(50) not null unique,
    nome varchar(200) not null,
    email varchar(100),
    email_nit varchar(100),
    url_foto text not null,
    tipo_usuario varchar(50),
    classe_interesse text,
    descricao text,
    match_users json default "[]",
    like_users json default "[]",
    deslike_users json default "[]"
)
engine = INNODB
default charset = utf8;

insert into usuario ( usuario, nome, email, url_foto, tipo_usuario, classe_interesse, descricao )
values ( 'matheus123', 'Matheus Oliveira', 'matheus123@gmail.com', 'http://www.foto.com/matheus123', 'Empresario', 'A41', 'Empresario' );
insert into usuario ( usuario, nome, email, email_nit, url_foto, tipo_usuario, classe_interesse, descricao )
values ( 'isabela123', 'Isabela Montana', 'isabela123@gmail.com', 'isabela123@gmail.com', 'http://www.foto.com/isabela123', 'Pesquisador', 'A41', 'Pesquisador' );
insert into usuario ( usuario, nome, email, email_nit, url_foto, tipo_usuario, classe_interesse, descricao )
values ( 'ronaldo123', 'Ronaldo Fonome', 'ronaldo123@gmail.com', 'ronaldo123@gmail.com', 'http://www.foto.com/ronaldo123', 'Pesquisador', 'A41', 'Pesquisador' );
insert into usuario ( usuario, nome, email, url_foto, tipo_usuario, classe_interesse, descricao )
values ( 'savio123', 'Savio Rocha', 'savio123@gmail.com', 'http://www.foto.com/savio123', 'Empresario', 'A46', 'Empresario' );

-- Classificação IPC
create table classe_ipc(
	id_ipc int auto_increment primary key,
    codigo varchar(10),
    descricao varchar(500)
)
engine = INNODB
default charset = utf8;

insert into classe_ipc( codigo, descricao ) values ( 'A01','AGRICULTURA; SILVICULTURA; PECUÁRIA; CAÇA; CAPTURA EM ARMADILHAS; PESCA' );
insert into classe_ipc( codigo, descricao ) values ( 'A21','COZEDURA AO FORNO; EQUIPAMENTO PARA PREPARO OU PROCESSAMENTO DE MASSAS; MASSAS PARA COZEDURA AO FORNO' );
insert into classe_ipc( codigo, descricao ) values ( 'A22','MATANÇA DE ANIMAIS; BENEFICIAMENTO DA CARNE; PROCESSAMENTO DE AVES DOMÉSTICAS OU PEIXES' );
insert into classe_ipc( codigo, descricao ) values ( 'A23','ALIMENTOS OU PRODUTOS ALIMENTÍCIOS; SEU BENEFICIAMENTO, NÃO ABRANGIDO POR OUTRAS CLASSES' );
insert into classe_ipc( codigo, descricao ) values ( 'A24','TABACO; CHARUTOS; CIGARROS; DISPOSITIVOS SIMULADORES DE FUMO; ARTIGOS PARA FUMANTES' );
insert into classe_ipc( codigo, descricao ) values ( 'A41','VESTUÁRIO' );
insert into classe_ipc( codigo, descricao ) values ( 'A42','CHAPÉUS' );
insert into classe_ipc( codigo, descricao ) values ( 'A43','CALÇADOS' );
insert into classe_ipc( codigo, descricao ) values ( 'A44','ARTIGOS DE ARMARINHO; BIJUTERIA' );
insert into classe_ipc( codigo, descricao ) values ( 'A45','ARTIGOS PORTÁTEIS OU DE VIAGEM' );
insert into classe_ipc( codigo, descricao ) values ( 'A46','ESCOVAS' );
insert into classe_ipc( codigo, descricao ) values ( 'A47','MÓVEIS; ARTIGOS OU APARELHOS DOMÉSTICOS; MOINHOS DE CAFÉ; MOINHOS DE ESPECIARIA; ASPIRADORES EM GERAL' );
insert into classe_ipc( codigo, descricao ) values ( 'A61','CIÊNCIA MÉDICA OU VETERINÁRIA; HIGIENE' );
insert into classe_ipc( codigo, descricao ) values ( 'A62','SALVAMENTO; COMBATE AO FOGO' );
insert into classe_ipc( codigo, descricao ) values ( 'A63','ESPORTES; JOGOS; RECREAÇÃO' );
insert into classe_ipc( codigo, descricao ) values ( 'A99','MATÉRIA NÃO INCLUÍDA EM OUTRO LOCAL DESTA SEÇÃO' );
insert into classe_ipc( codigo, descricao ) values ( 'B01','PROCESSOS OU APARELHOS FÍSICOS OU QUÍMICOS EM GERAL' );
insert into classe_ipc( codigo, descricao ) values ( 'B02','TRITURAÇÃO, PULVERIZAÇÃO OU DESINTEGRAÇÃO; BENEFICIAMENTO PRELIMINAR DO GRÃO ANTES DA MOAGEM' );
insert into classe_ipc( codigo, descricao ) values ( 'B03','SEPARAÇÃO DE MATERIAIS SÓLIDOS UTILIZANDO LÍQUIDOS OU MESAS OU PENEIRAS PNEUMÁTICAS; SEPARAÇÃO MAGNÉTICA OU ELETROSTÁTICA DE MATERIAIS SÓLIDOS DOS MATERIAIS SÓLIDOS OU FLUIDOS; SEPARAÇÃO POR MEIO DE CAMPOS ELÉTRICOS DE ALTA-TENSÃO' );
insert into classe_ipc( codigo, descricao ) values ( 'B04','APARELHOS OU MÁQUINAS CENTRÍFUGAS PARA EFETUAR PROCESSOS FÍSICOS OU QUÍMICOS' );
insert into classe_ipc( codigo, descricao ) values ( 'B05','PULVERIZAÇÃO OU ATOMIZAÇÃO EM GERAL; APLICAÇÃO DE LÍQUIDOS OU DE OUTROS MATERIAIS FLUENTES A SUPERFÍCIES EM GERAL' );
insert into classe_ipc( codigo, descricao ) values ( 'B06','PRODUÇÃO OU TRANSMISSÃO DE VIBRAÇÕES MECÂNICAS EM GERAL' );
insert into classe_ipc( codigo, descricao ) values ( 'B07','SEPARAÇÃO DE SÓLIDOS DE OUTROS SÓLIDOS; SELECIONAMENTO' );
insert into classe_ipc( codigo, descricao ) values ( 'B08','LIMPEZA' );
insert into classe_ipc( codigo, descricao ) values ( 'B09','ELIMINAÇÃO DE RESÍDUOS SÓLIDOS; RECUPERAÇÃO DE SOLO CONTAMINADO' );

-- Tabela para logica do chat
create table chat (
	id_chat int auto_increment primary key,
    usuario varchar(50) not null,
    like_usuario varchar(50) not null,
    liberado boolean default false,
    token varchar(100),
    mensagens json
)
engine = INNODB
default charset = utf8;
