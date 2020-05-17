<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200516131051 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE commande_verre CHANGE diam_d diam_d INT DEFAULT NULL, CHANGE diam_g diam_g INT DEFAULT NULL, CHANGE prix_supp2 prix_supp2 INT DEFAULT NULL, CHANGE prix_supp3 prix_supp3 INT DEFAULT NULL, CHANGE prix_supp4 prix_supp4 INT DEFAULT NULL');
        $this->addSql('ALTER TABLE correction CHANGE sph_od_l sph_od_l DOUBLE PRECISION DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE commande_verre CHANGE diam_d diam_d INT NOT NULL, CHANGE diam_g diam_g INT NOT NULL, CHANGE prix_supp2 prix_supp2 INT NOT NULL, CHANGE prix_supp3 prix_supp3 INT NOT NULL, CHANGE prix_supp4 prix_supp4 INT NOT NULL');
        $this->addSql('ALTER TABLE correction CHANGE sph_od_l sph_od_l INT DEFAULT NULL');
    }
}
