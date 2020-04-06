<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200406220646 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE stock (id INT AUTO_INCREMENT NOT NULL, id_monture_id INT NOT NULL, quantitãe INT NOT NULL, INDEX IDX_4B36566071805B6B (id_monture_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE monture (id INT AUTO_INCREMENT NOT NULL, marque VARCHAR(255) NOT NULL, model VARCHAR(255) NOT NULL, couleur VARCHAR(255) NOT NULL, taille VARCHAR(255) NOT NULL, prix INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE verres (id INT AUTO_INCREMENT NOT NULL, marque VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE stock ADD CONSTRAINT FK_4B36566071805B6B FOREIGN KEY (id_monture_id) REFERENCES monture (id)');
        $this->addSql('ALTER TABLE correction CHANGE o_d o_d LONGTEXT NOT NULL, CHANGE o_g o_g LONGTEXT NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE stock DROP FOREIGN KEY FK_4B36566071805B6B');
        $this->addSql('DROP TABLE stock');
        $this->addSql('DROP TABLE monture');
        $this->addSql('DROP TABLE verres');
        $this->addSql('ALTER TABLE correction CHANGE o_d o_d LONGTEXT NOT NULL COLLATE utf8mb4_unicode_ci COMMENT \'(DC2Type:array)\', CHANGE o_g o_g LONGTEXT NOT NULL COLLATE utf8mb4_unicode_ci COMMENT \'(DC2Type:array)\'');
    }
}
