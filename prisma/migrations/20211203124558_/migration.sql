-- CreateTable
CREATE TABLE `cadastra` (
    `fk_prefeitura_CODPREFEITURA` INTEGER NULL,
    `fk_licitacao_CODLIC` INTEGER NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classifica` (
    `fk_rup_COD` INTEGER NULL,
    `fk_cnae_COD` INTEGER NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cnae` (
    `id` INTEGER NOT NULL,
    `desc` VARCHAR(30) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descNome` VARCHAR(50) NOT NULL,
    `desc` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `licitacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numLicit` VARCHAR(30) NULL,
    `idCategoria` INTEGER NOT NULL,
    `desc` VARCHAR(30) NULL,
    `datInicio` VARCHAR(30) NULL,
    `datFinal` VARCHAR(30) NULL,
    `datAmm` VARCHAR(30) NULL,
    `urlPdf` VARCHAR(100) NULL,
    `flgStatus` VARCHAR(191) NOT NULL,
    `idPrefeitura` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuariolicit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `datEntrada` VARCHAR(20) NOT NULL,
    `flgStatus` INTEGER NOT NULL,
    `idUsuario` INTEGER NOT NULL,
    `idLicit` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuariocategoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idCategoria` INTEGER NOT NULL,
    `idUsuario` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissaopagina` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codUsuario` INTEGER NULL,
    `tela` VARCHAR(30) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prefeitura` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(30) NULL,
    `endereco` VARCHAR(30) NULL,
    `numero` INTEGER NULL,
    `complemento` VARCHAR(30) NULL,
    `bairro` VARCHAR(30) NULL,
    `cidade` VARCHAR(30) NULL,
    `uf` VARCHAR(30) NULL,
    `cod_cep` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `telas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(30) NULL,
    `titulo` VARCHAR(30) NULL,
    `icon` VARCHAR(30) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario_rup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `apelido` VARCHAR(30) NULL,
    `senha` VARCHAR(100) NULL,
    `email` VARCHAR(30) NULL,
    `contato` VARCHAR(9) NULL,
    `cpf` VARCHAR(12) NULL,
    `ie` INTEGER NULL,
    `datAbertura` VARCHAR(20) NULL,
    `nome` VARCHAR(30) NULL,
    `endereco` VARCHAR(30) NULL,
    `numero` INTEGER NULL,
    `complemento` VARCHAR(30) NULL,
    `bairro` VARCHAR(30) NULL,
    `cidade` VARCHAR(20) NULL,
    `uf` VARCHAR(2) NULL,
    `codCep` INTEGER NULL,
    `razSocial` VARCHAR(50) NULL,
    `codCnpj` INTEGER NOT NULL,
    `fmcToken` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `licitacao` ADD CONSTRAINT `licitacao_idCategoria_fkey` FOREIGN KEY (`idCategoria`) REFERENCES `categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `licitacao` ADD CONSTRAINT `licitacao_idPrefeitura_fkey` FOREIGN KEY (`idPrefeitura`) REFERENCES `prefeitura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuariolicit` ADD CONSTRAINT `usuariolicit_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `usuario_rup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuariolicit` ADD CONSTRAINT `usuariolicit_idLicit_fkey` FOREIGN KEY (`idLicit`) REFERENCES `licitacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuariocategoria` ADD CONSTRAINT `usuariocategoria_idCategoria_fkey` FOREIGN KEY (`idCategoria`) REFERENCES `categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuariocategoria` ADD CONSTRAINT `usuariocategoria_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `usuario_rup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
