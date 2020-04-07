<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200407104556 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE commande_verre ADD etat_id INT NOT NULL, DROP etat');
        $this->addSql('ALTER TABLE commande_verre ADD CONSTRAINT FK_F284081DD5E86FF FOREIGN KEY (etat_id) REFERENCES etat_commande (id)');
        $this->addSql('CREATE INDEX IDX_F284081DD5E86FF ON commande_verre (etat_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE commande_verre DROP FOREIGN KEY FK_F284081DD5E86FF');
        $this->addSql('DROP INDEX IDX_F284081DD5E86FF ON commande_verre');
        $this->addSql('ALTER TABLE commande_verre ADD etat VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, DROP etat_id');
    }
}
