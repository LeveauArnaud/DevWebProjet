<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200406203016 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE prescripteur (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE correction (id INT AUTO_INCREMENT NOT NULL, id_client_id INT NOT NULL, id_prescripteur_id INT NOT NULL, date DATE NOT NULL, date_prescription DATETIME NOT NULL, o_d LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', o_g LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', commentaire LONGTEXT DEFAULT NULL, INDEX IDX_A29DA1B899DED506 (id_client_id), INDEX IDX_A29DA1B83DD825CA (id_prescripteur_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE correction ADD CONSTRAINT FK_A29DA1B899DED506 FOREIGN KEY (id_client_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE correction ADD CONSTRAINT FK_A29DA1B83DD825CA FOREIGN KEY (id_prescripteur_id) REFERENCES prescripteur (id)');
        $this->addSql('DROP TABLE stock');
        $this->addSql('DROP INDEX UNIQ_C74404556C6E55B5 ON client');
        $this->addSql('ALTER TABLE client ADD code_postale INT NOT NULL, CHANGE pays pays VARCHAR(100) NOT NULL, CHANGE email email VARCHAR(255) DEFAULT NULL, CHANGE sexe sexe VARCHAR(1) NOT NULL, CHANGE photo photo VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE correction DROP FOREIGN KEY FK_A29DA1B83DD825CA');
        $this->addSql('CREATE TABLE stock (id INT AUTO_INCREMENT NOT NULL, magasin VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, produit VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, marque VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, model VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, couleur VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, taille VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, prix VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('DROP TABLE prescripteur');
        $this->addSql('DROP TABLE correction');
        $this->addSql('ALTER TABLE client DROP code_postale, CHANGE pays pays VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, CHANGE email email VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, CHANGE sexe sexe VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, CHANGE photo photo LONGBLOB DEFAULT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_C74404556C6E55B5 ON client (nom)');
    }
}
