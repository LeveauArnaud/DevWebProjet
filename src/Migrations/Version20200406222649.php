<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200406222649 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE magasin (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE stock ADD quantitãe INT NOT NULL, CHANGE quantit id_magasin_id INT NOT NULL');
        $this->addSql('ALTER TABLE stock ADD CONSTRAINT FK_4B3656608583EA34 FOREIGN KEY (id_magasin_id) REFERENCES magasin (id)');
        $this->addSql('CREATE INDEX IDX_4B3656608583EA34 ON stock (id_magasin_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE stock DROP FOREIGN KEY FK_4B3656608583EA34');
        $this->addSql('DROP TABLE magasin');
        $this->addSql('DROP INDEX IDX_4B3656608583EA34 ON stock');
        $this->addSql('ALTER TABLE stock ADD quantit INT NOT NULL, DROP id_magasin_id, DROP quantitãe');
    }
}
