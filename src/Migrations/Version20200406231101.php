<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200406231101 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE commande_verre (id INT AUTO_INCREMENT NOT NULL, id_client_id INT NOT NULL, date DATE NOT NULL, diam_d INT NOT NULL, diam_g INT NOT NULL, supp1 VARCHAR(255) DEFAULT NULL, supp2 VARCHAR(255) DEFAULT NULL, supp3 VARCHAR(255) DEFAULT NULL, supp4 VARCHAR(255) DEFAULT NULL, prix_od INT NOT NULL, prix_og INT NOT NULL, prix_supp1 INT NOT NULL, prix_supp2 INT NOT NULL, prix_supp3 INT NOT NULL, prix_supp4 INT NOT NULL, commentaire LONGTEXT DEFAULT NULL, etat VARCHAR(255) NOT NULL, INDEX IDX_F284081D99DED506 (id_client_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE commande_verre ADD CONSTRAINT FK_F284081D99DED506 FOREIGN KEY (id_client_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE stock CHANGE quantit quantitãe INT NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE commande_verre');
        $this->addSql('ALTER TABLE stock CHANGE quantitãe quantit INT NOT NULL');
    }
}
