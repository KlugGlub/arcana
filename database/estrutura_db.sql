create database if not exists db_arcana;

use db_arcana;

create table if not exists tb_usuarios(
	id int unsigned primary key auto_increment,
    nome varchar(255) not null,
    email varchar(255) not null unique,
    senha varchar (255) not null,
    data_nascimento date not null
);

create table if not exists tb_cartas(
	id int unsigned primary key auto_increment,
    nome varchar(255) not null,
    numero tinyint not null,
    palavra_chave varchar(255) not null,
    arcano enum('maior', 'menor') not null
);

create table if not exists tb_arcanos_maiores(
	id_carta int unsigned primary key,
    jornada tinyint not null,
    arquétipo varchar(255) not null,
    constraint cartas_arcanos_maiores foreign key (id_carta) references tb_cartas(id)
);

create table if not exists tb_arcanos_menores(
	id_carta int unsigned primary key,
    naipe varchar(10) not null,
	constraint cartas_arcanos_menores foreign key (id_carta) references tb_cartas(id)
);

create table if not exists tb_leituras(
	id int unsigned primary key auto_increment,
    id_usuario int unsigned not null,
    data_leitura datetime not null,
    tipo_tiragem enum('3 cartas', 'tiragem do dia', 'compatibilidade amorosa') not null,
    pergunta longblob,
	resultado longblob not null,
    constraint leitura_usuario foreign key (id_usuario) references tb_usuarios(id)
);

create table if not exists tb_leitura_cartas(
	id_leitura int unsigned not null,
    id_carta int unsigned not null,
    constraint leitura_cartas_leitura foreign key (id_leitura) references tb_leituras(id),
    constraint leitura_cartas_cartas foreign key (id_carta) references tb_cartas(id),
    constraint leitura_cartas_unique unique (id_leitura, id_carta)
);

create table if not exists tb_compatibilidade_amorosa(
	id int unsigned primary key auto_increment,
	id_leitura int unsigned not null,
    id_carta_usuario int unsigned not null,
    id_carta_parceiro int unsigned not null,
    id_carta_resultado int unsigned not null,
    nome_parceiro varchar(255) not null,
    data_nascimento_parceiro date not null,
    constraint compatibilidade_leitura foreign key (id_leitura) references tb_leituras(id),
    constraint carta_usuario foreign key (id_carta_usuario) references tb_cartas(id),
    constraint carta_parceiro foreign key (id_carta_parceiro) references tb_cartas(id),
    constraint carta_resultado foreign key (id_carta_resultado) references tb_cartas(id)
);