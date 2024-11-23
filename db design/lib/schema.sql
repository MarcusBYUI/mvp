-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema symbiote
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema symbiote
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `symbiote` DEFAULT CHARACTER SET utf8 ;
USE `symbiote` ;

-- -----------------------------------------------------
-- Table `symbiote`.`sales`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `symbiote`.`sales` (
  `sales_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(250) NOT NULL,
  `tokenName` VARCHAR(250) NOT NULL,
  `tokenSymbol` VARCHAR(250) NOT NULL,
  `tokenDecimals` INT NOT NULL,
  `tokenAddress` VARCHAR(250) NOT NULL,
  `saleAddress` VARCHAR(250) NOT NULL,
  `owner` VARCHAR(250) NOT NULL,
  `chain` VARCHAR(250) NOT NULL,
  `phase` VARCHAR(250) NOT NULL,
  `logo` VARCHAR(250) NOT NULL,
  `website` VARCHAR(250) NOT NULL DEFAULT '\"\"',
  `twitter` VARCHAR(250) NOT NULL DEFAULT '\"\"',
  `discord` VARCHAR(250) NOT NULL DEFAULT '\"\"',
  `telegram` VARCHAR(250) NOT NULL DEFAULT '\"\"',
  `medium` VARCHAR(250) NOT NULL DEFAULT '\"\"',
  `description` LONGTEXT NOT NULL,
  `totalSupply` BIGINT NOT NULL,
  `presaleAmount` BIGINT NOT NULL,
  `presaleRate` DECIMAL(18,9) NOT NULL,
  `listingRate` DECIMAL(18,9) NOT NULL,
  `softcap` BIGINT NOT NULL,
  `hardcap` BIGINT NOT NULL,
  `raised` DECIMAL(18,9) NOT NULL DEFAULT 0,
  `liquidity` BIGINT NOT NULL,
  `minBuy` DECIMAL(18,9) NOT NULL,
  `maxBuy` DECIMAL(18,9) NOT NULL,
  `lockTime` BIGINT NOT NULL,
  `startTime` TIMESTAMP NOT NULL,
  `endTime` TIMESTAMP NOT NULL,
  `soldOut` TINYINT NOT NULL DEFAULT 0,
  `votes` BIGINT NOT NULL DEFAULT 0,
  `affiliate` BIGINT NOT NULL,
  `kyc` TINYINT NOT NULL DEFAULT 0,
  `audit` TINYINT NOT NULL DEFAULT 0,
  `refund` TINYINT NOT NULL,
  `listingOn` VARCHAR(250) NOT NULL,
  `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `harsh` VARCHAR(250) NOT NULL,
  `published` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`sales_id`),
  UNIQUE INDEX `id_UNIQUE` (`sales_id` ASC) VISIBLE,
  UNIQUE INDEX `contract_UNIQUE` (`saleAddress` ASC, `chain` ASC) VISIBLE,
  UNIQUE INDEX `harsh_UNIQUE` (`harsh` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `symbiote`.`vote`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `symbiote`.`vote` (
  `vote_id` INT NOT NULL AUTO_INCREMENT,
  `sale_id` INT NOT NULL,
  `votes` BIGINT NOT NULL,
  `user` VARCHAR(250) NOT NULL,
  `time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`vote_id`),
  INDEX `vote_fk_1_idx` (`sale_id` ASC) VISIBLE,
  UNIQUE INDEX `user_UNIQUE` (`user` ASC) VISIBLE,
  UNIQUE INDEX `vote_id_UNIQUE` (`vote_id` ASC) VISIBLE,
  CONSTRAINT `vote_fk_1`
    FOREIGN KEY (`sale_id`)
    REFERENCES `symbiote`.`sales` (`sales_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `symbiote`.`contribution`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `symbiote`.`contribution` (
  `contribution_id` INT NOT NULL AUTO_INCREMENT,
  `saleAddress` VARCHAR(250) NOT NULL,
  `user` VARCHAR(250) NOT NULL,
  `time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`contribution_id`),
  UNIQUE INDEX `contribution_id_UNIQUE` (`contribution_id` ASC) VISIBLE,
  INDEX `contribution_fk_1_idx` (`saleAddress` ASC) VISIBLE,
  UNIQUE INDEX `contribution_unique` (`saleAddress` ASC, `user` ASC) VISIBLE,
  CONSTRAINT `contribution_fk_1`
    FOREIGN KEY (`saleAddress`)
    REFERENCES `symbiote`.`sales` (`saleAddress`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `symbiote`.`pools`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `symbiote`.`pools` (
  `pool_id` INT NOT NULL AUTO_INCREMENT,
  `rewardTokenSymbol` VARCHAR(250) NOT NULL,
  `stakeTokenSymbol` VARCHAR(250) NOT NULL,
  `stakeTokenAddress` VARCHAR(250) NOT NULL,
  `rewardTokenAddress` VARCHAR(250) NOT NULL,
  `poolAddress` VARCHAR(250) NOT NULL,
  `owner` VARCHAR(250) NOT NULL,
  `chain` VARCHAR(250) NOT NULL,
  `stakeTokenLogo` VARCHAR(250) NOT NULL,
  `rewardTokenLogo` VARCHAR(250) NOT NULL,
  `website` VARCHAR(250) NOT NULL DEFAULT '\"\"',
  `twitter` VARCHAR(250) NOT NULL DEFAULT '\"\"',
  `discord` VARCHAR(250) NOT NULL DEFAULT '\"\"',
  `telegram` VARCHAR(250) NOT NULL DEFAULT '\"\"',
  `medium` VARCHAR(250) NOT NULL DEFAULT '\"\"',
  `minStake` DECIMAL(18,9) NOT NULL,
  `duration` BIGINT NOT NULL,
  `supply` BIGINT NOT NULL,
  `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `harsh` VARCHAR(250) NOT NULL,
  `amountStaked` DECIMAL(36,18) NOT NULL DEFAULT 0,
  `stakeTokenDecimals` BIGINT NOT NULL,
  `rewardTokenDecimals` BIGINT NOT NULL,
  `published` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`pool_id`),
  UNIQUE INDEX `id_UNIQUE` (`pool_id` ASC) VISIBLE,
  UNIQUE INDEX `contract_UNIQUE` (`poolAddress` ASC, `chain` ASC) VISIBLE,
  UNIQUE INDEX `harsh_UNIQUE` (`harsh` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `symbiote`.`poolcontribution`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `symbiote`.`poolcontribution` (
  `contribution_id` INT NOT NULL AUTO_INCREMENT,
  `poolAddress` VARCHAR(250) NOT NULL,
  `user` VARCHAR(250) NOT NULL,
  `time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`contribution_id`),
  UNIQUE INDEX `contribution_id_UNIQUE` (`contribution_id` ASC) VISIBLE,
  UNIQUE INDEX `contribution_unique` (`poolAddress` ASC, `user` ASC) VISIBLE,
  CONSTRAINT `contribution_fk_10`
    FOREIGN KEY (`poolAddress`)
    REFERENCES `symbiote`.`pools` (`poolAddress`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `symbiote`.`token`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `symbiote`.`token` (
  `token_id` INT NOT NULL AUTO_INCREMENT,
  `harsh` VARCHAR(245) NULL,
  `owner` VARCHAR(245) NOT NULL,
  `tokenAddress` VARCHAR(245) NOT NULL,
  PRIMARY KEY (`token_id`),
  UNIQUE INDEX `token_id_UNIQUE` (`token_id` ASC) VISIBLE,
  UNIQUE INDEX `harsh_UNIQUE` (`harsh` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `symbiote`.`tasks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `symbiote`.`tasks` (
  `task_id` INT NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(250) NOT NULL,
  `referral` VARCHAR(250) NOT NULL,
  `balance` DECIMAL(20,9) NOT NULL DEFAULT 0,
  `points` BIGINT NOT NULL DEFAULT 0,
  `sym_twitter` TINYINT NOT NULL DEFAULT 0,
  `sym_channel` TINYINT NOT NULL DEFAULT 0,
  `sym_group` TINYINT NOT NULL DEFAULT 0,
  `web3_twitter` TINYINT NOT NULL DEFAULT 0,
  `sym_sale` TINYINT NOT NULL DEFAULT 0,
  `vote_sale` TINYINT NOT NULL DEFAULT 0,
  `sym_pool` TINYINT NOT NULL DEFAULT 0,
  `create_sale` TINYINT NOT NULL DEFAULT 0,
  `create_pool` TINYINT NOT NULL DEFAULT 0,
  `create_token` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`task_id`),
  UNIQUE INDEX `task_id_UNIQUE` (`task_id` ASC) VISIBLE,
  UNIQUE INDEX `address_UNIQUE` (`address` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `symbiote`.`daily`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `symbiote`.`daily` (
  `daily_id` INT NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(245) NOT NULL,
  `link` VARCHAR(245) NOT NULL,
  `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`daily_id`),
  UNIQUE INDEX `daily_id_UNIQUE` (`daily_id` ASC) VISIBLE,
  UNIQUE INDEX `address_UNIQUE` (`address` ASC) VISIBLE,
  UNIQUE INDEX `link_UNIQUE` (`link` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `symbiote`.`raised`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `symbiote`.`raised` (
  `raise_id` INT NOT NULL,
  `raised` DECIMAL(20,9) NOT NULL DEFAULT 0,
  PRIMARY KEY (`raise_id`),
  UNIQUE INDEX `sale_id_UNIQUE` (`raise_id` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
