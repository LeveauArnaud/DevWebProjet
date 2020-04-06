<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200406225854 extends AbstractMigration
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
        $this->addSql('ALTER TABLE commande_monture ADD id_client_id INT NOT NULL, ADD id_monture_id INT NOT NULL');
        $this->addSql('ALTER TABLE commande_monture ADD CONSTRAINT FK_C8A0E78B99DED506 FOREIGN KEY (id_client_id) REFERENCES client (id)');
        $this->addSql('ALTER TABLE commande_monture ADD CONSTRAINT FK_C8A0E78B71805B6B FOREIGN KEY (id_monture_id) REFERENCES monture (id)');
        $this->addSql('CREATE INDEX IDX_C8A0E78B99DED506 ON commande_monture (id_client_id)');
        $this->addSql('CREATE INDEX IDX_C8A0E78B71805B6B ON commande_monture (id_monture_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE commande_monture DROP FOREIGN KEY FK_C8A0E78B99DED506');
        $this->addSql('ALTER TABLE commande_monture DROP FOREIGN KEY FK_C8A0E78B71805B6B');
        $this->addSql('DROP INDEX IDX_C8A0E78B99DED506 ON commande_monture');
        $this->addSql('DROP INDEX IDX_C8A0E78B71805B6B ON commande_monture');
        $this->addSql('ALTER TABLE commande_monture DROP id_client_id, DROP id_monture_id');
        $this->addSql('ALTER TABLE stock CHANGE quantitãe quantit INT NOT NULL');
    }
}
