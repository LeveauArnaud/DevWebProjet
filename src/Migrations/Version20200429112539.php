<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200429112539 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE correction ADD sph_od_l INT DEFAULT NULL, ADD cyl_od_l INT DEFAULT NULL, ADD ax_od_l INT DEFAULT NULL, ADD pd_od_l INT DEFAULT NULL, ADD add_od INT DEFAULT NULL, ADD add_lod INT DEFAULT NULL, ADD sph_od_p INT DEFAULT NULL, ADD cyl_od_p INT DEFAULT NULL, ADD ax_od_p INT DEFAULT NULL, ADD pd_od_p INT DEFAULT NULL, ADD sph_og_l INT DEFAULT NULL, ADD cyl_og_l INT DEFAULT NULL, ADD ax_og_l INT DEFAULT NULL, ADD pd_og_l INT DEFAULT NULL, ADD add_og INT DEFAULT NULL, ADD add_log INT DEFAULT NULL, ADD sph_og_p INT DEFAULT NULL, ADD cyl_og_p INT DEFAULT NULL, ADD ax_og_p INT DEFAULT NULL, ADD pd_og_p INT DEFAULT NULL, DROP o_d, DROP o_g');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE correction ADD o_d LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, ADD o_g LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, DROP sph_od_l, DROP cyl_od_l, DROP ax_od_l, DROP pd_od_l, DROP add_od, DROP add_lod, DROP sph_od_p, DROP cyl_od_p, DROP ax_od_p, DROP pd_od_p, DROP sph_og_l, DROP cyl_og_l, DROP ax_og_l, DROP pd_og_l, DROP add_og, DROP add_log, DROP sph_og_p, DROP cyl_og_p, DROP ax_og_p, DROP pd_og_p');
    }
}
