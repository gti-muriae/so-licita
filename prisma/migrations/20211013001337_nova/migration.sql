-- CreateTable
CREATE TABLE `cadastra`
(
    `fk_prefeitura_CODPREFEITURA` INTEGER,
    `fk_licitacao_CODLIC`         INTEGER
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classifica`
(
    `fk_rup_COD`  INTEGER,
    `fk_cnae_COD` INTEGER
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cnae`
(
    `COD`       INTEGER NOT NULL,
    `DESCRICAO` VARCHAR(30),

    PRIMARY KEY (`COD`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `licitacao`
(
    `CODLIC`      INTEGER NOT NULL,
    `NUM_LIC`     VARCHAR(30),
    `CATEGORIA`   VARCHAR(30),
    `DESCRICAO`   VARCHAR(30),
    `DATA_INICIO` VARCHAR(30),
    `DATA_FINAL`  VARCHAR(30),
    `DATA_AMM`    VARCHAR(30),
    `LINK`        VARCHAR(50),

    PRIMARY KEY (`CODLIC`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissaopagina`
(
    `CODTELA`    INTEGER NOT NULL,
    `CODUSUARIO` INTEGER,
    `VERTELA`    VARCHAR(30),

    PRIMARY KEY (`CODTELA`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prefeitura`
(
    `CODPREFEITURA`           INTEGER NOT NULL,
    `NOME`                    VARCHAR(30),
    `ENDEDRECO`               VARCHAR(30),
    `NUM_ENDERECO`            INTEGER,
    `COMPLEMENTO`             VARCHAR(30),
    `BAIRRO`                  VARCHAR(30),
    `CIDADE`                  VARCHAR(30),
    `UF`                      VARCHAR(30),
    `CEP`                     INTEGER,
    `fk_usuario_rup_CONTROLE` INTEGER,
    `fk_usuario_rup_COD`      INTEGER,

    PRIMARY KEY (`CODPREFEITURA`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `telas`
(
    `CODTELA` INTEGER NOT NULL,
    `NOMEJS`  VARCHAR(30),
    `TITULO`  VARCHAR(30),
    `ICONE`   VARCHAR(30),

    PRIMARY KEY (`CODTELA`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario_rup`
(
    `CONTROLE`     INTEGER NOT NULL,
    `APELIDO`      VARCHAR(30),
    `SENHA`        VARCHAR(100),
    `EMAIL`        VARCHAR(30),
    `FONECEL`      VARCHAR(9),
    `CPF`          VARCHAR(12),
    `IE`           INTEGER,
    `DTABERTURA`   VARCHAR(20),
    `NOME`         VARCHAR(30),
    `ENDERECO`     VARCHAR(30),
    `NUM_ENDERECO` INTEGER,
    `COMPLEMENTO`  VARCHAR(30),
    `BAIRRO`       VARCHAR(30),
    `CIDADE`       VARCHAR(20),
    `UF`           VARCHAR(2),
    `CEP`          INTEGER,
    `COD`          INTEGER NOT NULL,
    `RAZAOSOCIAL`  VARCHAR(50),
    `CNPJ`         VARCHAR(20),

    PRIMARY KEY (`CONTROLE`, `COD`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
