-- MySQL Script generated by MySQL Workbench
-- Fri Apr 29 09:31:07 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema amethysta
-- -----------------------------------------------------
DROP DATABASE `amethysta`;
CREATE SCHEMA IF NOT EXISTS `amethysta` DEFAULT CHARACTER SET utf8mb4 ;
USE `amethysta` ;

-- -----------------------------------------------------
-- Table `amethysta`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `amethysta`.`user` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `lastname` VARCHAR(45) NULL,
  `firstname` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `date_of_birth` DATE NULL,
  `country` VARCHAR(45) NULL,
  `picture_path` VARCHAR(2048) NULL,
  `password` VARCHAR(255) NULL,
  `is_email_authorized` TINYINT NULL,
  `is_validate` TINYINT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE (`email`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `amethysta`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `amethysta`.`post` (
  `id_post` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `data_path` VARCHAR(255) NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`id_post`),
  INDEX `fk_post_user_idx` (`id_user` ASC) VISIBLE,
  CONSTRAINT `fk_post_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `amethysta`.`user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `amethysta`.`conversation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `amethysta`.`conversation` (
  `id_conversation` INT NOT NULL AUTO_INCREMENT,
  `user_to_user` VARCHAR(45) NULL,
  PRIMARY KEY (`id_conversation`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `amethysta`.`message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `amethysta`.`message` (
  `id_message` INT NOT NULL AUTO_INCREMENT,
  `id_conversation` INT NOT NULL,
  `id_user` INT NOT NULL,
  `date` DATETIME NULL,
  `content` VARCHAR(255) NULL,
  PRIMARY KEY (`id_message`),
  INDEX `fk_message_conversation1_idx` (`id_conversation` ASC) VISIBLE,
  INDEX `fk_message_user1_idx` (`id_user` ASC) VISIBLE,
  CONSTRAINT `fk_message_conversation1`
    FOREIGN KEY (`id_conversation`)
    REFERENCES `amethysta`.`conversation` (`id_conversation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_message_user1`
    FOREIGN KEY (`id_user`)
    REFERENCES `amethysta`.`user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `amethysta`.`like`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `amethysta`.`like` (
  `id_like` INT NOT NULL AUTO_INCREMENT,
  `id_post` INT NOT NULL,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id_like`),
  INDEX `fk_like_post1_idx` (`id_post` ASC) VISIBLE,
  INDEX `fk_like_user1_idx` (`id_user` ASC) VISIBLE,
  CONSTRAINT `fk_like_post1`
    FOREIGN KEY (`id_post`)
    REFERENCES `amethysta`.`post` (`id_post`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_like_user1`
    FOREIGN KEY (`id_user`)
    REFERENCES `amethysta`.`user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `amethysta`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `amethysta`.`comment` (
  `id_comment` INT NOT NULL AUTO_INCREMENT,
  `id_post` INT NOT NULL,
  `id_user` INT NOT NULL,
  `content` VARCHAR(255) NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_comment`),
  INDEX `fk_comment_post1_idx` (`id_post` ASC) VISIBLE,
  INDEX `fk_comment_user1_idx` (`id_user` ASC) VISIBLE,
  CONSTRAINT `fk_comment_post1`
    FOREIGN KEY (`id_post`)
    REFERENCES `amethysta`.`post` (`id_post`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_user1`
    FOREIGN KEY (`id_user`)
    REFERENCES `amethysta`.`user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `amethysta`.`save`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `amethysta`.`save` (
  `id_save` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `id_post` INT NOT NULL,
  PRIMARY KEY (`id_save`),
  INDEX `fk_save_user1_idx` (`id_user` ASC) VISIBLE,
  INDEX `fk_save_post1_idx` (`id_post` ASC) VISIBLE,
  CONSTRAINT `fk_save_user1`
    FOREIGN KEY (`id_user`)
    REFERENCES `amethysta`.`user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_save_post1`
    FOREIGN KEY (`id_post`)
    REFERENCES `amethysta`.`post` (`id_post`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `amethysta`.`notification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `amethysta`.`notification` (
  `id_notification` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `table` VARCHAR(45) NULL,
  `id_entity` INT NULL,
  PRIMARY KEY (`id_notification`),
  INDEX `fk_notification_user1_idx` (`id_user` ASC) VISIBLE,
  CONSTRAINT `fk_notification_user1`
    FOREIGN KEY (`id_user`)
    REFERENCES `amethysta`.`user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
