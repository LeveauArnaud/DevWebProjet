<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200407103918 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE etat_commande (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE stock (id INT AUTO_INCREMENT NOT NULL, id_monture_id INT NOT NULL, id_magasin_id INT NOT NULL, quantite INT NOT NULL, INDEX IDX_4B36566071805B6B (id_monture_id), INDEX IDX_4B3656608583EA34 (id_magasin_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE commande_monture (id INT AUTO_INCREMENT NOT NULL, id_client_id INT NOT NULL, id_monture_id INT NOT NULL, etat_id INT NOT NULL, date DATE NOT NULL, commentaire LONGTEXT DEFAULT NULL, INDEX IDX_C8A0E78B99DED506 (id_client_id), INDEX IDX_C8A0E78B71805B6B (id_monture_id), INDEX IDX_C8A0E78BD5E86FF (etat_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE stock ADD CONSTRAINT FK_4B36566071805B6B FOREIGN KEY (id_monture_id) REFERENCES monture (id)');
        $this->addSql('ALTER TABLE stock ADD CONSTRAINT FK_4B3656608583EA34 FOREIGN KEY (id_magasin_id) REFERENCES magasin (id)');
        $this->addSql('ALTER TABLE commande_monture ADD CONSTRAINT FK_C8A0E78B99DED506 FOREIGN KEY (id_client_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE commande_monture ADD CONSTRAINT FK_C8A0E78B71805B6B FOREIGN KEY (id_monture_id) REFERENCES monture (id)');
        $this->addSql('ALTER TABLE commande_monture ADD CONSTRAINT FK_C8A0E78BD5E86FF FOREIGN KEY (etat_id) REFERENCES etat_commande (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE commande_monture DROP FOREIGN KEY FK_C8A0E78BD5E86FF');
        $this->addSql('DROP TABLE etat_commande');
        $this->addSql('DROP TABLE stock');
        $this->addSql('DROP TABLE commande_monture');
    }
}
