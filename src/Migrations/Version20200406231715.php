<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200406231715 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE stock CHANGE quantit quantitãe INT NOT NULL');
        $this->addSql('ALTER TABLE commande_verre ADD id_verre_id INT NOT NULL');
        $this->addSql('ALTER TABLE commande_verre ADD CONSTRAINT FK_F284081DD648CCDF FOREIGN KEY (id_verre_id) REFERENCES verres (id)');
        $this->addSql('CREATE INDEX IDX_F284081DD648CCDF ON commande_verre (id_verre_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE commande_verre DROP FOREIGN KEY FK_F284081DD648CCDF');
        $this->addSql('DROP INDEX IDX_F284081DD648CCDF ON commande_verre');
        $this->addSql('ALTER TABLE commande_verre DROP id_verre_id');
        $this->addSql('ALTER TABLE stock CHANGE quantitãe quantit INT NOT NULL');
    }
}
